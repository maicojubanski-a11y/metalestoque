# Kit de Validação Comercial — MetalEstoque PRO

## Objetivo

Conseguir os primeiros **5 pilotos pagos** em caldeirarias, fabricantes sob encomenda e usinagens de uma planta, medindo resultado antes de ampliar o produto.

O piloto deve validar três coisas ao mesmo tempo:

1. A dor é urgente e tem comprador.
2. O produto resolve um fluxo de almoxarifado/produção sem treinamento excessivo.
3. O cliente paga implantação e assinatura pelo resultado percebido.

## Cliente ideal para a primeira rodada

- 10–80 colaboradores.
- Uma planta e um almoxarifado principal.
- 500–5.000 SKUs ou catálogo relevante de chapas, barras e consumíveis.
- Excel, papel ou ERP genérico como operação atual.
- Corte plasma/laser/oxicorte, caldeiraria ou fabricação sob encomenda.
- Dono/gerente industrial como comprador e almoxarife/PCP como champion.

### Não prometer nesta versão

- Sincronização entre celulares e computadores.
- ERP fiscal, emissão de NF-e ou integração pronta.
- Conformidade ISO garantida.
- QR Code/Code128 industrial real.
- Auditoria imutável ou permissões por usuário.

A primeira oferta deve ser instalada em uma estação/base controlada até a estratégia de backend e sincronização ser validada.

## Roteiro de entrevista — 30 minutos

### 1. Contexto (5 min)

- Como vocês controlam hoje entradas, saídas, inventário e materiais por OP?
- Quantas pessoas lançam ou consultam o estoque?
- Quantos SKUs e locais físicos existem aproximadamente?
- Qual foi a última parada, compra urgente ou perda causada por informação incorreta?

### 2. Dor e impacto (10 min)

- Quanto tempo leva para localizar uma chapa, barra ou consumível?
- Quantas horas por mês são gastas em inventário e atualização de planilhas?
- Como vocês encontram um retalho antes de cortar material novo?
- Quanto tempo leva para montar uma cotação de reposição?
- Quando um cliente ou auditor pede corrida/NF, quanto tempo leva para recuperar a evidência?
- Qual desses problemas tem impacto financeiro mais claro?

### 3. Processo de compra (5 min)

- Quem aprova uma solução desse tipo?
- Existe orçamento para implantação e mensalidade?
- Vocês preferem compra anual, mensalidade ou projeto com suporte?
- O que impediria um piloto nas próximas duas semanas?

### 4. Demonstração orientada à dor (7 min)

Mostrar somente estes fluxos, usando dados do prospect quando possível:

1. Importar uma planilha e localizar um material.
2. Registrar recebimento com NF/corrida e localização.
3. Encontrar/reaproveitar um retalho em uma OP.
4. Baixar uma BOM e gerar a necessidade de compras.
5. Fazer um inventário curto por SKU.

Não fazer tour de todas as funcionalidades. Medir tempo, dúvidas e confiança do usuário.

### 5. Fechamento (3 min)

- Qual fluxo você usaria amanhã?
- O que faltaria para colocar em uma célula real?
- Se entregarmos o escopo combinado em 30 dias, você pagaria um piloto de R$ 3.900?
- Quem precisa participar da decisão?

## Baseline obrigatório antes do piloto

Preencher com o gerente e assinar/enviar por mensagem antes de começar. Use `pilot-scorecard.html` para registrar os campos, calcular benefício mensal/payback e exportar o resumo; os resultados continuam sendo evidência do piloto, não dados fictícios:

| Indicador | Baseline | Meta do piloto | Medição |
|---|---:|---:|---|
| Tempo para localizar um item |  | reduzir | cronômetro, mediana/p95 |
| Tempo para registrar baixa |  | até 5 s em consumível | observação de 10 operações |
| Inventário por item |  | até 10 s | contagem de 30 itens |
| Acuracidade física |  | ≥95% na célula | conferência amostral |
| Movimentos registrados |  | ≥90% | comparação com documentos |
| Tempo para achar corrida/NF |  | ≤2 min | três casos reais |
| Horas de compras/semana |  | reduzir | relato + amostra de pedidos |
| Retalho reaproveitado |  | medir kg/R$ | registro durante o piloto |
| Rupturas/compra emergencial |  | reduzir | histórico de 30 dias |

