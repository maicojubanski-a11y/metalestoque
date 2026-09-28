# Status de Execução — Meta R$ 1 milhão

## Objetivo

Transformar o MetalEstoque PRO em um produto B2B vendável e alcançar R$ 1 milhão de faturamento em 24 meses, começando por diagnóstico, oferta e pilotos.

## Evidências concluídas no workspace

### Produto

- SPA local-first com estoque, movimentações, OP/BOM, retalhos, compras, calculadora, etiquetas, backup e importação.
- Proteção básica de caminho no servidor local.
- Headers de segurança no servidor.
- Persistência com schemaVersion, migração de dados antigos e clones dos dados demo.
- Trilha local de auditoria para alterações cadastrais, custos, locais, níveis, exclusões e OPs planejadas.
- Escape HTML nos principais painéis e sanitização de identificadores usados em ações inline.
- Importação em staging com validação, duplicidade e preservação do estoque em caso de nenhuma linha válida.
- CSV com escape para Excel.
- Conclusão de OP idempotente e BOM duplicada bloqueada.

### Produto comercial

- Página de apresentação: vendas.html.
- Pipeline local: pipeline-pilotos.html.
- Scorecard de baseline, ROI e payback: pilot-scorecard.html.
- Gerador de proposta: proposta-piloto.html.
- Termo operacional revisável: TERMO_PILOTO_COMERCIAL.md.
- Guia de entrevistas e critérios de piloto: VALIDACAO_PILOTO_COMERCIAL.md.
- Cadência de prospecção de 14 dias: PLANO_ACAO_14_DIAS_PILOTOS.md.
- Roadmap e cenário financeiro: PLANO_PRODUTO_RECEITA_1M.md.

### Verificações automatizadas

O comando abaixo foi executado com sucesso:

    node estoque\qa-smoke.js

Resultado atual: **7 checks aprovados** — página comercial, scorecard ROI, pipeline, proposta, assets locais, auditoria/schema e servidor protegido.

Também foram aprovados:

- node --check estoque\app.js;
- análise de sintaxe do server.ps1;
- smoke tests da persistência do pipeline;
- smoke test do cálculo do scorecard.

## Hipóteses comerciais definidas

- ICP inicial: caldeirarias, usinagens, corte e fabricantes sob encomenda com 10–80 colaboradores e uma planta.
- Piloto: R$ 3.900 por 30 dias, abatível em contratação anual conforme proposta.
- Base: R$ 6.000 de implantação + R$ 1.490/mês.
- Pro: R$ 12.000 de implantação + R$ 2.490/mês.
- Cenário de referência: 28 clientes Base + 12 clientes Pro = aproximadamente R$ 1.081.560 brutos antes de impostos, churn, descontos e inadimplência.

Esses números são hipóteses de validação, não faturamento realizado.

## O que ainda não foi comprovado

Não há no workspace:

- entrevista preenchida com empresa real;
- demonstração realizada com prospect real;
- baseline de uma fábrica real;
- proposta aceita;
- piloto pago;
- contrato recorrente;
- receita recebida;
- evidência de sincronização multiusuário, login, RBAC ou backend central.

Também permanecem pendentes para uma versão SaaS/enterprise:

- backend e banco compartilhado;
- autenticação, tenants e RBAC;
- auditoria imutável;
- testes unitários/E2E de domínio;
- sanitização completa de todos os templates legados e etiquetas;
- QR Code/Code128 industrial real;
- revisão jurídica do termo e adequação LGPD.

## Próximo ciclo recomendado

1. Escolher uma cidade/região e cadastrar 50 empresas verificáveis no pipeline.
2. Executar 10 entrevistas usando o roteiro de 30 minutos.
3. Fazer 5 demonstrações com dados ou exemplos do prospect.
4. Enviar 3 propostas e termos revisados.
5. Registrar somente pagamentos/documentos reais como pilotos pagos.
6. Executar o primeiro piloto por 30 dias usando o scorecard.
7. Atualizar preço e roadmap com evidência observada.

## Critério de conclusão do objetivo

Só marcar o objetivo como concluído quando houver evidência documentada de:

- produto usado por clientes reais;
- pelo menos um ou mais pilotos pagos;
- contratos ou receita registrada;
- plano de expansão baseado em métricas reais;
- trajetória financeira verificável para R$ 1 milhão em 24 meses.

