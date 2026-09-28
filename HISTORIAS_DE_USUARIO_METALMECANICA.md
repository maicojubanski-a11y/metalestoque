# 🏭 Histórias de Usuário (User Stories) - MetalEstoque PRO
### Especificação Funcional Baseada na Rotina Real de uma Indústria Metalmecânica

---

## 👥 Personas Mapeadas

1. **Almoxarife (Seu Valdir):** Precisa de agilidade extrema no balcão de atendimento, busca rápida e facilidade para bipar e etiquetar materiais pesados.
2. **Encarregado de Caldeiraria / Corte (Marcão):** Focado em cumprir o cronograma das OPs, precisa saber onde estão as matérias-primas e encontrar retalhos de chapa para não perder tempo.
3. **Comprador / PCP (Juliana):** Monitora pontos de reposição, calcula pesos de aço em kg para emitir pedidos e cota com distribuidores.
4. **Gerente Industrial / Dono (Eng. Roberto):** Acompanha valor total imobilizado, perdas de material, segurança de dados e relatórios de auditoria.

---

## 📦 ÉPICO 1: Atendimento Ágil de Balcão e Consumo de Oficina

### US-01: Baixa Rápida de Consumíveis no Balcão
* **Como** Almoxarife com fila de operadores no balcão às 07h da manhã,
* **Eu quero** lançar saídas de consumíveis (discos, luvas, eletrodos) em menos de 5 segundos,
* **Para que** os caldeireiros e soldadores retornem imediatamente à produção sem perda de produtividade.
* **Critérios de Aceite:**
  - Atalho de teclado rápido ou botão de acesso imediato.
  - Seleção ágil de material com busca preditiva por nome ou código.
  - Baixa imediata sem recarregar a página inteira.

### US-02: Localização Física Instantânea no Galpão
* **Como** Almoxarife ou operador novato,
* **Eu quero** visualizar o endereço exato de armazenagem (ex: *Pátio Chapas Vão 2*, *Gaveteiro Torno 04*),
* **Para que** eu não perca minutos procurando uma ferramenta ou material em um galpão de 1.500 m².
* **Critérios de Aceite:**
  - Campo de localização visível na tabela principal e na etiqueta impressa.
  - Possibilidade de filtrar o catálogo por setor/prateleira.

---

## 🛡️ ÉPICO 2: Recebimento Técnico e Qualidade ISO 9001

### US-03: Entrada com Rastreabilidade de Usina e Número da Corrida
* **Como** Conferente de recebimento de matérias-primas,
* **Eu quero** vincular o número da NF-e, fornecedor e o número da corrida da usina (Gerdau, Usiminas, Aperam),
* **Para que** a empresa atenda às normas de conformidade mecânica exigidas por auditorias ISO 9001 e clientes exigentes.
* **Critérios de Aceite:**
  - Campo dedicado para Número de Corrida / Certificado de Qualidade.
  - Recálculo automático do Custo Médio Ponderado a cada nova entrada.
  - Registro de histórico com data, hora e responsável.

### US-04: Emissão de Etiquetas Industriais Térmicas e QR Code
* **Como** Operador de almoxarifado,
* **Eu quero** gerar etiquetas prontas para impressoras térmicas (Zebra/Elgin/Argox) ou folha A4,
* **Para que** possamos colar nos fardos de chapas, feixes de tubos e caixas de fixadores.
* **Critérios de Aceite:**
  - Etiqueta com Código SKU, Descrição, Dimensões, Norma, Corrida e Código de Barras legível.
  - Botão de impressão individual na linha do item ou impressão em lote.

---

## ✂️ ÉPICO 3: Gestão Inteligente de Sobras e Retalhos Nobres

### US-05: Pátio Digital de Sobras de Chapas e Barras
* **Como** Caldeireiro ou operador de corte plasma/laser,
* **Eu quero** registrar pedaços reaproveitáveis com dimensões milimétricas, peso e localização na gaiola de sobras,
* **Para que** a oficina consulte o pátio de sobras antes de cortar uma chapa ou barra virgem inteira nova.
* **Critérios de Aceite:**
  - Cadastro de retalhos com dimensões exatas (ex: 480 x 620 mm).
  - Cálculo do peso estimado em kg do pedaço.
  - Indicação clara de status (Disponível vs. Utilizado).

