"use strict";
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8090);
const HOST = process.env.HOST || "127.0.0.1";
const DATABASE_PATH = process.env.DATABASE_PATH || path.join(ROOT, "metalestoque.sqlite");
const VISION_API_KEY = process.env.VISION_API_KEY || "";
const VISION_API_URL = process.env.VISION_API_URL || "https://api.openai.com/v1/chat/completions";
const VISION_MODEL = process.env.VISION_MODEL || "gpt-4o-mini";
const MAX_BODY_BYTES = 12 * 1024 * 1024;
const db = new DatabaseSync(DATABASE_PATH);

db.exec([
  "PRAGMA journal_mode = WAL;",
  "PRAGMA foreign_keys = ON;",
  "CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);",
  "CREATE TABLE IF NOT EXISTS inventory (id TEXT PRIMARY KEY, sku TEXT NOT NULL UNIQUE, nome TEXT NOT NULL, categoria TEXT NOT NULL DEFAULT 'chapas', unidade TEXT NOT NULL DEFAULT 'un', dimensoes TEXT NOT NULL DEFAULT '', material TEXT NOT NULL DEFAULT '', corrida TEXT NOT NULL DEFAULT '', localizacao TEXT NOT NULL DEFAULT 'Almoxarifado', estoque_atual REAL NOT NULL DEFAULT 0, estoque_minimo REAL NOT NULL DEFAULT 0, estoque_maximo REAL NOT NULL DEFAULT 0, custo_unitario REAL NOT NULL DEFAULT 0, fornecedor TEXT NOT NULL DEFAULT '', obs TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL);",
  "CREATE TABLE IF NOT EXISTS movements (id TEXT PRIMARY KEY, inventory_id TEXT, tipo TEXT NOT NULL, quantidade REAL NOT NULL DEFAULT 0, unidade TEXT NOT NULL DEFAULT 'un', custo_unitario REAL NOT NULL DEFAULT 0, valor_total REAL NOT NULL DEFAULT 0, motivo TEXT NOT NULL, responsavel TEXT NOT NULL, created_at TEXT NOT NULL, FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE SET NULL);",
  "CREATE TABLE IF NOT EXISTS audit_events (id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, action TEXT NOT NULL, operator TEXT NOT NULL, details_json TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL);",
  "CREATE INDEX IF NOT EXISTS idx_inventory_updated_at ON inventory(updated_at);",
  "CREATE INDEX IF NOT EXISTS idx_movements_created_at ON movements(created_at);",
  "CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_events(created_at);"
].join(String.fromCharCode(10)));
db.prepare("INSERT OR IGNORE INTO schema_migrations(version, applied_at) VALUES(?, ?)").run(1, new Date().toISOString());

