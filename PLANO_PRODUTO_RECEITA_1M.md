# Plano de Produto e Receita — R$ 1 milhão em 24 meses

## Objetivo

Transformar o MetalEstoque PRO em um produto B2B vendável para pequenas e médias empresas metalmecânicas e atingir **R$ 1.000.000 de faturamento acumulado em 24 meses**.

Este documento separa o que já existe no protótipo, o que é hipótese comercial e o que precisa ser validado com clientes reais.

## O que já existe no produto

Observado no código e na documentação atual:

- Dashboard com KPIs, alertas e gráficos.
- Catálogo de materiais com rastreabilidade, localização, fornecedor e corrida.
- Entradas, saídas, ajustes e histórico de movimentações.
- Ordens de produção com BOM, baixa de materiais e entrada de produto acabado.
- Pátio de retalhos e sobras.
- Necessidade de compras e exportação CSV.
- Calculadora de peso teórico para aplicações metalmecânicas.
- Etiquetas e QR Code.
- Importação CSV, backup JSON, exportações e inventário rápido por código.
- Modo de teste guiado e roteiros de usabilidade.
- Servidor local PowerShell e bibliotecas locais para uso offline.

## Hipótese de cliente ideal (ICP inicial)

**Caldeirarias, serralherias industriais e usinagens com 10–100 colaboradores**, uma unidade fabril e estoque de matéria-prima com valor relevante, que hoje dependem de Excel, cadernos ou um ERP genérico que não trata bem dimensões, corrida, sobras e consumo por OP.

### Compradores e usuários

- **Comprador / PCP:** quer evitar parada por falta de material e reduzir tempo de cotação.
- **Almoxarife:** precisa localizar, receber, etiquetar e baixar material rapidamente.
- **Gerente / dono:** precisa enxergar capital imobilizado, perdas e confiabilidade do saldo.
- **Produção:** precisa requisitar materiais por OP e reaproveitar retalhos.

### Proposta de valor a validar

> “O MetalEstoque reduz perdas e compras emergenciais de matéria-prima, dando ao almoxarife uma operação rápida e ao gestor um saldo confiável por material, corrida, localização e ordem de produção.”

Não tratar essa frase como fato comprovado até realizar entrevistas e pilotos.

## Modelo de receita de referência

Oferta inicial híbrida: implantação/migração paga + assinatura recorrente.

| Oferta | Implantação | Mensalidade | Uso |
|---|---:|---:|---|
| Piloto validado | R$ 3.900, abatível na contratação anual | 30 dias | Uma célula, catálogo de até 3.000 SKUs e acompanhamento próximo |
| Base Almoxarifado | R$ 6.000 | R$ 1.490 | Catálogo, localização, movimentações, inventário, importação/exportação e backup |
| Pro Caldeiraria/OP | R$ 12.000 | R$ 2.490 | Base + retalhos, BOM/OP, corrida, compras e indicadores |

### Cenário matemático, não promessa

- 28 clientes Base com média de 12 meses faturados: **R$ 668.640**.
- 12 clientes Pro com média de 9 meses faturados: **R$ 412.920**.
- Total de referência: **R$ 1.081.560**, antes de impostos, descontos, churn e inadimplência.

A meta precisa ser acompanhada por coorte, churn, inadimplência, custo de aquisição e margem. O preço só deve ser fixado depois dos pilotos.

## Bloqueadores para vender com confiança

### P0 — confiabilidade e segurança

1. Substituir dependência de localStorage por uma fonte de dados compartilhada ou deixar explícito que a primeira oferta é monousuário/local.
2. Revisar o servidor local: proteção de caminho e headers básicos já adicionados; ainda falta decidir bind LAN, firewall, HTTPS e acesso autenticado.
3. Remover fallback para CDNs no modo offline. (Concluído neste ciclo.)
4. Aplicar escape ou renderização segura em todo innerHTML com dados importados. (Escape aplicado aos painéis principais neste ciclo; etiquetas, IDs e componentes restantes continuam como P0.)
5. Impedir duplicação de SKU na edição e manter trilha local para alterações cadastrais. (Concluído neste ciclo; RBAC/backend ainda pendentes.)
6. Tornar conclusão de OP idempotente e impedir BOM duplicada. (Concluído neste ciclo; cancelamento/reversão ainda pendente.)
7. Definir política de saída com estoque insuficiente; permitir exceção somente com rastreabilidade/permissão.
8. Validar importação antes de alterar o banco e registrar erros por linha. (Staging, schemaVersion, backup estrutural e linhas rejeitadas já tratados; parser multiline e ledger detalhado continuam pendentes.)
9. Criar testes automatizados para cálculos, movimentações, importação e OP. (Smoke suite com scorecard, pipeline, assets locais, auditoria/schema e servidor já executável; unit/integration/E2E de domínio ainda pendentes.)

### P1 — produto comercial

1. Usuários, perfis e identificação real do operador.
2. Backup/restauração com validação de versão e recuperação clara.
3. Onboarding guiado: empresa, usuários, unidades, catálogo e primeira movimentação.
4. Relatórios de valor economizado, compras evitadas e divergência de inventário.
5. Fluxo de suporte e registro de eventos de produto.
6. Landing page/demo que vende o problema, não apenas a lista de módulos.

### P2 — escala

1. API e banco centralizado multiempresa, se a validação exigir operação em vários dispositivos.
2. Sincronização offline/online com resolução de conflitos.
3. Integração com ERP, NF-e, leitores e impressoras conforme demanda paga.
4. Monitoramento, atualização segura e política de privacidade/backup.

## Roadmap de validação

### 0–30 dias — versão demonstrável e segura

- Fechar os itens P0 de maior risco.
- Testar os sete roteiros com dados limpos e registrar tempos/erros.
- Preparar demo de 15 minutos baseada em três dores: falta de material, perda de sobras e divergência de inventário.
- Entrevistar pelo menos 10 empresas do ICP e obter 3 demonstrações agendadas.

### 31–90 dias — pilotos pagos

- Rodar 3–5 pilotos com escopo e métrica definidos.
- Medir tempo de implantação, importação, usuários ativos, divergência de saldo e horas economizadas.
- Converter pelo menos 2 pilotos em contratos recorrentes ou revisar a proposta.
- Não construir integração que não esteja ligada a uma objeção ou pagamento real.

### 4–12 meses — repetibilidade

- Padronizar implantação, treinamento, suporte e cobrança.
- Alcançar 15 clientes pagantes e documentar os casos de uso.
- Escolher definitivamente o modelo local, servidor instalado ou SaaS centralizado com base no uso real.

### 13–24 meses — escala controlada

- Alcançar 60 clientes contratados no cenário de referência.
- Criar canal de parceiros (consultores industriais, contadores/ERP e fornecedores).
- Acompanhar receita recorrente, margem, churn e payback de aquisição mensalmente.

## Métricas de decisão

- Tempo até a primeira importação bem-sucedida.
- Tempo para registrar uma entrada/saída e encontrar um item.
- Percentual de usuários que completam os 3 fluxos principais sem ajuda.
- Divergência entre estoque físico e sistema.
- Piloto → contrato pago.
- Receita recorrente mensal, ticket médio e churn.
- Custo de implantação e horas de suporte por cliente.
- Valor percebido: compras emergenciais, perdas e horas administrativas evitadas.

## Próxima execução recomendada

1. Corrigir os quatro riscos técnicos mais graves: servidor, offline, XSS e idempotência de OP.
2. Criar uma suíte mínima de testes para regras de estoque.
3. Preparar um roteiro de entrevista e uma demo orientada a valor.
4. Só depois expandir módulos ou investir em integrações.
