"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");

const backupPath = process.argv[2];
if (!backupPath) { console.error("Uso: node migrar-backup-para-sqlite.js caminho\\backup.json"); process.exit(1); }
const inputPath = path.resolve(process.cwd(), backupPath);
const databasePath = process.env.DATABASE_PATH || path.join(__dirname, "metalestoque.sqlite");
if (!fs.existsSync(inputPath)) { console.error("Backup não encontrado: " + inputPath); process.exit(1); }
const backup = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const items = Array.isArray(backup.inventory) ? backup.inventory : [];
const movements = Array.isArray(backup.movimentacoes) ? backup.movimentacoes : [];
const audit = Array.isArray(backup.auditoria) ? backup.auditoria : [];
if (!backup.config || items.length === 0) { console.error("Backup sem config ou inventário válido."); process.exit(1); }
const db = new DatabaseSync(databasePath);
db.exec([
  "PRAGMA journal_mode = WAL;",
  "PRAGMA foreign_keys = ON;",
  "CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);",
  "CREATE TABLE IF NOT EXISTS inventory (id TEXT PRIMARY KEY, sku TEXT NOT NULL UNIQUE, nome TEXT NOT NULL, categoria TEXT NOT NULL DEFAULT 'chapas', unidade TEXT NOT NULL DEFAULT 'un', dimensoes TEXT NOT NULL DEFAULT '', material TEXT NOT NULL DEFAULT '', corrida TEXT NOT NULL DEFAULT '', localizacao TEXT NOT NULL DEFAULT 'Almoxarifado', estoque_atual REAL NOT NULL DEFAULT 0, estoque_minimo REAL NOT NULL DEFAULT 0, estoque_maximo REAL NOT NULL DEFAULT 0, custo_unitario REAL NOT NULL DEFAULT 0, fornecedor TEXT NOT NULL DEFAULT '', obs TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL);",
  "CREATE TABLE IF NOT EXISTS movements (id TEXT PRIMARY KEY, inventory_id TEXT, tipo TEXT NOT NULL, quantidade REAL NOT NULL DEFAULT 0, unidade TEXT NOT NULL DEFAULT 'un', custo_unitario REAL NOT NULL DEFAULT 0, valor_total REAL NOT NULL DEFAULT 0, motivo TEXT NOT NULL, responsavel TEXT NOT NULL, created_at TEXT NOT NULL, FOREIGN KEY (inventory_id) REFERENCES inventory(id) ON DELETE SET NULL);",
  "CREATE TABLE IF NOT EXISTS audit_events (id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, action TEXT NOT NULL, operator TEXT NOT NULL, details_json TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL);"
].join(String.fromCharCode(10)));
const now = new Date().toISOString();
const makeId = prefix => prefix + "-" + crypto.randomUUID();
const itemStmt = db.prepare("INSERT OR IGNORE INTO inventory(id, sku, nome, categoria, unidade, dimensoes, material, corrida, localizacao, estoque_atual, estoque_minimo, estoque_maximo, custo_unitario, fornecedor, obs, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
const movementStmt = db.prepare("INSERT OR IGNORE INTO movements(id, inventory_id, tipo, quantidade, unidade, custo_unitario, valor_total, motivo, responsavel, created_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
const auditStmt = db.prepare("INSERT OR IGNORE INTO audit_events(id, entity_type, entity_id, action, operator, details_json, created_at) VALUES(?, ?, ?, ?, ?, ?, ?)");
const byId = new Map();
let imported = 0; let skipped = 0;
db.exec("BEGIN IMMEDIATE");
try {
  for (const source of items) {
    const id = String(source.id || makeId("item"));
    const sku = String(source.sku || "").trim().toUpperCase();
    const nome = String(source.nome || "").trim();
    if (!sku || !nome) { skipped++; continue; }
    const values = [id, sku, nome, String(source.categoria || "chapas"), String(source.unidade || "un"), String(source.dimensoes || ""), String(source.material || ""), String(source.corrida || ""), String(source.localizacao || "Almoxarifado"), Number(source.estoque_atual) || 0, Number(source.estoque_minimo) || 0, Number(source.estoque_maximo) || 0, Number(source.custo_unitario) || 0, String(source.fornecedor || ""), String(source.obs || ""), source.ultima_atualizacao || now, source.ultima_atualizacao || now];
    itemStmt.run(...values);
    byId.set(id, id); byId.set(sku, id); imported++;
  }
  for (const source of movements) {
    const inventoryId = byId.get(source.itemId) || byId.get(String(source.itemSku || "").toUpperCase()) || null;
    movementStmt.run(String(source.id || makeId("mov")), inventoryId, String(source.tipo || "ajuste"), Number(source.quantidade) || 0, String(source.unidade || "un"), Number(source.custo_unitario) || 0, Number(source.valor_total) || 0, String(source.motivo || "Migração de backup"), String(source.responsavel || backup.config.responsavel || "Migração"), source.data || now);
  }
  for (const source of audit) {
    auditStmt.run(String(source.id || makeId("aud")), "inventory", String(source.itemId || ""), String(source.motivo || "migration"), String(source.responsavel || backup.config.responsavel || "Migração"), JSON.stringify(source), source.data || now);
  }
  db.prepare("INSERT OR REPLACE INTO schema_migrations(version, applied_at) VALUES(?, ?)").run(Number(backup.schemaVersion) || 1, now);
  db.exec("COMMIT");
  console.log(JSON.stringify({ ok:true, database:databasePath, imported, skipped, movements:movements.length, audit:audit.length }, null, 2));
} catch (error) {
  db.exec("ROLLBACK");
  console.error(error.message);
  process.exit(1);
}