function now() { return new Date().toISOString(); }
function id(prefix) { return prefix + "-" + crypto.randomUUID(); }
function text(value, fallback) { const result = String(value ?? fallback ?? "").trim(); return result; }
function number(value, fallback) { if (value === "" || value === null || value === undefined) return fallback; const result = Number(value); return Number.isFinite(result) ? result : NaN; }
function normalizeItem(input) {
  const sku = text(input.sku).toUpperCase();
  const nome = text(input.nome);
  if (!sku || !nome) throw new Error("SKU e descrição são obrigatórios.");
  const estoqueAtual = number(input.estoque_atual, 0);
  const estoqueMinimo = number(input.estoque_minimo, 0);
  const maxInformado = number(input.estoque_maximo, NaN);
  const estoqueMaximo = Number.isFinite(maxInformado) ? maxInformado : estoqueMinimo * 3;
  const custo = number(input.custo_unitario, 0);
  const numeric = [estoqueAtual, estoqueMinimo, estoqueMaximo, custo];
  if (numeric.some(value => !Number.isFinite(value)) || numeric.some(value => value < 0) || estoqueMaximo < estoqueMinimo) throw new Error("Valores de estoque e custo inválidos.");
  return { sku, nome, categoria:text(input.categoria, "chapas").toLowerCase(), unidade:text(input.unidade, "un"), dimensoes:text(input.dimensoes), material:text(input.material), corrida:text(input.corrida), localizacao:text(input.localizacao, "Almoxarifado"), estoque_atual:estoqueAtual, estoque_minimo:estoqueMinimo, estoque_maximo:estoqueMaximo, custo_unitario:custo, fornecedor:text(input.fornecedor), obs:text(input.obs) };
}
function insertAudit(entityType, entityId, action, operator, details) {
  db.prepare("INSERT INTO audit_events(id, entity_type, entity_id, action, operator, details_json, created_at) VALUES(?, ?, ?, ?, ?, ?, ?)").run(id("aud"), entityType, entityId, action, text(operator, "Operador não informado"), JSON.stringify(details || {}), now());
}
function insertMovement(item, quantity, type, reason, operator) {
  db.prepare("INSERT INTO movements(id, inventory_id, tipo, quantidade, unidade, custo_unitario, valor_total, motivo, responsavel, created_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(id("mov"), item.id, type, quantity, item.unidade, item.custo_unitario, Math.abs(quantity) * item.custo_unitario, reason, text(operator, "Operador não informado"), now());
}
function createItem(input, operator) {
  const item = normalizeItem(input);
  const itemId = id("item");
  const timestamp = now();
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("INSERT INTO inventory(id, sku, nome, categoria, unidade, dimensoes, material, corrida, localizacao, estoque_atual, estoque_minimo, estoque_maximo, custo_unitario, fornecedor, obs, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(itemId, item.sku, item.nome, item.categoria, item.unidade, item.dimensoes, item.material, item.corrida, item.localizacao, item.estoque_atual, item.estoque_minimo, item.estoque_maximo, item.custo_unitario, item.fornecedor, item.obs, timestamp, timestamp);
    const saved = { id:itemId, ...item, created_at:timestamp, updated_at:timestamp };
    if (item.estoque_atual > 0) insertMovement(saved, item.estoque_atual, "entrada", "Cadastro inteligente / saldo inicial", operator);
    insertAudit("inventory", itemId, "create", operator, { source:"smart-registration", sku:item.sku });
    db.exec("COMMIT");
    return saved;
  } catch (error) { db.exec("ROLLBACK"); throw error; }
}
function listItems() { return db.prepare("SELECT * FROM inventory ORDER BY updated_at DESC").all(); }
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on("data", chunk => { size += chunk.length; if (size > MAX_BODY_BYTES) { reject(new Error("Payload excede o limite permitido.")); req.destroy(); return; } chunks.push(chunk); });
    req.on("end", () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")); } catch (error) { reject(new Error("JSON inválido.")); } });
    req.on("error", reject);
  });
}
function sendJson(res, status, payload) { const body = JSON.stringify(payload); res.writeHead(status, { "Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store", "X-Content-Type-Options":"nosniff" }); res.end(body); }
function sendError(res, status, message) { sendJson(res, status, { error:message }); }
function extractModelJson(content) {
  const raw = Array.isArray(content) ? content.map(part => part.text || "").join(String.fromCharCode(10)) : String(content || "");
  const fence = String.fromCharCode(96).repeat(3);
  const cleaned = raw.replace(fence + "json", "").replace(fence, "").trim();
  const start = cleaned.indexOf("{"); const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("O motor de visão não retornou JSON estruturado.");
  return JSON.parse(cleaned.slice(start, end + 1));
}
async function scanImage(input) {
  if (!VISION_API_KEY) throw Object.assign(new Error("VISION_API_KEY não configurada. O cadastro manual continua disponível."), { status:503 });
  const imageDataUrl = text(input.imageDataUrl);
  if (!imageDataUrl.startsWith("data:image/") || !imageDataUrl.includes(";base64,") || imageDataUrl.length > MAX_BODY_BYTES) throw Object.assign(new Error("Imagem inválida ou maior que o limite permitido."), { status:400 });
  const prompt = "Leia esta etiqueta ou documento de material industrial. Retorne SOMENTE JSON válido com sku, nome, categoria, unidade, dimensoes, material, corrida, localizacao, estoque_atual, estoque_minimo, estoque_maximo, custo_unitario, fornecedor, obs, confidence e warnings. Não invente valores; use string vazia ou null quando não estiver legível.";
  const response = await fetch(VISION_API_URL, { method:"POST", headers:{ "Content-Type":"application/json", Authorization:"Bearer " + VISION_API_KEY }, body:JSON.stringify({ model:VISION_MODEL, temperature:0, response_format:{type:"json_object"}, messages:[{ role:"user", content:[{type:"text",text:prompt},{type:"image_url",image_url:{url:imageDataUrl}}] }] }) });
  const body = await response.json();
  if (!response.ok) throw Object.assign(new Error(body.error?.message || "Falha no provedor de visão."), { status:502 });
  const parsed = extractModelJson(body.choices?.[0]?.message?.content);
  return { draft:parsed, model:VISION_MODEL, warnings:Array.isArray(parsed.warnings) ? parsed.warnings : [] };
}
const MIME = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"application/javascript; charset=utf-8", ".json":"application/json; charset=utf-8", ".csv":"text/csv; charset=utf-8", ".md":"text/plain; charset=utf-8", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".svg":"image/svg+xml" };
function serveStatic(req, res, url) {
  const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.resolve(ROOT, "." + requested);
  const rootPath = path.resolve(ROOT);
  if (!filePath.startsWith(rootPath + path.sep) && filePath !== rootPath) return sendError(res, 403, "Caminho não permitido.");
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return sendError(res, 404, "Arquivo não encontrado.");
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type":MIME[ext] || "application/octet-stream", "Cache-Control":"no-cache, no-store, must-revalidate", "X-Content-Type-Options":"nosniff", "X-Frame-Options":"SAMEORIGIN", "Referrer-Policy":"no-referrer" });
  fs.createReadStream(filePath).pipe(res);
}
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (req.method === "GET" && url.pathname === "/api/health") return sendJson(res, 200, { ok:true, database:path.basename(DATABASE_PATH), visionConfigured:Boolean(VISION_API_KEY), model:VISION_MODEL });
    if (req.method === "GET" && url.pathname === "/api/items") return sendJson(res, 200, { items:listItems() });
    if (req.method === "POST" && url.pathname === "/api/items") { const body=await parseJsonBody(req); return sendJson(res, 201, { item:createItem(body.item || body, body.operator) }); }
    if (req.method === "POST" && url.pathname === "/api/vision/scan") { const body=await parseJsonBody(req); return sendJson(res, 200, await scanImage(body)); }
    if (req.method === "GET" && url.pathname === "/api/audit") return sendJson(res, 200, { events:db.prepare("SELECT * FROM audit_events ORDER BY created_at DESC LIMIT 500").all() });
    if (req.method === "GET") return serveStatic(req, res, url);
    return sendError(res, 405, "Método não suportado.");
  } catch (error) { console.error(error); return sendError(res, error.status || 500, error.message || "Erro interno."); }
});
server.listen(PORT, HOST, () => { console.log("MetalEstoque API em http://" + HOST + ":" + PORT); console.log("Banco SQLite: " + DATABASE_PATH); console.log("Visão: " + (VISION_API_KEY ? VISION_MODEL : "não configurada; manual disponível")); });
