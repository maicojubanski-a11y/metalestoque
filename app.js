/**
 * METALESTOQUE PRO - SISTEMA DE GESTÃO DE ESTOQUE METALMECÂNICA
 * Lógica Completa da Aplicação (Vanilla ES6, local-first e reativa)
 */

// ==========================================
// BANCO DE DADOS PADRÃO (DEMONSTRAÇÃO REALISTA)
// ==========================================
const DEFAULT_CONFIG = {
  razaoSocial: "Metalmecânica & Usinagem Aliança Ltda.",
  nomeFantasia: "Metalmecânica Aliança",
  cnpj: "12.345.678/0001-90",
  responsavel: "Eng. Roberto Silva - Almoxarifado Central",
  unidadePadrao: "Matriz - Chão de Fábrica",
};

const DEFAULT_INVENTORY = [
  {
    id: "item-01",
    sku: "CHP-1020-001",
    nome: "Chapa Aço Carbono SAE 1020 1/4\" (6.35mm)",
    categoria: "chapas",
    unidade: "chapa",
    dimensoes: "6.35 x 1200 x 3000 mm",
    material: "Aço SAE 1020",
    corrida: "G-84920 (Gerdau)",
    localizacao: "Pátio Chapas - Gaveto 02",
    estoque_atual: 14,
    estoque_minimo: 8,
    estoque_maximo: 30,
    custo_unitario: 1150.00,
    fornecedor: "Aços Gerdau Distribuidora",
    obs: "Certificado de qualidade com conformidade mecânica arquivado na pasta física 2026.",
    ultima_atualizacao: "2026-09-18T10:30:00"
  },
  {
    id: "item-02",
    sku: "CHP-1045-002",
    nome: "Chapa Aço SAE 1045 1/2\" (12.70mm)",
    categoria: "chapas",
    unidade: "chapa",
    dimensoes: "12.70 x 1500 x 3000 mm",
    material: "Aço SAE 1045",
    corrida: "U-11029 (Usiminas)",
    localizacao: "Pátio Chapas - Gaveto 05",
    estoque_atual: 3,
    estoque_minimo: 5,
    estoque_maximo: 15,
    custo_unitario: 2890.00,
    fornecedor: "Usiminas S/A",
    obs: "Item crítico! Utilizado em bases de máquinas pesadas.",
    ultima_atualizacao: "2026-09-15T14:20:00"
  },
  {
    id: "item-03",
    sku: "CHP-INOX-304",
    nome: "Chapa Inox AISI 304 Escovada #14 (2.00mm)",
    categoria: "chapas",
    unidade: "chapa",
    dimensoes: "2.00 x 1250 x 2500 mm",
    material: "Inox AISI 304",
    corrida: "AP-9941 (Aperam)",
    localizacao: "Almox. Especial - Prateleira INOX",
    estoque_atual: 9,
    estoque_minimo: 4,
    estoque_maximo: 20,
    custo_unitario: 980.00,
    fornecedor: "Aperam South America",
    obs: "Película protetora plástica azul. Aplicações alimentícias e farmacêuticas.",
    ultima_atualizacao: "2026-09-19T09:15:00"
  },
  {
    id: "item-04",
    sku: "TUB-RED-050",
    nome: "Tubo Redondo Industrial SAE 1020 Ø 2\" x 2.00mm",
    categoria: "tubos_perfis",
    unidade: "barra",
    dimensoes: "Ø 50.8 x 2.00 x 6000 mm",
    material: "Aço SAE 1020",
    corrida: "TM-4410",
    localizacao: "Pilar 4 - Cantiléver Central",
    estoque_atual: 45,
    estoque_minimo: 20,
    estoque_maximo: 100,
    custo_unitario: 142.50,
    fornecedor: "Tubos Açotubo",
    obs: "Barras com 6 metros cada. Tubo com costura removida.",
    ultima_atualizacao: "2026-09-20T11:00:00"
  },
  {
    id: "item-05",
    sku: "VIG-W150-13",
    nome: "Perfil Estrutural Viga W 150 x 13,0 kg/m",
    categoria: "tubos_perfis",
    unidade: "barra",
    dimensoes: "W150x13.0 - Barra 12m",
    material: "Aço ASTM A572 Grau 50",
    corrida: "G-77124 (Gerdau)",
    localizacao: "Pátio Externo - Cavalete 01",
    estoque_atual: 4,
    estoque_minimo: 6,
    estoque_maximo: 20,
    custo_unitario: 1120.00,
    fornecedor: "Aços Gerdau Distribuidora",
    obs: "Uso estrutural. Aço de alta resistência mecânica.",
    ultima_atualizacao: "2026-09-10T16:00:00"
  },
  {
    id: "item-06",
    sku: "TAR-1045-075",
    nome: "Tarugo Maciço Redondo Laminado SAE 1045 Ø 3\" (76.2mm)",
    categoria: "tubos_perfis",
    unidade: "m",
    dimensoes: "Ø 76.2mm - Barras fracionadas",
    material: "Aço SAE 1045",
    corrida: "VL-3011",
    localizacao: "Galpão Usinagem - Prateleira Eixo",
    estoque_atual: 18.5,
    estoque_minimo: 10.0,
    estoque_maximo: 50.0,
    custo_unitario: 215.00,
    fornecedor: "Villares Metals",
    obs: "Destinado à usinagem de eixos e flanges nos tornos CNC.",
    ultima_atualizacao: "2026-09-21T08:30:00"
  },
  {
    id: "item-07",
    sku: "SOL-MIG-120",
    nome: "Arame de Solda MIG/MAG ER70S-6 1.20mm (Carretel 18kg)",
    categoria: "solda_corte",
    unidade: "un",
    dimensoes: "Carretel 18 kg",
    material: "Aço Cobreado ER70S-6",
    corrida: "ESAB-5582",
    localizacao: "Almox. Solda - Armário Fechado A-01",
    estoque_atual: 22,
    estoque_minimo: 10,
    estoque_maximo: 50,
    custo_unitario: 245.00,
    fornecedor: "ESAB Indústria e Comércio",
    obs: "Utilizado nas células robotizadas e caldeiraria pesada.",
    ultima_atualizacao: "2026-09-19T15:45:00"
  },
  {
    id: "item-08",
    sku: "SOL-GAS-MIX",
    nome: "Gás de Proteção Solda Mistura ATAL (Argônio 75% + CO2 25%)",
    categoria: "solda_corte",
    unidade: "cilindro",
    dimensoes: "Cilindro 10 m³ (200 bar)",
    material: "Argônio + CO2",
    corrida: "WHITE-2026",
    localizacao: "Central de Gases - Pátio Seguro",
    estoque_atual: 2,
    estoque_minimo: 5,
    estoque_maximo: 12,
    custo_unitario: 310.00,
    fornecedor: "White Martins Gases Industriais",
    obs: "ATENÇÃO: Apenas 2 cilindros cheios em estoque! Comprar urgente.",
    ultima_atualizacao: "2026-09-22T08:00:00"
  },
  {
    id: "item-09",
    sku: "COR-DIS-045",
    nome: "Disco de Corte Fino 4.1/2\" x 1.0 x 7/8\" para Inox/Aço",
    categoria: "solda_corte",
    unidade: "cx",
    dimensoes: "115 x 1.0 x 22.23 mm (Cx c/ 25 un)",
    material: "Óxido de Alumínio / Zircônio",
    corrida: "NORTON-412",
    localizacao: "Prateleira C - Gaveta 14",
    estoque_atual: 15,
    estoque_minimo: 8,
    estoque_maximo: 40,
    custo_unitario: 95.00,
    fornecedor: "Norton Saint-Gobain",
    obs: "Caixa lacrada com 25 unidades. Alto rendimento.",
    ultima_atualizacao: "2026-09-16T17:00:00"
  },
  {
    id: "item-10",
    sku: "USI-PAS-WNMG",
    nome: "Inserto de Metal Duro WNMG 080408-PM para Torneamento",
    categoria: "usinagem",
    unidade: "cx",
    dimensoes: "WNMG 080408 (Cx c/ 10 un)",
    material: "Metal Duro Revestimento TiCN+Al2O3",
    corrida: "SAND-9810",
    localizacao: "Armário CNC - Gaveta 03",
    estoque_atual: 6,
    estoque_minimo: 3,
    estoque_maximo: 15,
    custo_unitario: 340.00,
    fornecedor: "Sandvik Coromant",
    obs: "Para desbaste e semi-acabamento de aços carbono e ligados.",
    ultima_atualizacao: "2026-09-17T11:20:00"
  },
  {
    id: "item-11",
    sku: "USI-FRE-TOPO12",
    nome: "Fresa de Topo Inteiriça Metal Duro Ø 12mm 4 Cortes TiAlN",
    categoria: "usinagem",
    unidade: "un",
    dimensoes: "Ø 12 x 30 x 75 mm",
    material: "Metal Duro Microgrão",
    corrida: "DOR-2025",
    localizacao: "Armário CNC - Gaveta 08",
    estoque_atual: 8,
    estoque_minimo: 4,
    estoque_maximo: 20,
    custo_unitario: 165.00,
    fornecedor: "Dormer Pramet",
    obs: "Para centro de usinagem vertical (fresamento pesado).",
    ultima_atualizacao: "2026-09-18T13:40:00"
  },
  {
    id: "item-12",
    sku: "FIX-PAR-M1250",
    nome: "Parafuso Sextavado Aço 8.8 M12 x 50mm Rosca Total Zincado",
    categoria: "fixadores",
    unidade: "cx",
    dimensoes: "M12 x 50 - Passo 1.75 (Cx c/ 100 un)",
    material: "Aço Classe 8.8 Temperado",
    corrida: "CISER-9912",
    localizacao: "Estante Fixadores - Gaveteiro 22",
    estoque_atual: 12,
    estoque_minimo: 5,
    estoque_maximo: 30,
    custo_unitario: 88.00,
    fornecedor: "Ciser Parafusos e Porcas",
    obs: "Acompanha certificação de torque e resistência mecânica.",
    ultima_atualizacao: "2026-09-14T09:00:00"
  },
  {
    id: "item-13",
    sku: "FIX-POR-M12TRAV",
    nome: "Porca Sextavada Travante com Anel de Nylon M12 Grau 8",
    categoria: "fixadores",
    unidade: "cx",
    dimensoes: "M12 - Passo 1.75 (Cx c/ 200 un)",
    material: "Aço Classe 8 + Inserto Nylon",
    corrida: "CISER-7744",
    localizacao: "Estante Fixadores - Gaveteiro 23",
    estoque_atual: 7,
    estoque_minimo: 4,
    estoque_maximo: 25,
    custo_unitario: 72.00,
    fornecedor: "Ciser Parafusos e Porcas",
    obs: "Utilizado em uniões sujeitas a vibração severa.",
    ultima_atualizacao: "2026-09-14T09:05:00"
  },
  {
    id: "item-14",
    sku: "QUI-OLE-SOLUV",
    nome: "Óleo Solúvel Refrigerante Semissintético Bio-resistente",
    categoria: "quimicos_oleos",
    unidade: "lt",
    dimensoes: "Bombona 20 Litros",
    material: "Emulsão Semissintética",
    corrida: "ROCH-2026",
    localizacao: "Doca Química - Palete 04",
    estoque_atual: 60,
    estoque_minimo: 40,
    estoque_maximo: 200,
    custo_unitario: 24.50,
    fornecedor: "Rocol Lubrificantes Especiais",
    obs: "Diluição recomendada: 5% para usinagem geral e 8% para retífica.",
    ultima_atualizacao: "2026-09-12T14:10:00"
  },
  {
    id: "item-15",
    sku: "EPI-LUV-RASPA",
    nome: "Luva de Raspa Couro Cano Longo 20cm com Reforço Palmar",
    categoria: "epi",
    unidade: "un",
    dimensoes: "Tamanho Único - CA 14.520",
    material: "Couro Bovino Curtido",
    corrida: "PRO-8812",
    localizacao: "Almoxarifado EPIs - Prateleira 1",
    estoque_atual: 35,
    estoque_minimo: 15,
    estoque_maximo: 80,
    custo_unitario: 21.00,
    fornecedor: "Danny EPIs Industriais",
    obs: "Item obrigatório para caldeireiros e operadores de solda e oxicorte.",
    ultima_atualizacao: "2026-09-11T10:00:00"
  },
  {
    id: "item-16",
    sku: "SEM-EST-CHASSI",
    nome: "Subconjunto Soldado: Longarina Chassi Agrícola Mod. C-40",
    categoria: "semiacabados",
    unidade: "un",
    dimensoes: "4200 x 600 x 300 mm",
    material: "Aço Estrutural ASTM A36",
    corrida: "OP-INTERNA-022",
    localizacao: "Área de Pintura / Espera Galvânica",
    estoque_atual: 4,
    estoque_minimo: 2,
    estoque_maximo: 10,
    custo_unitario: 3400.00,
    fornecedor: "Produção Interna - Caldeiraria",
    obs: "Aguardando jateamento granalha e pintura epóxi.",
    ultima_atualizacao: "2026-09-20T18:00:00"
  },
  {
    id: "item-17",
    sku: "ACA-SILO-5T",
    nome: "Silo Metálico Cônico Armazenador 5 Toneladas com Escada",
    categoria: "acabados",
    unidade: "un",
    dimensoes: "Ø 2400 x 4800 mm altura",
    material: "Aço Carbono + Galvanização a Fogo",
    corrida: "OP-PROD-2026-01",
    localizacao: "Pátio de Expedição - Vaga 03",
    estoque_atual: 1,
    estoque_minimo: 0,
    estoque_maximo: 3,
    custo_unitario: 24500.00,
    fornecedor: "Produção Interna",
    obs: "Pronto para embarque no cliente Agropecuária Santa Luzia.",
    ultima_atualizacao: "2026-09-21T16:00:00"
  }
];

const DEFAULT_RETALHOS = [
  {
    id: "ret-01",
    material: "Chapa Aço Carbono SAE 1020 1/4\" (6.35mm)",
    dimensoes: "480 x 620 mm",
    peso_estimado_kg: 14.8,
    localizacao: "Gaiola de Sobras Nobres - Vão A",
    origem_op: "Sobra corte mesa plasma (OP-2026-01)",
    data_criacao: "2026-09-18",
    status: "disponivel"
  },
  {
    id: "ret-02",
    material: "Chapa Inox AISI 304 2.0mm Escovada",
    dimensoes: "350 x 1200 mm",
    peso_estimado_kg: 6.6,
    localizacao: "Prateleira de Retalhos Inox",
    origem_op: "Sobra corte a laser guarnição",
    data_criacao: "2026-09-19",
    status: "disponivel"
  },
  {
    id: "ret-03",
    material: "Tarugo Redondo Aço SAE 1045 Ø 3\" (76.2mm)",
    dimensoes: "Ø 76.2mm x Comprimento 380mm",
    peso_estimado_kg: 13.6,
    localizacao: "Bancada Torno CNC 02",
    origem_op: "Ponta de barra sobra de flange",
    data_criacao: "2026-09-20",
    status: "disponivel"
  }
];

const DEFAULT_MOVIMENTACOES = [
  {
    id: "mov-01",
    data: "2026-09-22T08:30:00",
    tipo: "entrada",
    itemId: "item-04",
    itemSku: "TUB-RED-050",
    itemNome: "Tubo Redondo Industrial SAE 1020 Ø 2\" x 2.00mm",
    quantidade: 20,
    unidade: "barra",
    custo_unitario: 142.50,
    valor_total: 2850.00,
    motivo: "NF-e 88412 - Açotubo Reposição",
    responsavel: "Roberto Silva",
    obs: "Recebimento conforme pedido de compra #4102."
  },
  {
    id: "mov-02",
    data: "2026-09-21T14:15:00",
    tipo: "saida",
    itemId: "item-01",
    itemSku: "CHP-1020-001",
    itemNome: "Chapa Aço Carbono SAE 1020 1/4\" (6.35mm)",
    quantidade: 4,
    unidade: "chapa",
    custo_unitario: 1150.00,
    valor_total: 4600.00,
    motivo: "OP-2026-042 (Fabricação Tanque Industrial)",
    responsavel: "Carlos Caldeiraria",
    obs: "Baixa realizada para corte na mesa de plasma CNC."
  },
  {
    id: "mov-03",
    data: "2026-09-21T10:00:00",
    tipo: "saida",
    itemId: "item-07",
    itemSku: "SOL-MIG-120",
    itemNome: "Arame de Solda MIG/MAG ER70S-6 1.20mm",
    quantidade: 3,
    unidade: "un",
    custo_unitario: 245.00,
    valor_total: 735.00,
    motivo: "Consumo Produção - Célula Solda 01",
    responsavel: "Marcio Soldador",
    obs: "Entrega de 3 carretéis de 18kg."
  },
  {
    id: "mov-04",
    data: "2026-09-20T16:40:00",
    tipo: "ajuste",
    itemId: "item-12",
    itemSku: "FIX-PAR-M1250",
    itemNome: "Parafuso Sextavado Aço 8.8 M12 x 50mm",
    quantidade: 2,
    unidade: "cx",
    custo_unitario: 88.00,
    valor_total: 176.00,
    motivo: "Ajuste Inventário Semanal",
    responsavel: "Roberto Silva",
    obs: "Encontradas 2 caixas que não haviam sido bipadas na conferência."
  }
];

