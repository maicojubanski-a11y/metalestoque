"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

const root = __dirname;
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const checks = [];
function check(name, fn) {
  fn();
  checks.push(name);
}
function extractScript(file) {
  const html = read(file);
  const start = html.lastIndexOf("<script>");
  const end = html.lastIndexOf("</script>");
  assert.ok(start >= 0 && end > start, file + " precisa de script inline");
  assert.match(html.trim(), /<\/html>$/i);
  return html.slice(start + "<script>".length, end);
}
function fakeElement(id) {
  return { id, value: "", textContent: "", innerHTML: "", style: {}, className: "", listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; }, reset() { this.value = ""; }, appendChild() {}, focus() {}, select() {} };
}
function fakeDom(ids) {
  const elements = new Map(ids.map(id => [id, fakeElement(id)]));
  return {
    elements,
    document: {
      getElementById(id) { if (!elements.has(id)) elements.set(id, fakeElement(id)); return elements.get(id); },
      createElement() { return { innerHTML: "", appendChild() {}, click() {} }; }
    }
  };
}
function fakeStorage() {
  const data = {};
  return { data, getItem(key) { return data[key] || null; }, setItem(key, value) { data[key] = value; }, removeItem(key) { delete data[key]; } };
}
function smokeScorecard() {
  const ids = ["flowRows", "company", "buyer", "champion", "startDate", "endDate", "cell", "locBefore", "locAfter", "countAfter", "accuracyBefore", "accuracyAfter", "movementRate", "hoursSaved", "hourCost", "avoidedCost", "scrapValue", "pilotFee", "resultTasks", "resultLocate", "resultMonthly", "resultPayback", "decision", "summary", "calculate", "copySummary", "exportJson", "clearForm"];
  for (let i = 0; i < 5; i++) ids.push("flow-time-" + i, "flow-help-" + i, "flow-rating-" + i, "flow-note-" + i);
  const dom = fakeDom(ids);
  const storage = fakeStorage();
  const script = extractScript("pilot-scorecard.html");
  const api = new Function("document", "localStorage", "navigator", "window", "confirm", script + "\nreturn { calculate };" )(dom.document, storage, { clipboard: { writeText: async () => {} } }, { print() {}, prompt() {} }, () => true);
  const values = { company:"Fábrica QA", buyer:"Gestor", champion:"Almoxarife", cell:"Caldeiraria", locBefore:"120", locAfter:"60", countAfter:"8", accuracyBefore:"80", accuracyAfter:"97", movementRate:"95", hoursSaved:"80", hourCost:"50", avoidedCost:"1500", scrapValue:"800", pilotFee:"3900" };
  Object.entries(values).forEach(([id, value]) => { dom.elements.get(id).value = value; });
  for (let i = 0; i < 5; i++) { dom.elements.get("flow-time-" + i).value = "30"; dom.elements.get("flow-help-" + i).value = "yes"; dom.elements.get("flow-rating-" + i).value = "5"; }
  const result = api.calculate();
  assert.equal(result.data.flows.length, 5);
  assert.equal(dom.elements.get("resultTasks").textContent, "100%");
  assert.equal(dom.elements.get("decision").className, "good");
  return result.summary;
}
function smokePipeline() {
  const ids = ["leadForm", "leadId", "leadCompany", "leadCity", "leadSegment", "leadContact", "leadChampion", "leadNextDate", "leadStage", "leadValue", "leadPain", "leadNotes", "leadTable", "empty", "metricTotal", "metricActive", "metricPipeline", "metricNext", "clearForm", "exportCsv", "copySummary"];
  const dom = fakeDom(ids);
  const storage = fakeStorage();
  const script = extractScript("pipeline-pilotos.html");
  new Function("document", "localStorage", "navigator", "window", "confirm", script)(dom.document, storage, { clipboard: { writeText: async () => {} } }, { scrollTo() {}, prompt() {} }, () => true);
  dom.elements.get("leadCompany").value = "Fábrica QA";
  dom.elements.get("leadCity").value = "Joinville/SC";
  dom.elements.get("leadSegment").value = "Caldeiraria";
  dom.elements.get("leadStage").value = "pilot_offered";
  dom.elements.get("leadValue").value = "12000";
  dom.elements.get("leadPain").value = "compras emergenciais";
  dom.elements.get("leadForm").listeners.submit({ preventDefault() {} });
  const saved = JSON.parse(storage.data.metalestoque_pipeline_pilotos_v1);
  assert.equal(saved.length, 1);
  assert.equal(dom.elements.get("metricTotal").textContent, 1);
  assert.equal(dom.elements.get("metricPipeline").textContent, "R$ 12.000");
}

check("página comercial", () => { const html = read("vendas.html"); assert.match(html, /pilot-scorecard\.html/); assert.match(html, /pipeline-pilotos\.html/); });
check("scorecard ROI", smokeScorecard);
check("pipeline de prospects", smokePipeline);
check("proposta comercial", () => { const html = read("proposta-piloto.html"); assert.match(html, /PROPOSTA COMERCIAL/); new Function("document", "localStorage", "navigator", "window", extractScript("proposta-piloto.html")); });
check("SQLite e visão", () => { const api = read("api-server.js"); const migration = read("migrar-backup-para-sqlite.js"); const page = read("cadastro-inteligente.html"); assert.match(api, /DatabaseSync/); assert.match(api, /api\/vision\/scan/); assert.match(migration, /INSERT OR IGNORE INTO inventory/); assert.match(page, /items/); assert.match(page, /vision\/scan/); new Function("document", "localStorage", "navigator", "window", page.slice(page.lastIndexOf("<script>") + 8, page.lastIndexOf("<\/script>"))); });
check("assets locais", () => { const html = read("index.html"); assert.doesNotMatch(html, /unpkg|cdn\.jsdelivr|document\.write/i); });
check("auditoria e schema", () => { const app = read("app.js"); assert.match(app, /schemaVersion: 1/); assert.match(app, /function recordAudit/); assert.match(app, /function escapeHtml/); assert.match(app, /function safeIdentifier/); });
check("servidor protegido", () => { const server = read("server.ps1"); const api = read("api-server.js"); assert.match(server, /api-server\.js/); assert.match(server, /Node\.js/); assert.match(api, /path\.resolve/); assert.match(api, /X-Content-Type-Options/); assert.doesNotMatch(api, /Access-Control-Allow-Origin/); });

console.log("QA smoke OK — " + checks.length + " checks: " + checks.join(", "));