## Escopo do piloto pago — 30 dias

### Inclui

- Diagnóstico inicial de 90 minutos.
- Configuração da empresa e da célula escolhida.
- Importação de até 3.000 SKUs em CSV.
- Treinamento de 2–3 papéis: gestor, almoxarife e PCP.
- Execução acompanhada dos sete roteiros de teste.
- Uma reunião curta por semana.
- Relatório final com antes/depois, pendências e recomendação.
- Crédito integral do piloto na contratação anual em até 15 dias após o encerramento.

### Não inclui

- Hardware, impressora, leitor ou visita não planejada.
- Integração fiscal/ERP.
- Desenvolvimento sob medida durante o piloto.
- Operação multiestação sincronizada antes de existir backend.
- Garantia de que o sistema substitui o ERP do cliente.

## Critérios de sucesso e decisão

O piloto avança para contrato quando:

- Pelo menos 80% das tarefas são concluídas sem ajuda após treinamento.
- ≥90% dos movimentos da célula ficam registrados.
- Acuracidade física chega a ≥95% na amostra combinada.
- O cliente mede pelo menos um ganho financeiro ou operacional verificável.
- Champion e comprador declaram que usariam o fluxo na rotina.
- Existe decisão de contratação e data de início.

Se um critério falhar, classificar a causa:

- Produto: corrigir fluxo ou regra.
- Implantação: melhorar dados, treinamento ou processo.
- Posicionamento: dor não era prioritária.
- Arquitetura: sincronização, segurança ou auditoria bloqueia a compra.
- Preço: testar escopo/ROI, não conceder desconto automático.

## Oferta inicial para testar

### Piloto

**R$ 3.900 à vista por 30 dias**, integralmente abatível na contratação anual.

### Base Almoxarifado

**R$ 6.000 de implantação + R$ 1.490/mês**.

Catálogo, localização, entradas/saídas, mínimos, inventário, importação/exportação, etiquetas e backup.

### Pro Caldeiraria/OP

**R$ 12.000 de implantação + R$ 2.490/mês**.

Base + retalhos, BOM/OP, baixa de materiais, corrida, compras e acompanhamento de indicadores.

Os preços são hipóteses de validação. Registrar objeções e disposição de pagar antes de alterá-los.

## Mensagem de prospecção inicial

> Olá, [nome]. Estou validando uma ferramenta feita para caldeirarias e usinagens que precisam localizar chapas/barras, controlar retalhos e baixar materiais por OP sem depender de várias planilhas. Não estou oferecendo um ERP completo: quero medir em uma célula real se reduzimos tempo de inventário, compra emergencial e perda de retalho. Posso mostrar em 15 minutos usando um exemplo próximo da rotina de vocês?

## Registro mínimo de cada conta

Use `pipeline-pilotos.html` para controlar estágio, próxima ação, valor potencial e exportação CSV. Use `proposta-piloto.html` para gerar uma proposta revisável com escopo, preço, validade e limites. Esses ativos são ferramentas de operação comercial local; não substituem um CRM compartilhado nem assinatura jurídica.

| Campo | Valor |
|---|---|
| Empresa / cidade |  |
| Segmento e colaboradores |  |
| Contato comprador |  |
| Champion operacional |  |
| Sistema atual |  |
| SKUs / locais |  |
| Dor principal |  |
| Valor potencial mensurado |  |
| Data da demonstração |  |
| Piloto oferecido |  |
| Objeção |  |
| Próxima ação e data |  |
| Resultado |  |

## Regra de aprendizado

Não contar demonstrações, downloads ou elogios como validação. Só contar como evidência comercial:

- entrevista com dor concreta;
- baseline compartilhado;
- piloto pago;
- uso observado;
- resultado medido;
- contrato recorrente.