const DEFAULT_OPS = [
  {
    id: "op-01",
    numero: "OP-2026-042",
    cliente: "Agroindustrial Serrana S/A",
    projeto: "Tanque Metálico Armazenamento Óleo 10m³",
    data_inicio: "2026-09-20",
    previsao_entrega: "2026-10-05",
    status: "em_producao",
    materiais: [
      { itemId: "item-01", sku: "CHP-1020-001", nome: "Chapa Aço SAE 1020 1/4\"", quantidade: 4, unidade: "chapa", baixado: true },
      { itemId: "item-04", sku: "TUB-RED-050", nome: "Tubo Redondo Ø 2\" x 2.00mm", quantidade: 8, unidade: "barra", baixado: true },
      { itemId: "item-07", sku: "SOL-MIG-120", nome: "Arame de Solda MIG ER70S-6", quantidade: 2, unidade: "un", baixado: false }
    ],
    produto_acabado: {
      nome: "Tanque Metálico 10m³ com Válvulas",
      quantidade: 1,
      unidade: "un",
      adicionadoEstoque: false
    },
    observacoes: "Teste hidrostático exigido pelo cliente com pressão de 3.5 bar."
  },
  {
    id: "op-02",
    numero: "OP-2026-043",
    cliente: "Mineradora Rio das Pedras",
    projeto: "Conjunto de Flanges Especiais Usinadas SAE 1045",
    data_inicio: "2026-09-22",
    previsao_entrega: "2026-09-28",
    status: "planejada",
    materiais: [
      { itemId: "item-06", sku: "TAR-1045-075", nome: "Tarugo Maciço SAE 1045 Ø 3\"", quantidade: 4.5, unidade: "m", baixado: false },
      { itemId: "item-10", sku: "USI-PAS-WNMG", nome: "Inserto Metal Duro WNMG 080408", quantidade: 1, unidade: "cx", baixado: false }
    ],
    produto_acabado: {
      nome: "Flange Especial Ø 180mm SAE 1045 Furada",
      quantidade: 12,
      unidade: "un",
      adicionadoEstoque: false
    },
    observacoes: "Tolerância H7 nos furos de fixação."
  }
];

function cloneDefault(value) {
  return JSON.parse(JSON.stringify(value));
}

// ==========================================
// GERENCIADOR DE ESTADO & ARMAZENAMENTO
// ==========================================
class StockManager {
  constructor() {
    this.STORAGE_KEY = "metalestoque_pro_data_v1";
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          parsed.schemaVersion = Number.isInteger(parsed.schemaVersion) ? parsed.schemaVersion : 1;
          if (!Array.isArray(parsed.auditoria)) parsed.auditoria = [];
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Erro ao carregar do localStorage, inicializando padrão:", e);
    }
    const initial = {
      schemaVersion: 1,
      config: cloneDefault(DEFAULT_CONFIG),
      inventory: cloneDefault(DEFAULT_INVENTORY),
      retalhos: cloneDefault(DEFAULT_RETALHOS),
      movimentacoes: cloneDefault(DEFAULT_MOVIMENTACOES),
      ops: cloneDefault(DEFAULT_OPS),
      auditoria: []
    };
    this.saveData(initial);
    return initial;
  }

  saveData(dataToSave = this.data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToSave));
      this.data = dataToSave;
    } catch (e) {
      console.error("Erro ao salvar no localStorage:", e);
    }
  }

  resetToDefault() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.data = {
      schemaVersion: 1,
      config: cloneDefault(DEFAULT_CONFIG),
      inventory: cloneDefault(DEFAULT_INVENTORY),
      retalhos: cloneDefault(DEFAULT_RETALHOS),
      movimentacoes: cloneDefault(DEFAULT_MOVIMENTACOES),
      ops: cloneDefault(DEFAULT_OPS),
      auditoria: []
    };
    this.saveData();
  }

  clearAll() {
    this.data = {
      schemaVersion: 1,
      config: cloneDefault(DEFAULT_CONFIG),
      inventory: [],
      retalhos: [],
      movimentacoes: [],
      ops: [],
      auditoria: []
    };
    this.saveData();
  }
}

const db = new StockManager();

function recordAudit(event) {
  if (!Array.isArray(db.data.auditoria)) db.data.auditoria = [];
  db.data.auditoria.push({
    id: "aud-" + Date.now() + Math.random().toString(36).substr(2, 5),
    data: new Date().toISOString(),
    tipo: "auditoria",
    itemId: event.itemId || "",
    itemSku: event.itemSku || "",
    itemNome: event.itemNome || "",
    quantidade: event.quantidade ?? 0,
    unidade: event.unidade || "-",
    custo_unitario: event.custo_unitario ?? 0,
    valor_total: event.valor_total ?? 0,
    motivo: event.motivo || "Alteração auditável",
    responsavel: event.responsavel || db.data.config.responsavel || "Operador não informado",
    obs: event.obs || ""
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeIdentifier(value) {
  return String(value ?? "").replace(/[^a-zA-Z0-9_-]/g, "");
}

// ==========================================
// FORMATAÇÃO E UTILITÁRIOS
// ==========================================
function formatCurrency(val) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
}

function formatDate(isoStr) {
  if (!isoStr) return "-";
  const d = new Date(isoStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatDateOnly(dateStr) {
  if (!dateStr) return "-";
  const parts = dateStr.split("T")[0].split("-");
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateStr;
}

function getCategoryName(cat) {
  const map = {
    chapas: "Chapas Metálicas",
    tubos_perfis: "Tubos, Vigas & Perfis",
    retalhos: "Sobras & Retalhos",
    solda_corte: "Solda & Consumíveis",
    usinagem: "Ferramental Usinagem",
    fixadores: "Fixadores & Parafusos",
    quimicos_oleos: "Químicos & Fluidos",
    epi: "EPI & Segurança",
    semiacabados: "Semi-acabados (WIP)",
    acabados: "Produtos Acabados"
  };
  return map[cat] || cat;
}

function getCategoryTagClass(cat) {
  const map = {
    chapas: "tag-chapa",
    tubos_perfis: "tag-tubo",
    retalhos: "tag-retalho",
    solda_corte: "tag-solda",
    usinagem: "tag-usinagem",
    fixadores: "tag-fixador",
    quimicos_oleos: "badge-neutral",
    epi: "tag-epi",
    semiacabados: "badge-warning",
    acabados: "badge-success"
  };
  return map[cat] || "badge-neutral";
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "info";
  if (type === "success") icon = "check-circle";
  if (type === "error") icon = "alert-octagon";
  if (type === "warning") icon = "alert-triangle";

  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================
// CONTROLADOR DE NAVEGAÇÃO E TABS
// ==========================================
function switchTab(tabId) {
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

  const targetPane = document.getElementById(tabId);
  const targetBtn = document.querySelector(`.nav-item[data-tab="${tabId}"]`);

  if (targetPane) targetPane.classList.add("active");
  if (targetBtn) targetBtn.classList.add("active");

  const titles = {
    tabDashboard: { title: "Painel Geral", sub: "Visão executiva do estoque e indicadores de produção" },
    tabEstoque: { title: "Almoxarifado & Catálogo", sub: "Controle físico, matérias-primas e certificados de qualidade" },
    tabRetalhos: { title: "Pátio de Retalhos & Sobras", sub: "Gestão inteligente de reaproveitamento de chapas e pontas" },
    tabOP: { title: "Ordens de Produção (OP)", sub: "Acompanhamento, lista de materiais e baixas de estoque" },
    tabMovimentacoes: { title: "Movimentações & Auditoria", sub: "Histórico detalhado de entradas, saídas e requisições" },
    tabCompras: { title: "Necessidade de Compras", sub: "Itens abaixo do estoque mínimo e cotações" },
    tabCalculadora: { title: "Calculadora Metalmecânica", sub: "Cálculo de peso teórico para chapas, tubos e tarugos" },
    tabEtiquetas: { title: "Etiquetas & QR Code", sub: "Identificação física para paletes, gavetas e prateleiras" },
    tabConfig: { title: "Configurações & Backup", sub: "Preferências, dados da empresa e segurança de dados" }
  };

  const info = titles[tabId] || { title: "Estoque", sub: "" };
  document.getElementById("pageTitle").textContent = info.title;
  document.getElementById("pageSubtitle").textContent = info.sub;

  // Atualizar visualização específica
  if (tabId === "tabDashboard") renderDashboard();
  if (tabId === "tabEstoque") renderInventoryTable();
  if (tabId === "tabRetalhos") renderRetalhosTable();
  if (tabId === "tabOP") renderOPCards();
  if (tabId === "tabMovimentacoes") renderMovimentacoesTable();
  if (tabId === "tabCompras") renderComprasTable();
  if (tabId === "tabEtiquetas") renderEtiquetasPreview();

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// RENDERIZAÇÃO: DASHBOARD
// ==========================================
let categoryChartInstance = null;
let movementChartInstance = null;

function renderDashboard() {
  const items = db.data.inventory;
  const movs = db.data.movimentacoes;
  const ops = db.data.ops;
  const retalhos = db.data.retalhos;

  // KPIs
  const totalItens = items.length;
  const totalValor = items.reduce((acc, it) => acc + (it.estoque_atual * it.custo_unitario), 0);
  const itensCriticos = items.filter(it => it.estoque_atual <= it.estoque_minimo);
  const opsAtivas = ops.filter(op => op.status === "em_producao" || op.status === "planejada").length;
  const totalRetalhos = retalhos.filter(r => r.status === "disponivel").length;

  document.getElementById("dashTotalItens").textContent = totalItens;
  document.getElementById("dashTotalValor").textContent = formatCurrency(totalValor);
  document.getElementById("dashItensCriticos").textContent = itensCriticos.length;
  document.getElementById("dashOpsAtivas").textContent = opsAtivas;
  document.getElementById("dashRetalhos").textContent = totalRetalhos;

  // Atualizar badge de alertas no menu
  const alertBadges = document.querySelectorAll(".badge-alert-count");
  alertBadges.forEach(b => {
    b.textContent = itensCriticos.length;
    b.style.display = itensCriticos.length > 0 ? "inline-block" : "none";
  });

  // Tabela de Alertas Rápidos no Dashboard
  const tbodyAlertas = document.getElementById("dashAlertasTableBody");
  if (tbodyAlertas) {
    if (itensCriticos.length === 0) {
      tbodyAlertas.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--accent-emerald); padding: 20px;">
        <i data-lucide="check-circle" style="vertical-align: middle; margin-right: 6px;"></i> Todos os itens estão com nível seguro de estoque!
      </td></tr>`;
    } else {
      tbodyAlertas.innerHTML = itensCriticos.slice(0, 6).map(it => {
        const perc = Math.round((it.estoque_atual / it.estoque_minimo) * 100);
        return `
          <tr>
            <td><strong>${escapeHtml(it.sku)}</strong></td>
            <td>${escapeHtml(it.nome)}</td>
            <td><span class="badge ${getCategoryTagClass(it.categoria)}">${escapeHtml(getCategoryName(it.categoria))}</span></td>
            <td><strong style="color: var(--accent-rose);">${it.estoque_atual} ${escapeHtml(it.unidade)}</strong> (Mín: ${it.estoque_minimo})</td>
            <td>
              <button class="btn btn-sm btn-primary" onclick="openMovementModal('${safeIdentifier(it.id)}', 'entrada')">
                <i data-lucide="plus-circle" style="width: 14px; height: 14px;"></i> Comprar / Entrada
              </button>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  // Últimas Movimentações no Dashboard
  const tbodyUltimasMovs = document.getElementById("dashMovsTableBody");
  if (tbodyUltimasMovs) {
    const ultimas = [...movs].reverse().slice(0, 6);
    tbodyUltimasMovs.innerHTML = ultimas.map(m => {
      let badgeClass = "badge-success";
      let icon = "arrow-down-left";
      let sinal = "+";
      if (m.tipo === "saida" || m.tipo === "baixa_op") { badgeClass = "badge-danger"; icon = "arrow-up-right"; sinal = "-"; }
      if (m.tipo === "ajuste") { badgeClass = "badge-warning"; icon = "refresh-cw"; sinal = "±"; }

      return `
        <tr>
          <td><span class="badge ${badgeClass}"><i data-lucide="${icon}" style="width: 12px; height: 12px;"></i> ${m.tipo.toUpperCase()}</span></td>
          <td><strong>${escapeHtml(m.itemSku)}</strong> - ${escapeHtml(m.itemNome)}</td>
          <td><strong>${sinal}${m.quantidade} ${escapeHtml(m.unidade)}</strong></td>
          <td>${formatCurrency(m.valor_total)}</td>
          <td>${escapeHtml(m.motivo)}</td>
          <td>${formatDate(m.data)}</td>
        </tr>
      `;
    }).join("");
  }

  // Gráficos (Chart.js)
  renderDashboardCharts(items, movs);
}

function renderDashboardCharts(items, movs) {
  if (typeof Chart === "undefined") return;

  // 1. Gráfico de Valor por Categoria
  const catValues = {};
  items.forEach(it => {
    const cat = getCategoryName(it.categoria);
    const val = it.estoque_atual * it.custo_unitario;
    catValues[cat] = (catValues[cat] || 0) + val;
  });

  const catLabels = Object.keys(catValues);
  const catData = Object.values(catValues);

  const ctxCat = document.getElementById("chartCategorias");
  if (ctxCat) {
    if (categoryChartInstance) categoryChartInstance.destroy();
    categoryChartInstance = new Chart(ctxCat, {
      type: "doughnut",
      data: {
        labels: catLabels,
        datasets: [{
          data: catData,
          backgroundColor: [
            "#0284c7", "#10b981", "#f59e0b", "#f97316",
            "#8b5cf6", "#06b6d4", "#ec4899", "#64748b"
          ],
          borderWidth: 1,
          borderColor: "#1e293b"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right", labels: { color: "#94a3b8", font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${formatCurrency(context.raw)}`;
              }
            }
          }
        }
      }
    });
  }

  // 2. Gráfico de Fluxo de Entradas e Saídas
  const ctxMov = document.getElementById("chartMovimentacoes");
  if (ctxMov) {
    if (movementChartInstance) movementChartInstance.destroy();
    
    // Contabilizar últimos 7 dias de movimentação
    const daysMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const str = d.toISOString().split("T")[0];
      const label = `${d.getDate()}/${d.getMonth()+1}`;
      daysMap[str] = { label, entradas: 0, saidas: 0 };
    }

    movs.forEach(m => {
      const day = m.data.split("T")[0];
      if (daysMap[day]) {
        if (m.tipo === "entrada") daysMap[day].entradas += (m.valor_total || 0);
        if (m.tipo === "saida" || m.tipo === "baixa_op") daysMap[day].saidas += (m.valor_total || 0);
      }
    });

    const labels = Object.values(daysMap).map(d => d.label);
    const dataEntradas = Object.values(daysMap).map(d => d.entradas);
    const dataSaidas = Object.values(daysMap).map(d => d.saidas);

    movementChartInstance = new Chart(ctxMov, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Entradas (R$)",
            data: dataEntradas,
            backgroundColor: "rgba(16, 185, 129, 0.7)",
            borderColor: "#10b981",
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: "Saídas / Consumo (R$)",
            data: dataSaidas,
            backgroundColor: "rgba(244, 63, 94, 0.7)",
            borderColor: "#f43f5e",
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#94a3b8" } },
          y: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: {
              color: "#94a3b8",
              callback: val => "R$ " + val
            }
          }
        },
        plugins: {
          legend: { labels: { color: "#94a3b8" } }
        }
      }
    });
  }
}

// ==========================================
// RENDERIZAÇÃO: ALMOXARIFADO / ESTOQUE COM PAGINAÇÃO E EDIÇÃO EM MASSA
// ==========================================
let currentPage = 1;
let itemsPerPage = 50;
let isInlineEditMode = false;

function changeItemsPerPage(val) {
  itemsPerPage = val === "all" ? "all" : parseInt(val);
  currentPage = 1;
  renderInventoryTable();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderInventoryTable();
  }
}

function nextPage() {
  currentPage++;
  renderInventoryTable();
}