### US-06: Vinculação de Sobra à Ordem de Produção
* **Como** Encarregado de produção,
* **Eu quero** clicar em "Utilizar em OP" ao retirar uma sobra da gaiola,
* **Para que** o sistema mude o status para UTILIZADO e registre a economia gerada no projeto.
* **Critérios de Aceite:**
  - Registro da OP que reutilizou o retalho.
  - Histórico de auditoria do reaproveitamento.

---

## ⚙️ ÉPICO 4: Ordens de Produção e Kit de Montagem (BOM)

### US-07: Baixa Automática da Lista de Materiais da OP
* **Como** Encarregado de fabricação,
* **Eu quero** baixar todos os insumos e matérias-primas de uma Ordem de Produção com um único clique,
* **Para que** eu não precise dar saída manual em dezenas de itens individualmente correndo risco de esquecimento.
* **Critérios de Aceite:**
  - Validação de saldo antes de efetuar a baixa.
  - Se faltar estoque em algum item da lista, emitir alerta detalhado.
  - Atualização do status da OP para "EM PRODUÇÃO".

### US-08: Conclusão de OP com Entrada do Produto Acabado
* **Como** Gestor de produção,
* **Eu quero** concluir a OP e registrar automaticamente a entrada do produto fabricado no almoxarifado de expedição,
* **Para que** o setor de faturamento e logística saiba imediatamente que o equipamento está pronto para envio.
* **Critérios de Aceite:**
  - Entrada do produto acabado no catálogo.
  - Histórico vinculado ao cliente e número da OP.

---

## 🛒 ÉPICO 5: Suprimentos, Engenharia e Reposição

### US-09: Monitoramento de Ponto de Encomenda e Cotação CSV
* **Como** Comprador industrial,
* **Eu quero** visualizar instantaneamente todos os itens que atingiram o estoque de segurança,
* **Para que** eu gere uma planilha de cotação para enviar aos fornecedores antes que a fábrica pare por falta de insumos.
* **Critérios de Aceite:**
  - Cálculo automático: `Estoque Máximo - Estoque Atual = Quantidade Sugerida`.
  - Estimativa do capital necessário para reposição.
  - Exportação da lista em formato CSV compatível com Excel.

### US-10: Calculadora de Peso Teórico de Metais Integrada
* **Como** Orçamentista ou almoxarife,
* **Eu quero** calcular o peso teórico em kg a partir de dimensões em milímetros ou metros de chapas, tubos e tarugos,
* **Para que** eu possa conferir notas fiscais faturadas por quilo e orçar projetos com precisão de engenharia.
* **Critérios de Aceite:**
  - Fórmulas para chapas, tubos redondos, tubos industriais quadrados e tarugos maciços.
  - Seleção de densidades de ligas (Aço Carbono 7.85, Inox 7.93, Alumínio 2.70, Cobre 8.96).

---

## 📈 ÉPICO 6: Performance de Alta Carga e Balanço Físico

### US-11: Carga e Atualização em Massa de 3.000+ Modelos
* **Como** Responsável pela implantação do sistema,
* **Eu quero** importar milhares de itens de uma planilha do Excel em poucos segundos,
* **Para que** a transição do sistema legado ocorra sem esforço manual e sem travar o navegador.
* **Critérios de Aceite:**
  - Processamento de mais de 3.000 linhas em menos de 3 segundos.
  - Opção de mesclar saldos ou substituir catálogo.
  - Download prévio de planilha modelo devidamente formatada.

### US-12: Modo de Edição Rápida em Grade e Contagem por Bipagem
* **Como** Almoxarife realizando inventário rotativo semanal,
* **Eu quero** editar saldos diretamente nas células da tabela ou bipar códigos com leitor USB pressionando Enter,
* **Para que** o balanço de centenas de itens seja feito sem cliques excessivos e sem necessidade de hora extra.
* **Critérios de Aceite:**
  - Modo inline que transforma colunas de estoque e preço em inputs editáveis na tela.
  - Modal de bipagem contínua com histórico visual da sessão.