function toggleInlineEditMode() {
  if (isInlineEditMode) {
    // Salvar alterações
    saveInlineEdits();
  } else {
    isInlineEditMode = true;
    const btn = document.getElementById("btnToggleInlineEdit");
    if (btn) {
      btn.className = "btn btn-success";
      btn.innerHTML = `<i data-lucide="save"></i> <span id="inlineEditBtnText">Salvar Alterações</span>`;
    }
    showToast("Modo de Edição Rápida ativado! Altere estoques e preços diretamente na tabela.", "warning");
    renderInventoryTable();
  }
}

function saveInlineEdits() {
  const estoquesInputs = document.querySelectorAll(".inline-estoque");
  const custosInputs = document.querySelectorAll(".inline-custo");
  const locaisInputs = document.querySelectorAll(".inline-local");
  const minimosInputs = document.querySelectorAll(".inline-minimo");

  let alterados = 0;

  estoquesInputs.forEach(input => {
    const id = input.getAttribute("data-id");
    const item = db.data.inventory.find(i => i.id === id);
    if (item) {
      const novoEstoque = parseFloat(input.value);
      if (Number.isFinite(novoEstoque) && novoEstoque >= 0 && novoEstoque !== item.estoque_atual) {
        // Registrar movimentação de ajuste
        db.data.movimentacoes.push({
          id: "mov-" + Date.now() + Math.random().toString(36).substr(2, 4),
          data: new Date().toISOString(),
          tipo: "ajuste",
          itemId: item.id,
          itemSku: item.sku,
          itemNome: item.nome,
          quantidade: novoEstoque - item.estoque_atual,
          unidade: item.unidade,
          custo_unitario: item.custo_unitario,
          valor_total: Math.abs(novoEstoque - item.estoque_atual) * item.custo_unitario,
          motivo: "Ajuste rápido em grade",
          responsavel: db.data.config.responsavel,
          obs: `Saldo alterado de ${item.estoque_atual} para ${novoEstoque}.`
        });
        item.estoque_atual = novoEstoque;
        alterados++;
      }
    }
  });

  custosInputs.forEach(input => {
    const id = input.getAttribute("data-id");
    const item = db.data.inventory.find(i => i.id === id);
    if (item) {
      const novoCusto = parseFloat(input.value);
      if (Number.isFinite(novoCusto) && novoCusto >= 0 && novoCusto !== item.custo_unitario) {
        const custoAnterior = item.custo_unitario;
        item.custo_unitario = novoCusto;
        recordAudit({ itemId:item.id, itemSku:item.sku, itemNome:item.nome, unidade:item.unidade, custo_unitario:novoCusto, motivo:"Alteração de custo em grade", obs:"Custo alterado de " + custoAnterior + " para " + novoCusto + "." });
        alterados++;
      }
    }
  });

  locaisInputs.forEach(input => {
    const id = input.getAttribute("data-id");
    const item = db.data.inventory.find(i => i.id === id);
    if (item && input.value.trim() !== item.localizacao) {
      const localAnterior = item.localizacao;
      item.localizacao = input.value.trim();
      recordAudit({ itemId:item.id, itemSku:item.sku, itemNome:item.nome, unidade:item.unidade, motivo:"Alteração de localização em grade", obs:"Localização alterada de " + localAnterior + " para " + item.localizacao + "." });
      alterados++;
    }
  });

  minimosInputs.forEach(input => {
    const id = input.getAttribute("data-id");
    const item = db.data.inventory.find(i => i.id === id);
    if (item) {
      const novoMin = parseFloat(input.value);
      if (Number.isFinite(novoMin) && novoMin >= 0 && novoMin !== item.estoque_minimo) {
        const minimoAnterior = item.estoque_minimo;
        item.estoque_minimo = novoMin;
        recordAudit({ itemId:item.id, itemSku:item.sku, itemNome:item.nome, unidade:item.unidade, motivo:"Alteração de estoque mínimo em grade", obs:"Mínimo alterado de " + minimoAnterior + " para " + novoMin + "." });
        alterados++;
      }
    }
  });

  db.saveData();
  isInlineEditMode = false;

  const btn = document.getElementById("btnToggleInlineEdit");
  if (btn) {
    btn.className = "btn btn-warning";
    btn.innerHTML = `<i data-lucide="edit-3"></i> <span id="inlineEditBtnText">Modo Edição Rápida</span>`;
  }

  showToast(`${alterados} campos atualizados com sucesso!`, "success");
  renderInventoryTable();
  renderDashboard();
}

function renderInventoryTable() {
  const tbody = document.getElementById("inventoryTableBody");
  if (!tbody) return;

  const filterCategory = document.getElementById("filterCategory")?.value || "all";
  const filterStatus = document.getElementById("filterStatus")?.value || "all";
  const searchTerm = (document.getElementById("searchInventory")?.value || "").toLowerCase().trim();

  let filtered = db.data.inventory.filter(item => {
    if (filterCategory !== "all" && item.categoria !== filterCategory) return false;
    if (filterStatus === "alerta" && item.estoque_atual > item.estoque_minimo) return false;
    if (filterStatus === "zerado" && item.estoque_atual > 0) return false;
    if (filterStatus === "normal" && item.estoque_atual <= item.estoque_minimo) return false;
    if (searchTerm) {
      const matchSku = (item.sku || "").toLowerCase().includes(searchTerm);
      const matchNome = (item.nome || "").toLowerCase().includes(searchTerm);
      const matchCorrida = (item.corrida || "").toLowerCase().includes(searchTerm);
      const matchLoc = (item.localizacao || "").toLowerCase().includes(searchTerm);
      const matchMat = (item.material || "").toLowerCase().includes(searchTerm);
      if (!matchSku && !matchNome && !matchCorrida && !matchLoc && !matchMat) return false;
    }
    return true;
  });

  const totalCount = filtered.length;
  document.getElementById("inventoryCount").textContent = `${totalCount.toLocaleString('pt-BR')} itens encontrados`;

  // Cálculos de Paginação
  const perPage = itemsPerPage === "all" ? totalCount : itemsPerPage;
  const totalPages = itemsPerPage === "all" ? 1 : Math.max(1, Math.ceil(totalCount / perPage));

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = itemsPerPage === "all" ? totalCount : Math.min(startIndex + perPage, totalCount);
  const pageItems = filtered.slice(startIndex, endIndex);

  // Atualizar controles de paginação
  const pagInfo = document.getElementById("paginationInfo");
  if (pagInfo) {
    if (totalCount === 0) {
      pagInfo.textContent = "Nenhum item encontrado.";
    } else {
      pagInfo.textContent = `Exibindo itens ${(startIndex + 1).toLocaleString('pt-BR')} a ${endIndex.toLocaleString('pt-BR')} de ${totalCount.toLocaleString('pt-BR')}`;
    }
  }

  const curPageInd = document.getElementById("currentPageIndicator");
  if (curPageInd) curPageInd.textContent = `${currentPage} / ${totalPages}`;

  const btnPrev = document.getElementById("btnPrevPage");
  if (btnPrev) btnPrev.disabled = currentPage <= 1;

  const btnNext = document.getElementById("btnNextPage");
  if (btnNext) btnNext.disabled = currentPage >= totalPages;

  if (totalCount === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 40px; color: var(--text-secondary);">
      <i data-lucide="package-search" style="width: 36px; height: 36px; margin-bottom: 8px; display: block; margin: 0 auto 8px;"></i>
      Nenhum item localizado com os filtros selecionados.
    </td></tr>`;
    if (window.lucide) lucide.createIcons();
    return;
  }

  tbody.innerHTML = pageItems.map(item => {
    const isCritical = item.estoque_atual <= item.estoque_minimo;
    const isZero = item.estoque_atual === 0;

    let statusBadge = `<span class="badge badge-success"><i data-lucide="check" style="width: 12px; height: 12px;"></i> Normal</span>`;
    if (isZero) {
      statusBadge = `<span class="badge badge-danger"><i data-lucide="slash" style="width: 12px; height: 12px;"></i> ZERADO</span>`;
    } else if (isCritical) {
      statusBadge = `<span class="badge badge-danger"><i data-lucide="alert-triangle" style="width: 12px; height: 12px;"></i> Crítico</span>`;
    }

    const valorTotalItem = item.estoque_atual * item.custo_unitario;

    if (isInlineEditMode) {
      // Linha em modo de edição rápida
      return `
        <tr style="background-color: rgba(6, 182, 212, 0.03);">
          <td>
            <span style="font-family: monospace; font-weight: 700; color: var(--accent-cyan);">${escapeHtml(item.sku)}</span>
          </td>
          <td>
            <strong>${escapeHtml(item.nome)}</strong>
          </td>
          <td><span class="badge ${getCategoryTagClass(item.categoria)}">${escapeHtml(getCategoryName(item.categoria))}</span></td>
          <td>
            <input type="text" class="inline-input inline-local" data-id="${safeIdentifier(item.id)}" value="${escapeHtml(item.localizacao || "")}" placeholder="Localização">
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 4px;">
              <input type="number" step="any" class="inline-input inline-estoque" data-id="${safeIdentifier(item.id)}" value="${item.estoque_atual}">
              <span style="font-size: 11px; color: var(--text-muted);">${escapeHtml(item.unidade)}</span>
            </div>
            <div style="margin-top: 4px; font-size: 11px; display: flex; align-items: center; gap: 4px;">
              <span>Mín:</span>
              <input type="number" step="any" class="inline-input inline-minimo" data-id="${safeIdentifier(item.id)}" value="${item.estoque_minimo}" style="max-width: 60px;">
            </div>
          </td>
          <td>${statusBadge}</td>
          <td>
            <input type="number" step="0.01" class="inline-input inline-custo" data-id="${safeIdentifier(item.id)}" value="${item.custo_unitario}">
          </td>
          <td>
            <span style="color: var(--accent-emerald); font-size: 11px; font-weight: 600;">Editando</span>
          </td>
        </tr>
      `;
    }

    return `
      <tr>
        <td>
          <span style="font-family: monospace; font-weight: 700; color: var(--accent-cyan);">${escapeHtml(item.sku)}</span>
          ${item.corrida ? `<br><span style="font-size: 10.5px; color: var(--text-muted);"><i data-lucide="shield-check" style="width: 11px; height: 11px;"></i> ${escapeHtml(item.corrida)}</span>` : ""}
        </td>
        <td>
          <strong>${item.nome}</strong>
          ${item.dimensoes ? `<br><span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHtml(item.dimensoes)}</span>` : ""}
        </td>
        <td><span class="badge ${getCategoryTagClass(item.categoria)}">${getCategoryName(item.categoria)}</span></td>
        <td>
          <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-secondary);">
            <i data-lucide="map-pin" style="width: 13px; height: 13px; color: var(--accent-amber);"></i> ${escapeHtml(item.localizacao || "Pátio Geral")}
          </span>
        </td>
        <td>
          <strong style="font-size: 14px; color: ${isCritical ? 'var(--accent-rose)' : 'inherit'};">
            ${item.estoque_atual.toLocaleString('pt-BR')} ${escapeHtml(item.unidade)}
          </strong>
          <div style="font-size: 11px; color: var(--text-muted);">Mín: ${item.estoque_minimo} | Máx: ${item.estoque_maximo || '-'}</div>
        </td>
        <td>${statusBadge}</td>
        <td>
          <strong>${formatCurrency(item.custo_unitario)}</strong>
          <div style="font-size: 11px; color: var(--text-muted);">Total: ${formatCurrency(valorTotalItem)}</div>
        </td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-sm btn-outline" title="Movimentar (+/-)" onclick="openMovementModal('${safeIdentifier(item.id)}')">
              <i data-lucide="arrow-left-right" style="width: 13px; height: 13px;"></i>
            </button>
            <button class="btn btn-sm btn-outline" title="Etiqueta QR" onclick="printSingleLabel('${safeIdentifier(item.id)}')">
              <i data-lucide="qr-code" style="width: 13px; height: 13px;"></i>
            </button>
            <button class="btn btn-sm btn-outline" title="Editar" onclick="openItemModal('${safeIdentifier(item.id)}')">
              <i data-lucide="edit-3" style="width: 13px; height: 13px;"></i>
            </button>
            <button class="btn btn-sm btn-outline" title="Excluir" onclick="deleteItem('${safeIdentifier(item.id)}')" style="color: var(--accent-rose);">
              <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// RENDERIZAÇÃO: RETALHOS E SOBRAS
// ==========================================
function renderRetalhosTable() {
  const tbody = document.getElementById("retalhosTableBody");
  if (!tbody) return;

  const retalhos = db.data.retalhos;
  const dispCount = retalhos.filter(r => r.status === "disponivel").length;
  document.getElementById("retalhosCount").textContent = `${dispCount} sobras disponíveis no pátio`;

  if (retalhos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 30px; color: var(--text-secondary);">
      Nenhum retalho cadastrado no momento.
    </td></tr>`;
    return;
  }

  tbody.innerHTML = retalhos.map(ret => {
    const isDisp = ret.status === "disponivel";
    return `
      <tr>
        <td><strong>${escapeHtml(ret.material)}</strong></td>
        <td><span style="font-family: monospace; font-weight: 700; color: var(--accent-cyan);">${escapeHtml(ret.dimensoes)}</span></td>
        <td><strong>${ret.peso_estimado_kg} kg</strong></td>
        <td><i data-lucide="map-pin" style="width: 13px; height: 13px; color: var(--accent-amber);"></i> ${escapeHtml(ret.localizacao)}</td>
        <td>${escapeHtml(ret.origem_op || "Corte de chapa")}</td>
        <td>
          <span class="badge ${isDisp ? 'badge-success' : 'badge-neutral'}">
            ${isDisp ? 'DISPONÍVEL' : 'UTILIZADO'}
          </span>
        </td>
        <td>
          ${isDisp ? `
            <button class="btn btn-sm btn-warning" onclick="useRetalho('${safeIdentifier(ret.id)}')">
              <i data-lucide="scissors" style="width: 13px; height: 13px;"></i> Utilizar em OP
            </button>
          ` : `
            <span style="font-size: 11px; color: var(--text-muted);">Baixado</span>
          `}
          <button class="btn btn-sm btn-outline" onclick="deleteRetalho('${safeIdentifier(ret.id)}')" style="color: var(--accent-rose); margin-left: 4px;">
            <i data-lucide="trash" style="width: 13px; height: 13px;"></i>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function useRetalho(id) {
  const r = db.data.retalhos.find(item => item.id === id);
  if (!r) return;
  const opNum = prompt(`Informe a Ordem de Produção (OP) que vai reaproveitar esta sobra (${r.dimensoes}):`, "OP-2026-");
  if (!opNum) return;

  r.status = "utilizado";
  r.destino_op = opNum;
  db.saveData();

  // Registrar histórico
  db.data.movimentacoes.push({
    id: "mov-" + Date.now(),
    data: new Date().toISOString(),
    tipo: "saida",
    itemId: r.id,
    itemSku: "RETALHO",
    itemNome: `Aproveitamento Sobra: ${r.material} (${r.dimensoes})`,
    quantidade: 1,
    unidade: "peça",
    custo_unitario: 0,
    valor_total: 0,
    motivo: `Utilizado na ${opNum}`,
    responsavel: db.data.config.responsavel,
    obs: `Retalho de ${r.peso_estimado_kg}kg economizado de chapa nova.`
  });
  db.saveData();

  showToast(`Sobra vinculada com sucesso à ${opNum}! Economia gerada!`, "success");
  renderRetalhosTable();
}

function deleteRetalho(id) {
  if (!confirm("Tem certeza que deseja excluir este retalho?")) return;
  db.data.retalhos = db.data.retalhos.filter(r => r.id !== id);
  db.saveData();
  renderRetalhosTable();
  showToast("Retalho removido.", "info");
}

// ==========================================
// RENDERIZAÇÃO: ORDENS DE PRODUÇÃO (OP)
// ==========================================
function renderOPCards() {
  const container = document.getElementById("opContainer");
  if (!container) return;

  const ops = db.data.ops;
  if (ops.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-secondary);">
      Nenhuma Ordem de Produção em andamento. Clique em "+ Nova Ordem de Produção" para iniciar.
    </div>`;
    return;
  }

  container.innerHTML = ops.map(op => {
    let statusBadge = `<span class="badge badge-info">PLANEJADA</span>`;
    if (op.status === "em_producao") statusBadge = `<span class="badge badge-warning"><i data-lucide="activity" style="width: 12px; height: 12px;"></i> EM PRODUÇÃO</span>`;
    if (op.status === "concluida") statusBadge = `<span class="badge badge-success"><i data-lucide="check-circle" style="width: 12px; height: 12px;"></i> CONCLUÍDA</span>`;
    if (op.status === "cancelada") statusBadge = `<span class="badge badge-danger">CANCELADA</span>`;

    const allBaixado = op.materiais.every(m => m.baixado);

    return `
      <div class="op-card">
        <div class="op-header">
          <div>
            <div class="op-number">${escapeHtml(op.numero)} - ${escapeHtml(op.projeto)}</div>
            <div class="op-client"><i data-lucide="user" style="width: 13px; height: 13px;"></i> Cliente: <strong>${escapeHtml(op.cliente)}</strong></div>
          </div>
          <div>
            ${statusBadge}
          </div>
        </div>

        <div style="display: flex; gap: 20px; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">
          <div><i data-lucide="calendar" style="width: 12px; height: 12px;"></i> Início: ${formatDateOnly(op.data_inicio)}</div>
          <div><i data-lucide="clock" style="width: 12px; height: 12px;"></i> Previsão Entrega: <strong>${formatDateOnly(op.previsao_entrega)}</strong></div>
        </div>

        <div class="op-materials-list">
          <div style="font-weight: 700; margin-bottom: 6px; color: var(--text-primary); font-size: 12px;">
            <i data-lucide="layers" style="width: 13px; height: 13px;"></i> Lista de Materiais Necessários (BOM):
          </div>
          <table style="width: 100%; font-size: 12px;">
            <thead>
              <tr style="color: var(--text-muted); text-align: left;">
                <th>Item / Material</th>
                <th>Qtd Requerida</th>
                <th>Status Baixa Estoque</th>
              </tr>
            </thead>
            <tbody>
              ${op.materiais.map(mat => `
                <tr>
                  <td>${escapeHtml(mat.nome)} <span style="color: var(--accent-cyan); font-family: monospace;">(${escapeHtml(mat.sku)})</span></td>
                  <td><strong>${mat.quantidade} ${escapeHtml(mat.unidade)}</strong></td>
                  <td>
                    ${mat.baixado ? 
                      `<span style="color: var(--accent-emerald); font-weight: 600;"><i data-lucide="check" style="width: 12px; height: 12px;"></i> Retirado do Estoque</span>` : 
                      `<span style="color: var(--accent-amber); font-weight: 600;"><i data-lucide="clock" style="width: 12px; height: 12px;"></i> Pendente de Baixa</span>`
                    }
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border-color);">
          <div style="font-size: 12.5px;">
            Produto Acabado Gerado: <strong>${op.produto_acabado.quantidade} ${escapeHtml(op.produto_acabado.unidade)} de ${escapeHtml(op.produto_acabado.nome)}</strong>
          </div>
          <div style="display: flex; gap: 8px;">
            ${!allBaixado && op.status !== "concluida" ? `
              <button class="btn btn-sm btn-warning" onclick="baixarMateriaisOP('${safeIdentifier(op.id)}')">
                <i data-lucide="package-minus" style="width: 13px; height: 13px;"></i> Baixar Materiais do Estoque
              </button>
            ` : ''}

            ${op.status !== "concluida" ? `
              <button class="btn btn-sm btn-success" onclick="concluirOP('${safeIdentifier(op.id)}')">
                <i data-lucide="check-check" style="width: 13px; height: 13px;"></i> Concluir OP & Entrar Produto
              </button>
            ` : `
              <span class="badge badge-success"><i data-lucide="award" style="width: 12px; height: 12px;"></i> Finalizada</span>
            `}

            <button class="btn btn-sm btn-outline" onclick="deleteOP('${safeIdentifier(op.id)}')" style="color: var(--accent-rose);">
              <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function baixarMateriaisOP(opId) {
  const op = db.data.ops.find(o => o.id === opId);
  if (!op) return;

  if (!confirm(`Confirmar a baixa automática de todos os materiais pendentes da ${op.numero}?`)) return;

  let faltantes = [];
  const requerimentos = new Map();
  op.materiais.forEach(mat => {
    if (mat.baixado) return;
    const key = String(mat.sku || mat.itemId || "");
    const quantidade = Number(mat.quantidade);
    if (!key || !Number.isFinite(quantidade) || quantidade <= 0) {
      faltantes.push((mat.nome || key || "Material") + " (Quantidade inválida)");
      return;
    }
    requerimentos.set(key, (requerimentos.get(key) || 0) + quantidade);
  });

  requerimentos.forEach((requerido, key) => {
    const invItem = db.data.inventory.find(i => i.sku === key || i.id === key);
    if (!invItem) {
      faltantes.push(key + " (Não cadastrado)");
    } else if (!Number.isFinite(invItem.estoque_atual) || invItem.estoque_atual < requerido) {
      faltantes.push(invItem.nome + " (Estoque atual: " + invItem.estoque_atual + ", Requerido: " + requerido + ")");
    }
  });

  if (faltantes.length > 0) {
    alert("ATENÇÃO: Não há saldo suficiente no estoque para os seguintes itens:\n\n" + faltantes.join("\n") + "\n\nFavor realizar compra ou ajustar saldo antes de baixar.");
    return;
  }

  // Executar a baixa
  op.materiais.forEach(mat => {
    if (!mat.baixado) {
      const invItem = db.data.inventory.find(i => i.id === mat.itemId || i.sku === mat.sku);
      if (invItem) {
        invItem.estoque_atual -= mat.quantidade;
        invItem.ultima_atualizacao = new Date().toISOString();

        // Registrar no histórico de movimentações
        db.data.movimentacoes.push({
          id: "mov-" + Date.now() + Math.random().toString(36).substr(2, 4),
          data: new Date().toISOString(),
          tipo: "baixa_op",
          itemId: invItem.id,
          itemSku: invItem.sku,
          itemNome: invItem.nome,
          quantidade: mat.quantidade,
          unidade: mat.unidade,
          custo_unitario: invItem.custo_unitario,
          valor_total: mat.quantidade * invItem.custo_unitario,
          motivo: `Baixa de BOM para ${op.numero} (${op.projeto})`,
          responsavel: db.data.config.responsavel,
          obs: `Consumo direto de fabricação.`
        });

        mat.baixado = true;
      }
    }
  });

  op.status = "em_producao";
  db.saveData();

  showToast(`Materiais da ${op.numero} baixados com sucesso do estoque!`, "success");
  renderOPCards();
  renderDashboard();
}

function concluirOP(opId) {
  const op = db.data.ops.find(o => o.id === opId);
  if (!op) return;

  if (op.status === "concluida" || op.produto_acabado?.adicionadoEstoque) {
    showToast("Esta Ordem de Produção já foi concluída e lançada no estoque.", "warning");
    return;
  }

  const materiaisPendentes = op.materiais.filter(mat => !mat.baixado);
  if (materiaisPendentes.length > 0) {
    alert("Não é possível concluir a OP enquanto houver materiais pendentes de baixa. Baixe todos os itens da BOM primeiro.");
    return;
  }

  if (!confirm(`Deseja concluir a ${op.numero}? O produto acabado "${op.produto_acabado.nome}" será incorporado ao estoque.`)) return;

  op.status = "concluida";

  const quantidadeProduzida = Number(op.produto_acabado?.quantidade) || 0;
  const custoMateriais = op.materiais.reduce((total, mat) => {
    const item = db.data.inventory.find(inv => inv.id === mat.itemId || inv.sku === mat.sku);
    return total + (item?.custo_unitario || 0) * (Number(mat.quantidade) || 0);
  }, 0);
  const custoProdutoUnitario = quantidadeProduzida > 0 ? custoMateriais / quantidadeProduzida : 0;

  // Verificar se o produto acabado já existe no inventário
  let prod = db.data.inventory.find(i => i.nome.toLowerCase() === op.produto_acabado.nome.toLowerCase());
  if (prod) {
    const saldoAnterior = Number(prod.estoque_atual) || 0;
    const novoSaldo = saldoAnterior + quantidadeProduzida;
    if (novoSaldo > 0) {
      prod.custo_unitario = ((saldoAnterior * (prod.custo_unitario || 0)) + (quantidadeProduzida * custoProdutoUnitario)) / novoSaldo;
    }
    prod.estoque_atual = novoSaldo;
    prod.ultima_atualizacao = new Date().toISOString();
  } else {
    // Cadastrar automaticamente como novo produto acabado
    const newSku = "ACA-" + Math.floor(1000 + Math.random() * 9000);
    prod = {
      id: "item-" + Date.now(),
      sku: newSku,
      nome: op.produto_acabado.nome,
      categoria: "acabados",
      unidade: op.produto_acabado.unidade || "un",
      dimensoes: "Conforme projeto " + op.numero,
      material: "Metalúrgico fabricado",
      corrida: op.numero,
      localizacao: "Pátio Expedição",
      estoque_atual: op.produto_acabado.quantidade,
      estoque_minimo: 0,
      estoque_maximo: 5,
      custo_unitario: custoProdutoUnitario, // Custo direto dos materiais da BOM
      fornecedor: "Fabricação Própria",
      obs: `Gerado pela conclusão da ${op.numero}.`,
      ultima_atualizacao: new Date().toISOString()
    };
    db.data.inventory.push(prod);
  }

  // Registrar movimentação de entrada do produto acabado
  db.data.movimentacoes.push({
    id: "mov-" + Date.now(),
    data: new Date().toISOString(),
    tipo: "entrada",
    itemId: prod.id,
    itemSku: prod.sku,
    itemNome: prod.nome,
    quantidade: quantidadeProduzida,
    unidade: op.produto_acabado.unidade,
    custo_unitario: custoProdutoUnitario,
    valor_total: quantidadeProduzida * custoProdutoUnitario,
    motivo: `Conclusão da ${op.numero} - Entrada Produto Acabado`,
    responsavel: db.data.config.responsavel,
    obs: `Projeto concluído para o cliente ${op.cliente}.`
  });

  op.produto_acabado.adicionadoEstoque = true;
  db.saveData();
  showToast(`Ordem de Produção ${op.numero} Concluída com sucesso!`, "success");
  renderOPCards();
  renderDashboard();
}

function deleteOP(opId) {
  const op = db.data.ops.find(o => o.id === opId);
  if (!op) return;
  if (op.status === "concluida" || op.materiais?.some(mat => mat.baixado)) {
    alert("Esta OP já possui consumo ou conclusão registrada e não pode ser excluída. Use um fluxo de cancelamento/reversão auditável.");
    return;
  }
  if (!confirm("Excluir esta Ordem de Produção?")) return;
  recordAudit({ itemId:"op:" + op.id, itemSku:op.numero, itemNome:op.projeto, motivo:"Exclusão de OP planejada", obs:"OP removida antes de qualquer baixa: cliente " + (op.cliente || "não informado") + "." });
  db.data.ops = db.data.ops.filter(o => o.id !== opId);
  db.saveData();
  renderOPCards();
  showToast("Ordem de Produção removida.", "info");
}

// ==========================================
// RENDERIZAÇÃO: MOVIMENTAÇÕES & HISTÓRICO
// ==========================================
function renderMovimentacoesTable() {
  const tbody = document.getElementById("movimentacoesTableBody");
  if (!tbody) return;

  const tipoFilter = document.getElementById("filterMovTipo")?.value || "all";
  const historico = [...db.data.movimentacoes, ...(db.data.auditoria || [])];
  let movs = [...historico].reverse();

  if (tipoFilter !== "all") {
    movs = movs.filter(m => m.tipo === tipoFilter);
  }

  if (movs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 30px; color: var(--text-secondary);">
      Nenhuma movimentação registrada com os critérios selecionados.
    </td></tr>`;
    return;
  }

  tbody.innerHTML = movs.map(m => {
    let badgeClass = "badge-success";
    let sinal = "+";
    if (m.tipo === "saida" || m.tipo === "baixa_op") { badgeClass = "badge-danger"; sinal = "-"; }
    if (m.tipo === "ajuste") { badgeClass = "badge-warning"; sinal = "±"; }
    if (m.tipo === "auditoria") { badgeClass = "badge-neutral"; sinal = ""; }

    return `
      <tr>
        <td>${formatDate(m.data)}</td>
        <td><span class="badge ${badgeClass}">${m.tipo.toUpperCase()}</span></td>
        <td><strong>${escapeHtml(m.itemSku)}</strong></td>
        <td>${escapeHtml(m.itemNome)}</td>
        <td><strong>${sinal}${m.quantidade} ${m.unidade}</strong></td>
        <td>${formatCurrency(m.valor_total)}</td>
        <td>${escapeHtml(m.motivo)}</td>
        <td><span style="font-size: 11px; color: var(--text-secondary);">${escapeHtml(m.responsavel || "-")}</span></td>
      </tr>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

// ==========================================
// RENDERIZAÇÃO: NECESSIDADE DE COMPRAS
// ==========================================
function renderComprasTable() {
  const tbody = document.getElementById("comprasTableBody");
  if (!tbody) return;

  const criticos = db.data.inventory.filter(it => it.estoque_atual <= it.estoque_minimo);
  let totalSugerido = 0;

  if (criticos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--accent-emerald);">
      <i data-lucide="check-circle-2" style="width: 40px; height: 40px; display: block; margin: 0 auto 10px;"></i>
      Excelente! Nenhum item com necessidade de compra imediata.
    </td></tr>`;
    document.getElementById("comprasTotalSugerido").textContent = "R$ 0,00";
    if (window.lucide) lucide.createIcons();
    return;
  }

  tbody.innerHTML = criticos.map(it => {
    const falta = Math.max(1, (it.estoque_maximo || it.estoque_minimo * 2) - it.estoque_atual);
    const subtotal = falta * it.custo_unitario;
    totalSugerido += subtotal;

    return `
      <tr>
        <td><strong>${escapeHtml(it.sku)}</strong></td>
        <td>${escapeHtml(it.nome)}</td>
        <td><span class="badge ${getCategoryTagClass(it.categoria)}">${escapeHtml(getCategoryName(it.categoria))}</span></td>
        <td><strong style="color: var(--accent-rose);">${it.estoque_atual} ${escapeHtml(it.unidade)}</strong> (Mín: ${it.estoque_minimo})</td>
        <td><strong>${falta} ${escapeHtml(it.unidade)}</strong></td>
        <td>${escapeHtml(it.fornecedor || "Não informado")}</td>
        <td><strong>${formatCurrency(subtotal)}</strong></td>
      </tr>
    `;
  }).join("");

  document.getElementById("comprasTotalSugerido").textContent = formatCurrency(totalSugerido);
  if (window.lucide) lucide.createIcons();
}

function exportarRelatorioCompras() {
  const criticos = db.data.inventory.filter(it => it.estoque_atual <= it.estoque_minimo);
  if (criticos.length === 0) {
    alert("Não há itens com necessidade de compra.");
    return;
  }

  let csv = "\uFEFFCódigo;Descrição;Categoria;Estoque Atual;Estoque Mínimo;Qtd Sugerida;Unidade;Fornecedor;Custo Est. Unit.;Total Est.\n";
  criticos.forEach(it => {
    const falta = Math.max(1, (it.estoque_maximo || it.estoque_minimo * 2) - it.estoque_atual);
    const subtotal = falta * it.custo_unitario;
    csv += [it.sku, it.nome, getCategoryName(it.categoria), it.estoque_atual, it.estoque_minimo, falta, it.unidade, it.fornecedor, Number(it.custo_unitario || 0).toFixed(2), Number(subtotal || 0).toFixed(2)].map(escapeCsv).join(";") + "\n";
  });

  downloadFile(csv, `Necessidade_Compras_Metalurgica_${new Date().toISOString().slice(0,10)}.csv`, "text/csv;charset=utf-8;");
  showToast("Relatório de compras gerado com sucesso!", "success");
}

// ==========================================
// MODAL: NOVO / EDITAR ITEM
// ==========================================
function openItemModal(itemId = null) {
  const modal = document.getElementById("modalItem");
  const form = document.getElementById("formItem");
  form.reset();

  if (itemId) {
    const item = db.data.inventory.find(i => i.id === itemId);
    if (!item) return;
    document.getElementById("modalItemTitle").innerHTML = `<i data-lucide="edit-3"></i> Editar Material: ${item.sku}`;
    document.getElementById("itemId").value = item.id;
    document.getElementById("itemSku").value = item.sku;
    document.getElementById("itemNome").value = item.nome;
    document.getElementById("itemCategoria").value = item.categoria;
    document.getElementById("itemUnidade").value = item.unidade;
    document.getElementById("itemDimensoes").value = item.dimensoes || "";
    document.getElementById("itemMaterial").value = item.material || "";
    document.getElementById("itemCorrida").value = item.corrida || "";
    document.getElementById("itemLocalizacao").value = item.localizacao || "";
    document.getElementById("itemEstoqueAtual").value = item.estoque_atual;
    document.getElementById("itemEstoqueMinimo").value = item.estoque_minimo;
    document.getElementById("itemEstoqueMaximo").value = item.estoque_maximo || "";
    document.getElementById("itemCustoUnitario").value = item.custo_unitario;
    document.getElementById("itemFornecedor").value = item.fornecedor || "";
    document.getElementById("itemObs").value = item.obs || "";
  } else {
    document.getElementById("modalItemTitle").innerHTML = `<i data-lucide="plus-circle"></i> Cadastrar Novo Material no Estoque`;
    document.getElementById("itemId").value = "";
    document.getElementById("itemEstoqueAtual").value = 0;
    document.getElementById("itemEstoqueMinimo").value = 5;
    // Gerar SKU sugerido automático
    document.getElementById("itemSku").value = "MP-" + Math.floor(1000 + Math.random() * 9000);
  }

  modal.classList.add("active");
  if (window.lucide) lucide.createIcons();
}

function closeItemModal() {
  document.getElementById("modalItem").classList.remove("active");
}

function saveItemForm(e) {
  e.preventDefault();
  const id = document.getElementById("itemId").value;
  const sku = document.getElementById("itemSku").value.trim().toUpperCase();
  const nome = document.getElementById("itemNome").value.trim();
  const categoria = document.getElementById("itemCategoria").value;
  const unidade = document.getElementById("itemUnidade").value;
  const dimensoes = document.getElementById("itemDimensoes").value.trim();
  const material = document.getElementById("itemMaterial").value.trim();
  const corrida = document.getElementById("itemCorrida").value.trim();
  const localizacao = document.getElementById("itemLocalizacao").value.trim();
  const estoque_atual = parseFloat(document.getElementById("itemEstoqueAtual").value) || 0;
  const estoque_minimo = parseFloat(document.getElementById("itemEstoqueMinimo").value) || 0;
  const estoque_maximo = parseFloat(document.getElementById("itemEstoqueMaximo").value) || (estoque_minimo * 3);
  const custo_unitario = parseFloat(document.getElementById("itemCustoUnitario").value) || 0;
  const fornecedor = document.getElementById("itemFornecedor").value.trim();
  const obs = document.getElementById("itemObs").value.trim();

  if (!sku || !nome) {
    alert("Preencha Código (SKU) e Descrição do material!");
    return;
  }

  const numericValues = [estoque_atual, estoque_minimo, estoque_maximo, custo_unitario];
  if (numericValues.some(value => !Number.isFinite(value)) || numericValues.some(value => value < 0) || estoque_maximo < estoque_minimo) {
    alert("Confira os valores numéricos: não podem ser negativos e o estoque máximo deve ser maior ou igual ao mínimo.");
    return;
  }

  const skuDuplicado = db.data.inventory.some(item => item.sku === sku && item.id !== id);
  if (skuDuplicado) {
    alert("Já existe um item cadastrado com o código SKU " + sku + "! Por favor utilize um código único.");
    return;
  }

  if (id) {
    // Editar
    const index = db.data.inventory.findIndex(i => i.id === id);
    if (index !== -1) {
      const previousItem = db.data.inventory[index];
      const changedFields = [];
      if (previousItem.sku !== sku) changedFields.push("SKU");
      if (previousItem.nome !== nome) changedFields.push("descrição");
      if (previousItem.estoque_atual !== estoque_atual) changedFields.push("saldo");
      if (previousItem.custo_unitario !== custo_unitario) changedFields.push("custo");
      if (previousItem.localizacao !== localizacao) changedFields.push("localização");
      if (previousItem.estoque_minimo !== estoque_minimo || previousItem.estoque_maximo !== estoque_maximo) changedFields.push("níveis de estoque");
      if (changedFields.length > 0) {
        recordAudit({
          itemId: previousItem.id,
          itemSku: sku,
          itemNome: nome,
          unidade,
          custo_unitario,
          motivo: "Edição de cadastro de material",
          obs: "Campos alterados: " + changedFields.join(", ")
        });
      }
      db.data.inventory[index] = {
        ...db.data.inventory[index],
        sku, nome, categoria, unidade, dimensoes, material, corrida,
        localizacao, estoque_atual, estoque_minimo, estoque_maximo,
        custo_unitario, fornecedor, obs,
        ultima_atualizacao: new Date().toISOString()
      };
      showToast(`Material ${sku} atualizado com sucesso!`, "success");
    }
  } else {
    // Verificar SKU duplicado
    if (db.data.inventory.some(i => i.sku === sku)) {
      alert(`Já existe um item cadastrado com o código SKU ${sku}! Por favor utilize um código único.`);
      return;
    }

    const newItem = {
      id: "item-" + Date.now(),
      sku, nome, categoria, unidade, dimensoes, material, corrida,
      localizacao, estoque_atual, estoque_minimo, estoque_maximo,
      custo_unitario, fornecedor, obs,
      ultima_atualizacao: new Date().toISOString()
    };
    db.data.inventory.push(newItem);

    // Movimentação inicial se estoque > 0
    if (estoque_atual > 0) {
      db.data.movimentacoes.push({
        id: "mov-" + Date.now(),
        data: new Date().toISOString(),
        tipo: "entrada",
        itemId: newItem.id,
        itemSku: newItem.sku,
        itemNome: newItem.nome,
        quantidade: estoque_atual,
        unidade: newItem.unidade,
        custo_unitario: newItem.custo_unitario,
        valor_total: estoque_atual * newItem.custo_unitario,
        motivo: "Saldo Inicial / Cadastro de Produto",
        responsavel: db.data.config.responsavel,
        obs: "Implantação de saldo."
      });
    }

    showToast(`Material ${sku} cadastrado com sucesso!`, "success");
  }

  db.saveData();
  closeItemModal();
  renderInventoryTable();
  renderDashboard();
}

function deleteItem(itemId) {
  const item = db.data.inventory.find(i => i.id === itemId);
  if (!item) return;

  if (!confirm(`Confirma a exclusão de "${item.nome}" (${item.sku}) do estoque?\n\nHistóricos de movimentação anteriores serão mantidos.`)) {
    return;
  }

  recordAudit({ itemId:item.id, itemSku:item.sku, itemNome:item.nome, unidade:item.unidade, custo_unitario:item.custo_unitario, motivo:"Exclusão de material", obs:"Cadastro removido; movimentações históricas preservadas." });
  db.data.inventory = db.data.inventory.filter(i => i.id !== itemId);
  db.saveData();
  showToast(`Item ${item.sku} removido.`, "info");
  renderInventoryTable();
  renderDashboard();
}

// ==========================================
// MODAL: MOVIMENTAÇÃO DE ESTOQUE (+/-)
// ==========================================
function openMovementModal(itemId = null, forcedType = null) {
  const modal = document.getElementById("modalMovement");
  const form = document.getElementById("formMovement");
  form.reset();

  const selectItem = document.getElementById("movItemId");
  selectItem.innerHTML = `<option value="">-- Selecione o Material --</option>` +
    db.data.inventory.map(i => `<option value="${escapeHtml(i.id)}">${escapeHtml(i.sku)} - ${escapeHtml(i.nome)} (Atual: ${i.estoque_atual} ${escapeHtml(i.unidade)})</option>`).join("");

  if (itemId) {
    selectItem.value = itemId;
    onMovementItemChange();
  }

  if (forcedType) {
    document.getElementById("movTipo").value = forcedType;
  }

  document.getElementById("movResponsavel").value = db.data.config.responsavel || "Almoxarife";
  modal.classList.add("active");
  if (window.lucide) lucide.createIcons();
}

function closeMovementModal() {
  document.getElementById("modalMovement").classList.remove("active");
}

function onMovementItemChange() {
  const selectItem = document.getElementById("movItemId");
  const item = db.data.inventory.find(i => i.id === selectItem.value);
  const infoSpan = document.getElementById("movItemInfo");
  if (item) {
    infoSpan.textContent = `Saldo Atual: ${item.estoque_atual} ${item.unidade} | Custo: ${formatCurrency(item.custo_unitario)}`;
    document.getElementById("movCustoUnitario").value = item.custo_unitario;
    document.getElementById("movUnidadeLabel").textContent = item.unidade;
  } else {
    infoSpan.textContent = "";
    document.getElementById("movUnidadeLabel").textContent = "un";
  }
}

function saveMovementForm(e) {
  e.preventDefault();
  const itemId = document.getElementById("movItemId").value;
  const tipo = document.getElementById("movTipo").value;
  const quantidade = parseFloat(document.getElementById("movQuantidade").value);
  const custo = parseFloat(document.getElementById("movCustoUnitario").value) || 0;
  const motivo = document.getElementById("movMotivo").value.trim();
  const responsavel = document.getElementById("movResponsavel").value.trim();
  const obs = document.getElementById("movObs").value.trim();

  if (!itemId || !Number.isFinite(quantidade) || quantidade <= 0 || !Number.isFinite(custo) || custo < 0) {
    alert("Selecione o item e informe uma quantidade e um custo válidos.");
    return;
  }

  const item = db.data.inventory.find(i => i.id === itemId);
  if (!item) return;
  const saldoAnterior = item.estoque_atual;
  let quantidadeMovimentada = quantidade;

  if ((tipo === "saida" || tipo === "baixa_op") && item.estoque_atual < quantidade) {
    if (!confirm(`ATENÇÃO: O estoque atual (${item.estoque_atual}) é menor que a saída solicitada (${quantidade}). O saldo ficará negativo. Deseja prosseguir mesmo assim?`)) {
      return;
    }
  }

  // Atualizar Estoque
  if (tipo === "entrada") {
    // Recalcular custo médio ponderado
    const valorAtual = item.estoque_atual * item.custo_unitario;
    const valorEntrada = quantidade * custo;
    const novoSaldo = item.estoque_atual + quantidade;
    if (novoSaldo > 0) {
      item.custo_unitario = (valorAtual + valorEntrada) / novoSaldo;
    }
    item.estoque_atual += quantidade;
  } else if (tipo === "saida" || tipo === "baixa_op") {
    item.estoque_atual -= quantidade;
  } else if (tipo === "ajuste") {
    // No ajuste, a quantidade digitada é o novo saldo absoluto.
    if (quantidade < 0) {
      alert("O novo saldo não pode ser negativo.");
      return;
    }
    quantidadeMovimentada = quantidade - saldoAnterior;
    item.estoque_atual = quantidade;
  }

  item.ultima_atualizacao = new Date().toISOString();

  // Registrar histórico
  const valorMov = Math.abs(quantidadeMovimentada) * (custo || item.custo_unitario);
  db.data.movimentacoes.push({
    id: "mov-" + Date.now(),
    data: new Date().toISOString(),
    tipo: tipo,
    itemId: item.id,
    itemSku: item.sku,
    itemNome: item.nome,
    quantidade: quantidadeMovimentada,
    unidade: item.unidade,
    custo_unitario: custo || item.custo_unitario,
    valor_total: valorMov,
    motivo: motivo || (tipo === "entrada" ? "Recebimento NF" : "Requisição de Fábrica"),
    responsavel: responsavel || db.data.config.responsavel,
    obs: obs
  });

  db.saveData();
  closeMovementModal();
  showToast(`Movimentação de ${tipo.toUpperCase()} registrada com sucesso!`, "success");
  renderInventoryTable();
  renderMovimentacoesTable();
  renderDashboard();
}

// ==========================================
// MODAL: NOVA ORDEM DE PRODUÇÃO (OP)
// ==========================================
function openOPModal() {
  const modal = document.getElementById("modalOP");
  const form = document.getElementById("formOP");
  form.reset();

  document.getElementById("opNumero").value = "OP-2026-" + Math.floor(10 + Math.random() * 90);
  document.getElementById("opDataInicio").value = new Date().toISOString().split("T")[0];

  const tbody = document.getElementById("opMateriaisTableBody");
  tbody.innerHTML = "";
  addOPMaterialRow(); // Adiciona 1 linha vazia inicial

  modal.classList.add("active");
  if (window.lucide) lucide.createIcons();
}

function closeOPModal() {
  document.getElementById("modalOP").classList.remove("active");
}

function addOPMaterialRow() {
  const tbody = document.getElementById("opMateriaisTableBody");
  const rowId = "opMat_" + Date.now() + Math.random().toString(36).substr(2, 4);

  const options = db.data.inventory.map(i => `<option value="${escapeHtml(i.id)}">${escapeHtml(i.sku)} - ${escapeHtml(i.nome)} (Saldo: ${i.estoque_atual} ${escapeHtml(i.unidade)})</option>`).join("");

  const tr = document.createElement("tr");
  tr.id = rowId;
  tr.innerHTML = `
    <td>
      <select class="form-control op-mat-select" onchange="onOPRowItemChange('${rowId}')" required>
        <option value="">-- Selecione o Material --</option>
        ${options}
      </select>
    </td>
    <td>
      <input type="number" step="any" min="0.01" class="form-control op-mat-qtd" placeholder="Qtd" required style="width: 100px;">
    </td>
    <td>
      <span class="op-mat-unidade" style="font-weight: 600; color: var(--text-secondary);">un</span>
    </td>
    <td>
      <button type="button" class="btn btn-sm btn-outline" onclick="document.getElementById('${rowId}').remove()" style="color: var(--accent-rose);">
        <i data-lucide="trash" style="width: 13px; height: 13px;"></i>
      </button>
    </td>
  `;
  tbody.appendChild(tr);
  if (window.lucide) lucide.createIcons();
}

function onOPRowItemChange(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const select = row.querySelector(".op-mat-select");
  const item = db.data.inventory.find(i => i.id === select.value);
  const unSpan = row.querySelector(".op-mat-unidade");
  if (item && unSpan) {
    unSpan.textContent = item.unidade;
  }
}

function saveOPForm(e) {
  e.preventDefault();
  const numero = document.getElementById("opNumero").value.trim();
  const cliente = document.getElementById("opCliente").value.trim();
  const projeto = document.getElementById("opProjeto").value.trim();
  const data_inicio = document.getElementById("opDataInicio").value;
  const previsao_entrega = document.getElementById("opPrevisaoEntrega").value;
  const prodNome = document.getElementById("opProdNome").value.trim();
  const prodQtd = parseFloat(document.getElementById("opProdQtd").value) || 1;
  const prodUn = document.getElementById("opProdUn").value;
  const observacoes = document.getElementById("opObservacoes").value.trim();

  // Coletar materiais
  const matRows = document.querySelectorAll("#opMateriaisTableBody tr");
  const materiais = [];

  matRows.forEach(row => {
    const sel = row.querySelector(".op-mat-select");
    const qtdInput = row.querySelector(".op-mat-qtd");
    if (sel && sel.value && qtdInput && parseFloat(qtdInput.value) > 0) {
      const item = db.data.inventory.find(i => i.id === sel.value);
      if (item) {
        materiais.push({
          itemId: item.id,
          sku: item.sku,
          nome: item.nome,
          quantidade: parseFloat(qtdInput.value),
          unidade: item.unidade,
          baixado: false
        });
      }
    }
  });

  if (materiais.length === 0) {
    alert("Adicione ao menos um material na lista de materiais (BOM) da Ordem de Produção!");
    return;
  }

  const skusBOM = new Set();
  const temDuplicidadeBOM = materiais.some(mat => {
    const chave = mat.sku || mat.itemId;
    if (skusBOM.has(chave)) return true;
    skusBOM.add(chave);
    return false;
  });
  if (temDuplicidadeBOM) {
    alert("O mesmo material aparece mais de uma vez na BOM. Consolide a quantidade em uma única linha antes de salvar a OP.");
    return;
  }

  const newOP = {
    id: "op-" + Date.now(),
    numero, cliente, projeto, data_inicio, previsao_entrega,
    status: "planejada",
    materiais,
    produto_acabado: {
      nome: prodNome,
      quantidade: prodQtd,
      unidade: prodUn,
      adicionadoEstoque: false
    },
    observacoes
  };

  db.data.ops.push(newOP);
  db.saveData();

  closeOPModal();
  showToast(`Ordem de Produção ${numero} criada com sucesso!`, "success");
  renderOPCards();
  renderDashboard();
}

// ==========================================
// MODAL: NOVO RETALHO / SOBRA
// ==========================================
function openRetalhoModal() {
  const modal = document.getElementById("modalRetalho");
  document.getElementById("formRetalho").reset();
  modal.classList.add("active");
  if (window.lucide) lucide.createIcons();
}

function closeRetalhoModal() {
  document.getElementById("modalRetalho").classList.remove("active");
}

function saveRetalhoForm(e) {
  e.preventDefault();
  const material = document.getElementById("retMaterial").value.trim();
  const dimensoes = document.getElementById("retDimensoes").value.trim();
  const peso = parseFloat(document.getElementById("retPeso").value) || 0;
  const localizacao = document.getElementById("retLocalizacao").value.trim();
  const origem = document.getElementById("retOrigem").value.trim();

  const newRet = {
    id: "ret-" + Date.now(),
    material, dimensoes,
    peso_estimado_kg: peso,
    localizacao: localizacao || "Gaiola de Sobras",
    origem_op: origem || "Corte avulso",
    data_criacao: new Date().toISOString().split("T")[0],
    status: "disponivel"
  };

  db.data.retalhos.push(newRet);
  db.saveData();

  closeRetalhoModal();
  showToast("Retalho cadastrado com sucesso! Disponível para reuso.", "success");
  renderRetalhosTable();
  renderDashboard();
}

// ==========================================
// CALCULADORA METALMECÂNICA DE ENGENHARIA
// ==========================================
let currentCalcMode = "chapa";

function setCalcMode(mode) {
  currentCalcMode = mode;
  document.querySelectorAll(".calc-tab-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.querySelector(`.calc-tab-btn[data-mode="${mode}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  document.getElementById("calcChapaInputs").style.display = mode === "chapa" ? "grid" : "none";
  document.getElementById("calcTuboInputs").style.display = mode === "tubo" ? "grid" : "none";
  document.getElementById("calcTarugoInputs").style.display = mode === "tarugo" ? "grid" : "none";
  document.getElementById("calcPerfilInputs").style.display = mode === "perfil" ? "grid" : "none";

  calcularPesoMetal();
}

function calcularPesoMetal() {
  const densidade = parseFloat(document.getElementById("calcDensidade").value) || 7.85; // g/cm³ ou kg/dm³
  let pesoTotalKg = 0;

  if (currentCalcMode === "chapa") {
    const espessuraMm = parseFloat(document.getElementById("calcChapaEsp").value) || 0;
    const larguraMm = parseFloat(document.getElementById("calcChapaLarg").value) || 0;
    const comprimentoMm = parseFloat(document.getElementById("calcChapaComp").value) || 0;
    const qtd = parseFloat(document.getElementById("calcChapaQtd").value) || 1;

    // Volume em dm³ = (espessura / 10) * (largura / 100) * (comprimento / 100)
    // Peso = esp(mm) * larg(m) * comp(m) * densidade
    pesoTotalKg = espessuraMm * (larguraMm / 1000) * (comprimentoMm / 1000) * densidade * qtd;
  } else if (currentCalcMode === "tubo") {
    const deMm = parseFloat(document.getElementById("calcTuboDE").value) || 0;
    const paredeMm = parseFloat(document.getElementById("calcTuboParede").value) || 0;
    const compM = parseFloat(document.getElementById("calcTuboComp").value) || 0;
    const qtd = parseFloat(document.getElementById("calcTuboQtd").value) || 1;

    // Peso teórico de tubo redondo em kg/m = (DE - parede) * parede * 0.02466 (para aço) ajustado pela densidade
    const fator = (Math.PI * densidade) / 1000;
    const pesoPorMetro = (deMm - paredeMm) * paredeMm * fator;
    pesoTotalKg = pesoPorMetro * compM * qtd;
  } else if (currentCalcMode === "tarugo") {
    const diametroMm = parseFloat(document.getElementById("calcTarugoDiam").value) || 0;
    const compM = parseFloat(document.getElementById("calcTarugoComp").value) || 0;
    const qtd = parseFloat(document.getElementById("calcTarugoQtd").value) || 1;

    const raioDm = (diametroMm / 2) / 100;
    const compDm = compM * 10;
    const volumeDm3 = Math.PI * Math.pow(raioDm, 2) * compDm;
    pesoTotalKg = volumeDm3 * densidade * qtd;
  } else if (currentCalcMode === "perfil") {
    const largMm = parseFloat(document.getElementById("calcPerfilLarg").value) || 0;
    const altMm = parseFloat(document.getElementById("calcPerfilAlt").value) || 0;
    const paredeMm = parseFloat(document.getElementById("calcPerfilParede").value) || 0;
    const compM = parseFloat(document.getElementById("calcPerfilComp").value) || 0;
    const qtd = parseFloat(document.getElementById("calcPerfilQtd").value) || 1;

    // Tubo quadrado/retangular: perímetro médio * parede * comp * densidade
    const perimetroMedioMm = 2 * ((largMm - paredeMm) + (altMm - paredeMm));
    const areaSecaoMm2 = perimetroMedioMm * paredeMm;
    const pesoPorMetro = (areaSecaoMm2 / 1000000) * (densidade * 1000);
    pesoTotalKg = pesoPorMetro * compM * qtd;
  }

  document.getElementById("calcResultPeso").textContent = `${pesoTotalKg.toFixed(2)} kg`;
}

// ==========================================
// ETIQUETAS E GERADOR DE QR CODE OFFLINE
// ==========================================
function renderEtiquetasPreview() {
  const container = document.getElementById("etiquetasPreviewContainer");
  if (!container) return;

  const items = db.data.inventory;
  container.innerHTML = items.map(it => generateLabelHTML(it)).join("");
}

function printSingleLabel(itemId) {
  const item = db.data.inventory.find(i => i.id === itemId);
  if (!item) return;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Etiqueta Industrial - ${item.sku}</title>
      <style>
        body { margin: 0; padding: 10px; font-family: monospace; background: white; color: black; }
        .industrial-label { border: 2px dashed #000; padding: 12px; width: 340px; margin: auto; }
        .label-company { font-size: 11px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 4px; }
        .label-sku { font-size: 16px; font-weight: 900; margin: 6px 0; }
        .label-desc { font-size: 13px; font-weight: bold; margin-bottom: 6px; }
        .meta { font-size: 11px; background: #eee; padding: 6px; margin-top: 6px; border-radius: 4px; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body onload="window.print()">
      <div class="industrial-label">
        <div class="label-company">
          <span>${db.data.config.nomeFantasia.toUpperCase()}</span>
          <span>ALMOXARIFADO</span>
        </div>
        <div class="label-sku">CÓDIGO: ${item.sku}</div>
        <div class="label-desc">${item.nome}</div>
        <div>Dimensões: <strong>${item.dimensoes || '-'}</strong></div>
        <div class="meta">
          <div>Norma/Material: <strong>${item.material || '-'}</strong></div>
          <div>Corrida/Certificado: <strong>${item.corrida || '-'}</strong></div>
          <div>Localização: <strong>${item.localizacao || 'Pátio Central'}</strong></div>
        </div>
        <div style="text-align: center; margin-top: 10px; font-size: 10px;">
          ||||||||||||||||||||||||||||||||||||||||||||||||||||<br>
          *${escapeHtml(item.sku)}*
        </div>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function generateLabelHTML(item) {
  return `
    <div class="industrial-label">
      <div class="label-company">
        <span>${db.data.config.nomeFantasia.toUpperCase()}</span>
        <span>${escapeHtml((item.categoria || "").toUpperCase())}</span>
      </div>
      <div class="label-sku">${escapeHtml(item.sku)}</div>
      <div class="label-desc">${item.nome}</div>
      <div style="font-size: 11px;">Dim: <strong>${escapeHtml(item.dimensoes || "-")}</strong></div>
      <div class="label-meta-grid">
        <div>Mat: <strong>${item.material || '-'}</strong></div>
        <div>Corrida: <strong>${item.corrida || '-'}</strong></div>
        <div>Local: <strong>${item.localizacao || '-'}</strong></div>
        <div>Unidade: <strong>${escapeHtml(item.unidade)}</strong></div>
      </div>
      <div style="text-align: center; margin-top: 6px; font-family: monospace; font-size: 11px; font-weight: bold;">
        ||| | |||| | |||||| | ||| | ||<br>
        *${item.sku}*
      </div>
      <div class="no-print" style="margin-top: 8px; text-align: right;">
        <button class="btn btn-sm btn-outline" onclick="printSingleLabel('${safeIdentifier(item.id)}')">
          <i data-lucide="printer" style="width: 12px; height: 12px;"></i> Imprimir Térmica
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// BACKUP, EXPORTAÇÃO E IMPORTAÇÃO
// ==========================================
function downloadFile(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

function escapeCsv(value) {
  return "\"" + String(value ?? "").replace(/\"/g, "\"\"") + "\"";
}

function exportarBackupJSON() {
  const jsonStr = JSON.stringify(db.data, null, 2);
  const dataFormatada = new Date().toISOString().slice(0, 10);
  downloadFile(jsonStr, `MetalEstoque_PRO_Backup_${dataFormatada}.json`, "application/json");
  showToast("Backup completo exportado em JSON com sucesso!", "success");
}

function importarBackupJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      const arraysObrigatorios = ["inventory", "retalhos", "movimentacoes", "ops"];
      const backupValido = parsed && typeof parsed === "object" && parsed.config && typeof parsed.config === "object" && arraysObrigatorios.every(chave => Array.isArray(parsed[chave]));
      if (backupValido) {
        const safeConfig = {
          razaoSocial: String(parsed.config.razaoSocial ?? DEFAULT_CONFIG.razaoSocial),
          nomeFantasia: String(parsed.config.nomeFantasia ?? DEFAULT_CONFIG.nomeFantasia),
          cnpj: String(parsed.config.cnpj ?? DEFAULT_CONFIG.cnpj),
          responsavel: String(parsed.config.responsavel ?? DEFAULT_CONFIG.responsavel),
          unidadePadrao: String(parsed.config.unidadePadrao ?? DEFAULT_CONFIG.unidadePadrao)
        };
        db.saveData({ schemaVersion: Number.isInteger(parsed.schemaVersion) ? parsed.schemaVersion : 1, config: safeConfig, inventory: parsed.inventory, retalhos: parsed.retalhos, movimentacoes: parsed.movimentacoes, ops: parsed.ops, auditoria: Array.isArray(parsed.auditoria) ? parsed.auditoria : [] });
        showToast("Backup restaurado com sucesso! Recarregando sistema...", "success");
        setTimeout(() => location.reload(), 1000);
      } else {
        alert("O arquivo selecionado não possui a estrutura correta de backup do MetalEstoque PRO.");
      }
    } catch (err) {
      alert("Erro ao ler o arquivo JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

function exportarEstoqueCSV() {
  let csv = "\uFEFFCódigo;Descrição;Categoria;Unidade;Dimensões;Material;Nº Corrida;Localização;Estoque Atual;Estoque Mínimo;Custo Unit.;Valor Total;Fornecedor\n";
  db.data.inventory.forEach(it => {
    const total = it.estoque_atual * it.custo_unitario;
    csv += [it.sku, it.nome, getCategoryName(it.categoria), it.unidade, it.dimensoes || "", it.material || "", it.corrida || "", it.localizacao || "", it.estoque_atual, it.estoque_minimo, Number(it.custo_unitario || 0).toFixed(2), Number(total || 0).toFixed(2), it.fornecedor || ""].map(escapeCsv).join(";") + "\n";
  });
  downloadFile(csv, `Estoque_Metalmecanica_${new Date().toISOString().slice(0,10)}.csv`, "text/csv;charset=utf-8;");
  showToast("Catálogo de estoque exportado em CSV!", "success");
}

function exportarMovimentacoesCSV() {
  let csv = "\uFEFFData;Tipo;Código;Material;Quantidade;Unidade;Custo Unit.;Total;Motivo/OP;Responsável;Observações\n";
  const historico = [...db.data.movimentacoes, ...(db.data.auditoria || [])];
  historico.forEach(m => {
    csv += [formatDate(m.data), (m.tipo || "").toUpperCase(), m.itemSku, m.itemNome, m.quantidade, m.unidade, Number(m.custo_unitario || 0).toFixed(2), Number(m.valor_total || 0).toFixed(2), m.motivo, m.responsavel || "", m.obs || ""].map(escapeCsv).join(";") + "\n";
  });
  downloadFile(csv, `Historico_Movimentacoes_${new Date().toISOString().slice(0,10)}.csv`, "text/csv;charset=utf-8;");
  showToast("Histórico de movimentações exportado em CSV!", "success");
}

function resetarSistemaPadrao() {
  if (confirm("ATENÇÃO: Deseja redefinir todo o banco de dados para os dados padrão de demonstração da metalmecânica? Todos os novos cadastros serão substituídos.")) {
    db.resetToDefault();
    showToast("Dados padrão restaurados.", "info");
    location.reload();
  }
}

function limparTudoSistema() {
  if (confirm("PERIGO: Deseja ZERAR completamente todos os itens, retalhos, OPs e movimentações para começar um almoxarifado do zero absoluto?")) {
    db.clearAll();
    showToast("Sistema zerado com sucesso.", "warning");
    location.reload();
  }
}

// ==========================================
// SALVAR CONFIGURAÇÕES DA EMPRESA
// ==========================================
function saveConfigForm(e) {
  e.preventDefault();
  db.data.config.razaoSocial = document.getElementById("cfgRazao").value.trim();
  db.data.config.nomeFantasia = document.getElementById("cfgFantasia").value.trim();
  db.data.config.cnpj = document.getElementById("cfgCnpj").value.trim();
  db.data.config.responsavel = document.getElementById("cfgResponsavel").value.trim();
  db.saveData();

  document.getElementById("sidebarCompanyName").textContent = db.data.config.nomeFantasia;
  document.getElementById("sidebarCompanyResponsavel").textContent = db.data.config.responsavel;

  showToast("Configurações da empresa salvas com sucesso!", "success");
}

// ==========================================
// TEMA DARK / LIGHT
// ==========================================
function toggleTheme() {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("metalestoque_theme", isLight ? "light" : "dark");
  const icon = document.getElementById("themeToggleIcon");
  if (icon) {
    icon.setAttribute("data-lucide", isLight ? "moon" : "sun");
    if (window.lucide) lucide.createIcons();
  }
}

// ==========================================
// IMPORTAÇÃO EM MASSA (EXCEL / CSV - 3.000+ ITENS)
// ==========================================
let rawImportContent = null;
let parsedImportRows = [];

function openImportModal() {
  document.getElementById("modalImportarMassa").classList.add("active");
  document.getElementById("importFileStats").style.display = "none";
  document.getElementById("btnProcessImport").disabled = true;
  document.getElementById("fileImportInput").value = "";
  rawImportContent = null;
  parsedImportRows = [];
  if (window.lucide) lucide.createIcons();
}

function closeImportModal() {
  document.getElementById("modalImportarMassa").classList.remove("active");
}

function baixarModeloImportacaoCSV() {
  const header = "CODIGO;DESCRICAO;CATEGORIA;UNIDADE;DIMENSOES;MATERIAL;CORRIDA;LOCALIZACAO;ESTOQUE_ATUAL;ESTOQUE_MINIMO;ESTOQUE_MAXIMO;CUSTO_UNITARIO;FORNECEDOR;OBSERVACOES\n";
  const exemplos = [
    'CHP-1020-001;Chapa Aço Carbono SAE 1020 1/4" (6.35mm);chapas;chapa;6.35 x 1200 x 3000 mm;Aço SAE 1020;G-84920;Pátio Chapas - Vão 2;14;5;30;1150.00;Aços Gerdau;Chapa laminada a quente',
    'CHP-INOX-304;Chapa Inox AISI 304 Escovada #14 (2.00mm);chapas;chapa;2.00 x 1250 x 2500 mm;Inox 304;AP-9941;Almox. Especial;9;4;20;980.00;Aperam;Película protetora azul',
    'TUB-RED-050;Tubo Redondo Industrial Ø 2" x 2.00mm;tubos_perfis;barra;Ø 50.8 x 2.00 x 6000 mm;SAE 1020;TM-4410;Cantiléver Central;45;20;100;142.50;Açotubo;Barras de 6 metros',
    'SOL-MIG-120;Arame de Solda MIG/MAG ER70S-6 1.20mm (18kg);solda_corte;un;Carretel 18kg;Cobreado;ESAB-5582;Armário Solda;22;10;50;245.00;ESAB;Solda caldeiraria pesada',
    'FIX-PAR-M1250;Parafuso Sextavado Aço 8.8 M12 x 50mm Zincado;fixadores;cx;M12 x 50 (Cx c/ 100);Aço 8.8;CISER-99;Estante Gaveteiro 22;12;5;30;88.00;Ciser;Parafuso alta resistência'
  ].join("\n");

  const csvCompleto = "\uFEFF" + header + exemplos;
  downloadFile(csvCompleto, "Modelo_Importacao_Estoque_Metalmecanica.csv", "text/csv;charset=utf-8;");
  showToast("Planilha modelo baixada! Abra no Excel para preencher seus 3.000 modelos.", "success");
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    rawImportContent = e.target.result;
    const lines = rawImportContent.split(/\r?\n/).filter(line => line.trim().length > 0);
    
    document.getElementById("importFileName").textContent = file.name;
    document.getElementById("importFileLines").textContent = `${lines.length - 1} produtos detectados`;
    document.getElementById("importFileStats").style.display = "block";
    document.getElementById("btnProcessImport").disabled = false;
  };
  reader.readAsText(file, "UTF-8");
}

function parseImportNumber(rawValue, fallback = 0) {
  const raw = String(rawValue ?? "").trim();
  if (!raw) return fallback;
  const normalized = raw.includes(",") ? raw.replace(/\./g, "").replace(",", ".") : raw;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : NaN;
}

function processImport() {
  if (!rawImportContent) {
    alert("Selecione um arquivo de planilha válido.");
    return;
  }

  const lines = rawImportContent.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) {
    alert("A planilha selecionada parece estar vazia ou possui apenas o cabeçalho.");
    return;
  }

  // Detectar separador (ponto-e-vírgula ";" ou vírgula ",")
  const firstLine = lines[0];
  const delimiter = firstLine.includes(";") ? ";" : ",";
  const mode = document.querySelector('input[name="importMode"]:checked')?.value || "merge";
  const stagedInventory = mode === "replace" ? [] : db.data.inventory.map(item => ({ ...item }));

  if (mode === "replace") {
    if (!confirm(`ATENÇÃO: Você escolheu 'Substituir Tudo'! O estoque atual será limpo e substituído pelos ${lines.length - 1} itens da planilha. Confirma?`)) {
      return;
    }
  }

  let importados = 0;
  let atualizados = 0;
  let erros = 0;
  const skusImportados = new Set();

  // Processar linhas (pulando o cabeçalho na linha 0)
  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    // Split seguro respeitando aspas
    const cols = parseCSVLine(rawLine, delimiter);
    if (cols.length < 2) {
      erros++;
      continue;
    }

    const sku = (cols[0] || "").trim().toUpperCase();
    const nome = (cols[1] || "").trim();
    if (!sku || !nome) {
      erros++;
      continue;
    }
    if (skusImportados.has(sku)) {
      erros++;
      continue;
    }
    skusImportados.add(sku);

    const categoria = (cols[2] || "chapas").trim().toLowerCase().replace(/\s+/g, '_');
    const unidade = (cols[3] || "un").trim();
    const dimensoes = (cols[4] || "").trim();
    const material = (cols[5] || "").trim();
    const corrida = (cols[6] || "").trim();
    const localizacao = (cols[7] || "Almoxarifado").trim();
    
    // Tratamento de números com suporte a decimal pt-BR e validação de domínio.
    const estoque_atual = parseImportNumber(cols[8], 0);
    const estoque_minimo = parseImportNumber(cols[9], 5);
    const estoque_maximoInformado = parseImportNumber(cols[10], NaN);
    const estoque_maximo = Number.isFinite(estoque_maximoInformado) ? estoque_maximoInformado : (estoque_minimo * 3);
    const custo_unitario = parseImportNumber(cols[11], 0);
    const fornecedor = (cols[12] || "").trim();
    const obs = (cols[13] || "").trim();
    const numericImportValues = [estoque_atual, estoque_minimo, estoque_maximo, custo_unitario];
    if (numericImportValues.some(value => !Number.isFinite(value)) || numericImportValues.some(value => value < 0) || estoque_maximo < estoque_minimo) {
      erros++;
      continue;
    }

    const existingIndex = stagedInventory.findIndex(it => it.sku === sku);

    if (existingIndex !== -1 && mode === "merge") {
      // Atualizar existente
      stagedInventory[existingIndex].nome = nome;
      stagedInventory[existingIndex].categoria = categoria || stagedInventory[existingIndex].categoria;
      stagedInventory[existingIndex].unidade = unidade || stagedInventory[existingIndex].unidade;
      stagedInventory[existingIndex].dimensoes = dimensoes || stagedInventory[existingIndex].dimensoes;
      stagedInventory[existingIndex].material = material || stagedInventory[existingIndex].material;
      stagedInventory[existingIndex].corrida = corrida || stagedInventory[existingIndex].corrida;
      stagedInventory[existingIndex].localizacao = localizacao || stagedInventory[existingIndex].localizacao;
      stagedInventory[existingIndex].estoque_atual = estoque_atual;
      stagedInventory[existingIndex].estoque_minimo = estoque_minimo;
      stagedInventory[existingIndex].estoque_maximo = estoque_maximo;
      stagedInventory[existingIndex].custo_unitario = custo_unitario || stagedInventory[existingIndex].custo_unitario;
      stagedInventory[existingIndex].fornecedor = fornecedor || stagedInventory[existingIndex].fornecedor;
      stagedInventory[existingIndex].obs = obs || stagedInventory[existingIndex].obs;
      stagedInventory[existingIndex].ultima_atualizacao = new Date().toISOString();
      atualizados++;
    } else {
      // Inserir novo item
      stagedInventory.push({
        id: "item-" + Date.now() + Math.random().toString(36).substr(2, 5),
        sku, nome, categoria, unidade, dimensoes, material, corrida,
        localizacao, estoque_atual, estoque_minimo, estoque_maximo,
        custo_unitario, fornecedor, obs,
        ultima_atualizacao: new Date().toISOString()
      });
      importados++;
    }
  }

  if (importados === 0 && atualizados === 0) {
    alert("Nenhuma linha válida foi importada. O estoque original foi preservado.");
    return;
  }

  db.data.inventory = stagedInventory;
  db.saveData();
  closeImportModal();

  // Histórico de auditoria da importação
  db.data.movimentacoes.push({
    id: "mov-" + Date.now(),
    data: new Date().toISOString(),
    tipo: "ajuste",
    itemId: "BATCH-IMPORT",
    itemSku: "IMPORTAÇÃO",
    itemNome: `Importação em Massa via Planilha CSV (${importados} novos, ${atualizados} atualizados)`,
    quantidade: importados + atualizados,
    unidade: "itens",
    custo_unitario: 0,
    valor_total: 0,
    motivo: "Carga de Estoque em Lote",
    responsavel: db.data.config.responsavel,
    obs: `Arquivo importado com sucesso.`
  });
  db.saveData();

  const resumoErros = erros > 0 ? " " + erros + " linha(s) rejeitada(s) por validação." : "";
  showToast("Sucesso! " + importados + " itens novos cadastrados e " + atualizados + " atualizados!" + resumoErros, erros > 0 ? "warning" : "success");
  currentPage = 1;
  renderInventoryTable();
  renderDashboard();
}

function parseCSVLine(line, delimiter) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      i++;
    } else if (char === '"' && (inQuotes || current.trim().length === 0)) {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
}

// ==========================================
// CONTAGEM RÁPIDA / INVENTÁRIO POR BIPAGEM
// ==========================================
let currentQuickItem = null;

function openInventarioRapidoModal() {
  document.getElementById("modalInventarioRapido").classList.add("active");
  const input = document.getElementById("quickScanInput");
  input.value = "";
  document.getElementById("quickItemResult").style.display = "none";
  setTimeout(() => input.focus(), 150);
  if (window.lucide) lucide.createIcons();
}

function closeInventarioRapidoModal() {
  document.getElementById("modalInventarioRapido").classList.remove("active");
  renderInventoryTable();
  renderDashboard();
}

function searchQuickItem() {
  const query = document.getElementById("quickScanInput").value.trim().toLowerCase();
  if (!query) return;

  const item = db.data.inventory.find(i => 
    i.sku.toLowerCase() === query || 
    i.nome.toLowerCase().includes(query) || 
    (i.corrida && i.corrida.toLowerCase().includes(query))
  );

  if (!item) {
    alert(`Nenhum item encontrado com o código ou termo: "${query}"`);
    document.getElementById("quickScanInput").select();
    return;
  }

  currentQuickItem = item;
  document.getElementById("quickSku").textContent = item.sku;
  document.getElementById("quickNome").textContent = item.nome;
  document.getElementById("quickLoc").textContent = item.localizacao || "Pátio Geral";
  document.getElementById("quickAtual").textContent = `${item.estoque_atual} ${item.unidade}`;
  
  const inputQtd = document.getElementById("quickNewQtd");
  inputQtd.value = item.estoque_atual;
  document.getElementById("quickItemResult").style.display = "block";
  setTimeout(() => {
    inputQtd.focus();
    inputQtd.select();
  }, 100);
}

function saveQuickCount() {
  if (!currentQuickItem) return;

  const novoSaldo = parseFloat(document.getElementById("quickNewQtd").value);
  if (!Number.isFinite(novoSaldo) || novoSaldo < 0) {
    alert("Digite uma quantidade válida e não negativa.");
    return;
  }

  const saldoAnterior = currentQuickItem.estoque_atual;
  currentQuickItem.estoque_atual = novoSaldo;
  currentQuickItem.ultima_atualizacao = new Date().toISOString();

  // Registrar histórico
  db.data.movimentacoes.push({
    id: "mov-" + Date.now(),
    data: new Date().toISOString(),
    tipo: "ajuste",
    itemId: currentQuickItem.id,
    itemSku: currentQuickItem.sku,
    itemNome: currentQuickItem.nome,
    quantidade: novoSaldo - saldoAnterior,
    unidade: currentQuickItem.unidade,
    custo_unitario: currentQuickItem.custo_unitario,
    valor_total: Math.abs(novoSaldo - saldoAnterior) * currentQuickItem.custo_unitario,
    motivo: "Balanço Rápido / Inventário Físico",
    responsavel: db.data.config.responsavel,
    obs: `Contagem física alterou de ${saldoAnterior} para ${novoSaldo}.`
  });

  db.saveData();

  // Log visual no modal
  const logDiv = document.getElementById("quickScanLog");
  const entry = document.createElement("div");
  entry.style.padding = "4px 0";
  entry.style.borderBottom = "1px solid var(--border-color)";
  entry.innerHTML = `<strong>${escapeHtml(currentQuickItem.sku)}</strong> - Saldo atualizado: <span style="color: var(--accent-cyan); font-weight: bold;">${saldoAnterior} &rarr; ${novoSaldo} ${escapeHtml(currentQuickItem.unidade)}</span> (${new Date().toLocaleTimeString()})`;
  
  if (logDiv.children[0] && logDiv.children[0].tagName === "SPAN") {
    logDiv.innerHTML = "";
  }
  logDiv.prepend(entry);

  showToast(`Item ${currentQuickItem.sku} atualizado para ${novoSaldo} ${currentQuickItem.unidade}!`, "success");

  // Limpar para o próximo item
  currentQuickItem = null;
  document.getElementById("quickItemResult").style.display = "none";
  const scanInput = document.getElementById("quickScanInput");
  scanInput.value = "";
  scanInput.focus();
}

// ==========================================
// MODO TESTE GUIADO (INTERACTIVE TEST RUNNER)
// ==========================================
const GUIDED_SCENARIOS = {
  "1": {
    title: "Roteiro 1: Carga 3.000 Itens (Planilha)",
    steps: [
      {
        title: "Acessar Almoxarifado",
        desc: "Clique na aba 'Almoxarifado' no menu lateral à esquerda.",
        tab: "tabEstoque",
        target: ".nav-item[data-tab='tabEstoque']"
      },
      {
        title: "Abrir Importador em Massa",
        desc: "Clique no botão verde 'Importar Planilha (Excel/CSV)' na barra de ferramentas.",
        tab: "tabEstoque",
        target: "button[onclick='openImportModal()']"
      },
      {
        title: "Baixar Modelo ou Selecionar Arquivo",
        desc: "Clique em 'Baixar Planilha Modelo' ou selecione o arquivo 'estoque_3000_modelos_90k_unidades.csv' gerado na pasta.",
        target: ".dropzone-box"
      },
      {
        title: "Testar Busca e Paginação",
        desc: "Digite 'FIX-PAR' no campo de busca e navegue entre as páginas de 50 em 50 itens.",
        tab: "tabEstoque",
        target: "#searchInventory"
      }
    ]
  },
  "2": {
    title: "Roteiro 2: Entrada ISO 9001 (Corrida)",
    steps: [
      {
        title: "Abrir Movimentação",
        desc: "Clique no botão amarelo 'Movimentação' no topo da tela.",
        target: ".top-header .btn-warning"
      },
      {
        title: "Selecionar Material e Quantidade",
        desc: "Escolha 'Entrada (+ Compra / Devolução)', selecione a 'Chapa Aço SAE 1020 1/4\"' e digite 10 unidades.",
        target: "#movItemId"
      },
      {
        title: "Informar NF-e e Salvar",
        desc: "No campo Motivo, digite 'NF-e 98450' e clique em 'Confirmar Lançamento'.",
        target: "#movMotivo"
      },
      {
        title: "Ver Etiqueta com Corrida da Usina",
        desc: "Acesse a aba 'Etiquetas & QR' e confira a etiqueta impressa com o número da corrida Gerdau.",
        tab: "tabEtiquetas",
        target: ".nav-item[data-tab='tabEtiquetas']"
      }
    ]
  },
  "3": {
    title: "Roteiro 3: Baixa de Materiais OP (BOM)",
    steps: [
      {
        title: "Acessar Ordens de Produção",
        desc: "Clique na aba 'Ordens Produção' no menu lateral à esquerda.",
        tab: "tabOP",
        target: ".nav-item[data-tab='tabOP']"
      },
      {
        title: "Conferir Lista de Materiais (BOM)",
        desc: "Localize a OP-2026-042 (Tanque Metálico 10m³) e confira os materiais requeridos.",
        tab: "tabOP",
        target: ".op-card"
      },
      {
        title: "Baixar Materiais do Estoque",
        desc: "Clique no botão amarelo 'Baixar Materiais do Estoque' para debitar todos os itens da OP com 1 clique!",
        tab: "tabOP",
        target: "button[onclick*='baixarMateriaisOP']"
      },
      {
        title: "Concluir OP & Gerar Produto Acabado",
        desc: "Clique no botão verde 'Concluir OP & Entrar Produto' para dar entrada no Tanque finalizado.",
        tab: "tabOP",
        target: "button[onclick*='concluirOP']"
      }
    ]
  },
  "4": {
    title: "Roteiro 4: Aproveitamento de Sobras e Retalhos",
    steps: [
      {
        title: "Acessar Pátio de Sobras",
        desc: "Clique na aba 'Pátio de Sobras' no menu lateral.",
        tab: "tabRetalhos",
        target: ".nav-item[data-tab='tabRetalhos']"
      },
      {
        title: "Cadastrar Nova Sobra de Chapa",
        desc: "Clique no botão '+ Cadastrar Sobra / Retalho' e simule uma sobra de corte a plasma.",
        tab: "tabRetalhos",
        target: "button[onclick='openRetalhoModal()']"
      },
      {
        title: "Utilizar Retalho em Nova OP",
        desc: "Na lista de retalhos, clique em 'Utilizar em OP' para reaproveitar a sobra e não cortar chapa nova!",
        tab: "tabRetalhos",
        target: "button[onclick*='useRetalho']"
      }
    ]
  },
  "5": {
    title: "Roteiro 5: Calculadora Metalmecânica de Pesos",
    steps: [
      {
        title: "Abrir Calculadora",
        desc: "Clique na aba 'Calculadora Pesos' no menu lateral.",
        tab: "tabCalculadora",
        target: ".nav-item[data-tab='tabCalculadora']"
      },
      {
        title: "Trocar de Liga Metálica",
        desc: "Selecione 'Aço Inoxidável 304' (7.93 g/cm³) ou 'Alumínio' (2.70 g/cm³) no campo de densidade.",
        tab: "tabCalculadora",
        target: "#calcDensidade"
      },
      {
        title: "Calcular Tubo Redondo",
        desc: "Clique no seletor 'Tubo Redondo', digite Ø 50.8mm e veja o peso em kg calculado na hora!",
        tab: "tabCalculadora",
        target: ".calc-tab-btn[data-mode='tubo']"
      }
    ]
  },
  "6": {
    title: "Roteiro 6: Inventário (Grade & Bipagem)",
    steps: [
      {
        title: "Acessar Almoxarifado",
        desc: "Clique na aba 'Almoxarifado' no menu lateral.",
        tab: "tabEstoque",
        target: ".nav-item[data-tab='tabEstoque']"
      },
      {
        title: "Ativar Modo Edição Rápida",
        desc: "Clique no botão amarelo 'Modo Edição Rápida' e altere saldos e preços direto nas células da tabela!",
        tab: "tabEstoque",
        target: "#btnToggleInlineEdit"
      },
      {
        title: "Testar Contagem por Bipagem",
        desc: "Abra a 'Contagem Rápida', digite o código de um item (ex: FIX-PAR-M1250) e aperte Enter para ajustar o saldo.",
        tab: "tabEstoque",
        target: "button[onclick='openInventarioRapidoModal()']"
      }
    ]
  },
  "7": {
    title: "Roteiro 7: Ponto de Encomenda & Cotação",
    steps: [
      {
        title: "Acessar Necessidade Compras",
        desc: "Clique na aba 'Necessidade Compras' no menu lateral.",
        tab: "tabCompras",
        target: ".nav-item[data-tab='tabCompras']"
      },
      {
        title: "Conferir Total de Investimento",
        desc: "Veja o valor total estimado em R$ para recompor os itens no estoque mínimo.",
        tab: "tabCompras",
        target: "#comprasTotalSugerido"
      },
      {
        title: "Exportar Cotação para Fornecedores",
        desc: "Clique no botão verde 'Exportar Pedido de Cotação (CSV)' para abrir a planilha pronta para envio no Excel.",
        tab: "tabCompras",
        target: "button[onclick='exportarRelatorioCompras()']"
      }
    ]
  }
};

let currentScenarioId = "1";
let currentStepIndex = 0;
let highlightedElement = null;

function toggleTestMode() {
  const drawer = document.getElementById("guidedTestDrawer");
  if (!drawer) return;
  if (drawer.style.display === "none") {
    drawer.style.display = "flex";
    drawer.classList.remove("minimized");
    loadGuidedScenario("1");
    showToast("Modo Teste Guiado ativado! Siga o passo a passo.", "info");
  } else {
    closeTestMode();
  }
}

function closeTestMode() {
  const drawer = document.getElementById("guidedTestDrawer");
  if (drawer) drawer.style.display = "none";
  clearElementHighlight();
}

function toggleTestDrawerMinimize() {
  const drawer = document.getElementById("guidedTestDrawer");
  if (drawer) drawer.classList.toggle("minimized");
}

function loadGuidedScenario(id) {
  currentScenarioId = id;
  currentStepIndex = 0;
  clearElementHighlight();

  const sel = document.getElementById("guidedTestScenarioSelect");
  if (sel) sel.value = id;

  document.getElementById("testCompletionSection").style.display = "none";
  document.getElementById("testCurrentStepCard").style.display = "block";

  renderGuidedScenarioUI();
}

function renderGuidedScenarioUI() {
  const sc = GUIDED_SCENARIOS[currentScenarioId];
  if (!sc) return;

  const totalSteps = sc.steps.length;
  const isComplete = currentStepIndex >= totalSteps;

  // Atualizar Barra de Progresso
  const perc = Math.round((currentStepIndex / totalSteps) * 100);
  document.getElementById("testProgressText").textContent = `${currentStepIndex} / ${totalSteps} (${perc}%)`;
  document.getElementById("testProgressBarFill").style.width = `${perc}%`;

  if (isComplete) {
    document.getElementById("testCurrentStepCard").style.display = "none";
    document.getElementById("testCompletionSection").style.display = "block";
    clearElementHighlight();
  } else {
    document.getElementById("testCurrentStepCard").style.display = "block";
    document.getElementById("testCompletionSection").style.display = "none";

    const step = sc.steps[currentStepIndex];
    document.getElementById("testStepNumber").textContent = `Etapa ${currentStepIndex + 1} de ${totalSteps}`;
    document.getElementById("testStepTitle").textContent = step.title;
    document.getElementById("testStepDesc").textContent = step.desc;

    // Se a etapa exige mudar de aba, troca automaticamente para ajudar o usuário!
    if (step.tab) {
      switchTab(step.tab);
    }
  }

  // Renderizar Checklist
  const ul = document.getElementById("testStepsChecklist");
  ul.innerHTML = sc.steps.map((st, idx) => {
    let icon = "circle";
    let cls = "";
    if (idx < currentStepIndex) {
      icon = "check-circle-2";
      cls = "done";
    } else if (idx === currentStepIndex) {
      icon = "arrow-right-circle";
      cls = "active";
    }
    return `<li class="${cls}"><i data-lucide="${icon}" style="width: 13px; height: 13px;"></i> ${idx + 1}. ${st.title}</li>`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function highlightCurrentStepElement() {
  clearElementHighlight();
  const sc = GUIDED_SCENARIOS[currentScenarioId];
  if (!sc || currentStepIndex >= sc.steps.length) return;

  const step = sc.steps[currentStepIndex];
  if (step.tab) switchTab(step.tab);

  setTimeout(() => {
    const el = document.querySelector(step.target);
    if (el) {
      highlightedElement = el;
      el.classList.add("element-highlight");
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      // Remover highlight automaticamente após 5 segundos
      setTimeout(() => clearElementHighlight(), 5000);
    } else {
      showToast(`Elemento alvo (${step.target}) está pronto na tela.`, "info");
    }
  }, 150);
}

function clearElementHighlight() {
  if (highlightedElement) {
    highlightedElement.classList.remove("element-highlight");
    highlightedElement = null;
  }
  document.querySelectorAll(".element-highlight").forEach(el => el.classList.remove("element-highlight"));
}

function completeCurrentTestStep() {
  // Se o usuário digitou uma observação nesta etapa antes de concluir, salva automaticamente!
  const stepInput = document.getElementById("stepBugInput");
  if (stepInput && stepInput.value.trim().length > 0) {
    saveCurrentStepBugNote();
  }

  clearElementHighlight();
  const sc = GUIDED_SCENARIOS[currentScenarioId];
  if (!sc) return;

  currentStepIndex++;
  renderGuidedScenarioUI();

  if (currentStepIndex < sc.steps.length) {
    showToast(`Etapa concluída! Próxima: ${sc.steps[currentStepIndex].title}`, "success");
  } else {
    showToast(`Parabéns! Roteiro ${currentScenarioId} finalizado com sucesso!`, "success");
  }
}

function saveCurrentStepBugNote() {
  const input = document.getElementById("stepBugInput");
  if (!input) return;
  const text = input.value.trim();
  if (!text) {
    alert("Digite o que o testador observou nesta etapa.");
    return;
  }

  const sc = GUIDED_SCENARIOS[currentScenarioId];
  const step = sc && currentStepIndex < sc.steps.length ? sc.steps[currentStepIndex] : null;
  const type = document.getElementById("stepBugType")?.value || "doubt";
  const currentTab = document.querySelector(".nav-item.active")?.getAttribute("data-tab") || "tabDashboard";

  const roteiroNome = sc ? sc.title : `Roteiro ${currentScenarioId}`;
  const etapaNome = step ? `Etapa ${currentStepIndex + 1}: ${step.title}` : `Etapa ${currentStepIndex + 1}`;

  const newNote = {
    id: "bug-" + Date.now(),
    data: new Date().toISOString(),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    tipo: type,
    gravidade: type === "bug" ? "alta" : "media",
    tela: currentTab.replace("tab", ""),
    roteiro: roteiroNome,
    etapa: etapaNome,
    texto: text
  };

  const list = getBugNotes();
  list.unshift(newNote);
  saveBugNotesArray(list);

  input.value = "";
  showToast(`Nota vinculada com sucesso à ${etapaNome}!`, "success");
}

function nextScenarioOrFinish() {
  const currentNum = parseInt(currentScenarioId);
  const nota = document.getElementById("testRatingSelect").value;
  const obs = document.getElementById("testNotesInput").value;

  // Salvar resultado do teste no histórico local
  const results = JSON.parse(localStorage.getItem("metalestoque_test_history") || "[]");
  results.push({
    roteiro: currentScenarioId,
    titulo: GUIDED_SCENARIOS[currentScenarioId]?.title,
    data: new Date().toISOString(),
    nota: nota,
    observacoes: obs
  });
  localStorage.setItem("metalestoque_test_history", JSON.stringify(results));

  document.getElementById("testNotesInput").value = "";

  if (currentNum < 7) {
    loadGuidedScenario(String(currentNum + 1));
    showToast(`Iniciando Roteiro ${currentNum + 1}...`, "info");
  } else {
    showToast("🎉 Todos os 7 roteiros de teste foram concluídos com sucesso!", "success");
    closeTestMode();
  }
}

// ==========================================
// DIÁRIO DE BUGS E OBSERVAÇÕES DE TESTE (FEEDBACK EM TEMPO REAL)
// ==========================================
function getBugNotes() {
  try {
    return JSON.parse(localStorage.getItem("metalestoque_bug_diary") || "[]");
  } catch (e) {
    return [];
  }
}

function saveBugNotesArray(arr) {
  localStorage.setItem("metalestoque_bug_diary", JSON.stringify(arr));
  renderTestBugList();
}

function saveQuickBugNote() {
  const textInput = document.getElementById("quickBugText");
  const text = textInput.value.trim();
  if (!text) {
    alert("Digite uma breve descrição do bug ou observação.");
    return;
  }

  const type = document.getElementById("quickBugType").value;
  const severity = document.getElementById("quickBugSeverity").value;
  const currentTab = document.querySelector(".nav-item.active")?.getAttribute("data-tab") || "tabDashboard";
  const scenarioTitle = GUIDED_SCENARIOS[currentScenarioId]?.title || "Geral";
  const sc = GUIDED_SCENARIOS[currentScenarioId];
  const step = sc && currentStepIndex < sc.steps.length ? sc.steps[currentStepIndex] : null;
  const etapaNome = step ? `Etapa ${currentStepIndex + 1}: ${step.title}` : "";

  const newNote = {
    id: "bug-" + Date.now(),
    data: new Date().toISOString(),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    tipo: type, // 'bug', 'idea', 'doubt', 'praise'
    gravidade: severity,
    tela: currentTab.replace("tab", ""),
    roteiro: scenarioTitle,
    etapa: etapaNome,
    texto: text
  };

  const list = getBugNotes();
  list.unshift(newNote);
  saveBugNotesArray(list);

  textInput.value = "";
  showToast("Observação gravada com sucesso no diário!", "success");
}

function toggleTestBugList() {
  const container = document.getElementById("testBugListContainer");
  if (!container) return;
  const isHidden = container.style.display === "none";
  container.style.display = isHidden ? "block" : "none";
  if (isHidden) renderTestBugList();
}

function renderTestBugList() {
  const list = getBugNotes();
  const countSpan = document.getElementById("testBugCount");
  if (countSpan) countSpan.textContent = list.length;

  const itemsContainer = document.getElementById("testBugListItems");
  if (!itemsContainer) return;

  if (list.length === 0) {
    itemsContainer.innerHTML = `<div style="color: var(--text-muted); padding: 8px; text-align: center;">Nenhuma observação anotada ainda.</div>`;
    return;
  }

  itemsContainer.innerHTML = list.map(item => {
    let badgeClass = "badge-bug";
    let icon = "alert-circle";
    let typeName = "Bug / Erro";

    if (item.tipo === "idea") { badgeClass = "badge-idea"; icon = "lightbulb"; typeName = "Melhoria"; }
    if (item.tipo === "doubt") { badgeClass = "badge-doubt"; icon = "help-circle"; typeName = "Dúvida"; }
    if (item.tipo === "praise") { badgeClass = "badge-praise"; icon = "thumbs-up"; typeName = "Elogio"; }

    return `
      <div class="feedback-log-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span class="badge ${badgeClass}"><i data-lucide="${icon}" style="width: 10px; height: 10px;"></i> ${typeName} (${item.gravidade.toUpperCase()})</span>
          <span style="color: var(--text-muted); font-size: 10px;">${escapeHtml(item.hora)} • ${escapeHtml(item.tela)}</span>
        </div>
        <div style="color: var(--text-primary); font-size: 11.5px; line-height: 1.3;">
          ${escapeHtml(item.texto)}
        </div>
        <div style="text-align: right; margin-top: 4px;">
          <a href="javascript:void(0)" onclick="deleteBugNote('${safeIdentifier(item.id)}')" style="color: var(--accent-rose); font-size: 10px; text-decoration: none;">Excluir</a>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function deleteBugNote(id) {
  const list = getBugNotes().filter(item => item.id !== id);
  saveBugNotesArray(list);
  showToast("Nota excluída.", "info");
}

function limparBugsSessao() {
  if (!confirm("Deseja apagar todas as observações e bugs gravados nesta sessão?")) return;
  saveBugNotesArray([]);
  showToast("Diário de testes limpo.", "info");
}

function exportarRelatorioBugs() {
  const list = getBugNotes();
  if (list.length === 0) {
    alert("Não há observações ou bugs anotados para exportar.");
    return;
  }

  let txt = `=================================================================\n`;
  txt += `RELATÓRIO DE BUGS E OBSERVAÇÕES DE USABILIDADE - METALESTOQUE PRO\n`;
  txt += `Data da Exportação: ${new Date().toLocaleString('pt-BR')}\n`;
  txt += `Total de Ocorrências: ${list.length}\n`;
  txt += `=================================================================\n\n`;

  list.forEach((n, idx) => {
    txt += `[#${idx + 1}] TIPO: ${n.tipo.toUpperCase()} | IMPACTO: ${n.gravidade.toUpperCase()} | HORÁRIO: ${n.hora}\n`;
    txt += `TELA/MÓDULO: ${n.tela} | ROTEIRO ATIVO: ${n.roteiro || 'N/A'}\n`;
    txt += `OBSERVAÇÃO: ${n.texto}\n`;
    txt += `-----------------------------------------------------------------\n`;
  });

  downloadFile(txt, `Relatorio_Bugs_e_Observacoes_${new Date().toISOString().slice(0, 10)}.txt`, "text/plain;charset=utf-8;");
  showToast("Relatório de bugs exportado em arquivo de texto!", "success");
}

// Modal Rápido de Bug (Acionado pelo cabeçalho ou atalho Ctrl+B)
function openBugNoteModal() {
  const currentTab = document.querySelector(".nav-item.active")?.getAttribute("data-tab") || "tabDashboard";
  const map = {
    tabDashboard: "Painel Geral / Dashboard",
    tabEstoque: "Almoxarifado / Catálogo",
    tabRetalhos: "Pátio de Sobras & Retalhos",
    tabOP: "Ordens de Produção (OP)",
    tabMovimentacoes: "Movimentações & Auditoria",
    tabCompras: "Necessidade de Compras",
    tabCalculadora: "Calculadora Metalmecânica",
    tabEtiquetas: "Etiquetas & QR Code",
    tabConfig: "Configurações"
  };

  document.getElementById("modalBugModule").value = map[currentTab] || currentTab;
  document.getElementById("modalBugText").value = "";
  document.getElementById("modalBugNote").classList.add("active");
  setTimeout(() => document.getElementById("modalBugText").focus(), 150);
  if (window.lucide) lucide.createIcons();
}

function closeBugNoteModal() {
  document.getElementById("modalBugNote").classList.remove("active");
}

function saveModalBugNote(e) {
  e.preventDefault();
  const text = document.getElementById("modalBugText").value.trim();
  if (!text) return;

  const type = document.getElementById("modalBugType").value;
  const severity = document.getElementById("modalBugSeverity").value;
  const moduleName = document.getElementById("modalBugModule").value;

  const newNote = {
    id: "bug-" + Date.now(),
    data: new Date().toISOString(),
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    tipo: type,
    gravidade: severity,
    tela: moduleName,
    roteiro: GUIDED_SCENARIOS[currentScenarioId]?.title || "Geral",
    texto: text
  };

  const list = getBugNotes();
  list.unshift(newNote);
  saveBugNotesArray(list);

  closeBugNoteModal();
  showToast("Bug / Observação registrada com sucesso!", "success");
}

// ==========================================
// TEMA DARK / LIGHT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar contagem de bugs gravados
  renderTestBugList();

  // Atalho global Ctrl+B para registrar Bug/Observação de qualquer tela
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) {
      e.preventDefault();
      openBugNoteModal();
    }
  });
  // Aplicar tema salvo
  if (localStorage.getItem("metalestoque_theme") === "light") {
    document.body.classList.add("light-theme");
    const icon = document.getElementById("themeToggleIcon");
    if (icon) icon.setAttribute("data-lucide", "moon");
  }

  // Preencher dados da empresa na tela
  const cfg = db.data.config;
  if (document.getElementById("cfgRazao")) {
    document.getElementById("cfgRazao").value = cfg.razaoSocial || "";
    document.getElementById("cfgFantasia").value = cfg.nomeFantasia || "";
    document.getElementById("cfgCnpj").value = cfg.cnpj || "";
    document.getElementById("cfgResponsavel").value = cfg.responsavel || "";
  }
  if (document.getElementById("sidebarCompanyName")) {
    document.getElementById("sidebarCompanyName").textContent = cfg.nomeFantasia;
    document.getElementById("sidebarCompanyResponsavel").textContent = cfg.responsavel;
  }

  // Eventos de formulários
  document.getElementById("formItem")?.addEventListener("submit", saveItemForm);
  document.getElementById("formMovement")?.addEventListener("submit", saveMovementForm);
  document.getElementById("formOP")?.addEventListener("submit", saveOPForm);
  document.getElementById("formRetalho")?.addEventListener("submit", saveRetalhoForm);
  document.getElementById("formConfig")?.addEventListener("submit", saveConfigForm);

  // Busca rápida no cabeçalho
  const globalSearch = document.getElementById("globalSearch");
  if (globalSearch) {
    globalSearch.addEventListener("input", (e) => {
      const term = e.target.value;
      const searchInv = document.getElementById("searchInventory");
      if (searchInv) searchInv.value = term;
      switchTab("tabEstoque");
    });
  }

  // Atalho global Ctrl+K para busca
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      document.getElementById("globalSearch")?.focus();
    }
  });

  // Toggle do menu mobile
  document.getElementById("menuToggleBtn")?.addEventListener("click", () => {
    document.querySelector(".sidebar")?.classList.toggle("open");
  });

  // Inicializar primeira aba (Dashboard)
  switchTab("tabDashboard");

  // Iniciar ícones do Lucide
  if (window.lucide) {
    lucide.createIcons();
  }
});
