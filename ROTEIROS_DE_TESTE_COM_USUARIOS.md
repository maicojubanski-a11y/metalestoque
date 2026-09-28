# 📋 Playbook de Testes de Usabilidade com Usuários Humanos (UX / Validação Industrial)
### Sistema: MetalEstoque PRO
**Objetivo:** Validar fluxos reais do chão de fábrica, identificar pontos de atrito (fricção), medir facilidade de uso e colher melhorias para transformar o software em um produto comercial de alto valor.

---

## 👥 Personas Testadas no Chão de Fábrica

| Persona | Perfil Típico | Foco do Teste |
| :--- | :--- | :--- |
| **1. Almoxarife** | Operacional, acostumado com papel ou planilhas confusas | Rapidez de entrada/saída, bipagem, busca de itens, impressão de etiquetas |
| **2. Encarregado de Produção / Caldeireiro** | Técnico, dinâmico, focado no cumprimento de prazos da fábrica | Busca de sobras no pátio, requisição de materiais por Ordem de Produção (OP) |
| **3. Comprador / PCP** | Analítico, negocia com usinas e distribuidores | Alertas de estoque mínimo, cálculo de peso teórico em kg, cotação CSV |
| **4. Dono / Gerente Industrial** | Executivo, focado em custos e controle patrimonial | Valor financeiro do estoque, auditoria de movimentações, backup seguro |

---

## 🧪 Metodologia de Aplicação dos Testes

1. **Abordagem "Think Aloud" (Pensar em Voz Alta):** Peça ao usuário para falar o que está pensando enquanto clica: *"O que você espera que aconteça aqui?"*, *"Você achou esse botão fácil de achar?"*.
2. **Sem Interrupções:** O observador não deve ensinar nem clicar pelo usuário. Se o usuário ficar travado por mais de 1 minuto, anote onde ele travou e dê apenas uma dica mínima.
3. **Anotações de Atrito:**
   - Onde o usuário clicou no lugar errado?
   - Que termos técnicos foram confusos?
   - Quantos segundos levou cada tarefa?
   - Ele sentiu confiança de que os dados foram salvos?

---

# 🚀 ROTEIROS DE TESTE PRÁTICOS

---

### 📝 Roteiro 1: Carga Inicial de Catálogo em Massa (3.000 Itens)
* **Persona:** Comprador / Responsável pela Implantação
* **Cenário:** A metalúrgica comprou o sistema e precisa migrar todo o catálogo antigo de 3.000 modelos do Excel para o novo software.
* **Passo a Passo para o Usuário:**
  1. Vá até a aba **Almoxarifado**.
  2. Clique no botão **"Importar Planilha (Excel/CSV)"**.
  3. Baixe a planilha modelo para conferir as colunas.
  4. Selecione o arquivo de teste `estoque_3000_modelos_90k_unidades.csv`.
  5. Inicie a importação e observe o resultado.
  6. Use a paginação e a busca rápida para localizar um item específico (ex: `FIX-PAR-M12`).
* **Critérios de Sucesso:**
  - O usuário consegue importar os 3.000 modelos sem travar a máquina.
  - A mensagem de confirmação deixa claro quantos itens foram adicionados.
  - A navegação entre páginas (50 por página) é fluida.
* **Perguntas Pós-Teste:**
  - *"A importação foi rápida o suficiente?"*
  - *"As colunas da planilha modelo fizeram sentido com os dados que você já tem no seu Excel?"*

---

### 📝 Roteiro 2: Recebimento de Matéria-Prima com Rastreabilidade ISO 9001
* **Persona:** Almoxarife
* **Cenário:** Chegou um caminhão da Gerdau trazendo 10 chapas de Aço SAE 1020 1/4" com a NF-e 98450 e Certificado de Corrida `G-99201`.
* **Passo a Passo para o Usuário:**
  1. Localize a *Chapa SAE 1020 1/4"* no catálogo.
  2. Lance uma **Entrada** de 10 chapas.
  3. Preencha o motivo com o número da NF-e `98450` e confirme o recebimento.
  4. Imprima a etiqueta térmica do item com código de barras para colar no fardo de chapas.
* **Critérios de Sucesso:**
  - O saldo do item sobe de 14 para 24 chapas.
  - O histórico registra a entrada vinculada à NF-e.
  - A etiqueta gerada contém a corrida da usina legível.
* **Perguntas Pós-Teste:**
  - *"Foi intuitivo achar o botão de entrada?"*
  - *"A etiqueta tem todas as informações que seu cliente ou auditor da ISO costuma exigir?"*

---

### 📝 Roteiro 3: Baixa Automática de Materiais por Ordem de Produção (OP)
* **Persona:** Encarregado de Produção / Caldeiraria
* **Cenário:** A caldeiraria vai iniciar a fabricação do *Tanque Metálico 10m³* e precisa retirar todas as matérias-primas do estoque sem esquecer nada.
* **Passo a Passo para o Usuário:**
  1. Acesse a aba **Ordens Produção**.
  2. Localize a `OP-2026-042` (Projeto Tanque Metálico).
  3. Analise a lista de materiais necessários (BOM).
  4. Clique em **"Baixar Materiais do Estoque"**.
  5. Vá até a aba **Almoxarifado** e comprove se o saldo das chapas e tubos foi debitado.
  6. Retorne e clique em **"Concluir OP & Entrar Produto"** para dar entrada no Tanque finalizado.
* **Critérios de Sucesso:**
  - Todos os insumos da lista são baixados simultaneamente com 1 clique.
  - Se faltar estoque, o sistema deve avisar com clareza.
  - O produto acabado passa a constar no catálogo de produtos acabados.
* **Perguntas Pós-Teste:**
  - *"Esse fluxo de baixar a lista inteira de materiais da OP economizaria tempo na sua oficina?"*
  - *"O que mais você gostaria de registrar na OP (ex: soldador responsável, horas trabalhadas)?"*

---

### 📝 Roteiro 4: Aproveitamento Inteligente de Sobras / Retalhos (Anti-Desperdício)
* **Persona:** Soldador / Caldeireiro / Almoxarife
* **Cenário:** Cortou-se uma chapa de 1/4" na mesa de plasma e sobrou um pedaço nobre de 480x620mm. A empresa precisa guardar esse pedaço para não cortar chapa nova depois.
* **Passo a Passo para o Usuário:**
  1. Acesse a aba **Pátio de Sobras**.
  2. Cadastre a nova sobra: *Chapa SAE 1020 1/4"*, dimensões `480 x 620 mm`, peso estimado `14.8 kg`, na *Gaiola Vão A*.
  3. Simule um caldeireiro precisando desse pedaço para uma nova ordem de serviço: clique em **"Utilizar em OP"**.
  4. Informe o número da OP e confirme.
* **Critérios de Sucesso:**
  - A sobra fica disponível para consulta por toda a equipe.
  - Ao ser utilizada, ela muda o status para "UTILIZADO" e registra auditoria.
* **Perguntas Pós-Teste:**
  - *"Na sua empresa hoje, onde vão parar os retalhos de chapa e pontas de barra?"*
  - *"Esse pátio digital ajudaria a evitar cortar barras ou chapas novas sem necessidade?"*

---

### 📝 Roteiro 5: Conversão e Cálculo de Engenharia para Cotação de Compra
* **Persona:** Comprador / Orçamentista
* **Cenário:** O cliente pediu uma estrutura com 12 metros de tubo redondo Ø 2" e 2 chapas de aço inox 304 de 2mm. O fornecedor vende o tubo e a chapa por **QUILO (KG)**, mas o desenho técnico está em **milímetros**.
* **Passo a Passo para o Usuário:**
  1. Acesse a aba **Calculadora Pesos**.
  2. Selecione o material *Aço Inoxidável 304*.
  3. Calcule o peso de 2 chapas de `2.0mm x 1250mm x 2500mm`.
  4. Mude para a aba *Tubo Redondo* e calcule o peso de 12 metros de tubo Ø `50.8mm` com parede de `2.0mm`.
  5. Anote o peso total para enviar na cotação.
* **Critérios de Sucesso:**
  - O cálculo é instantâneo e segue as fórmulas da ABNT/ASTM.
  - O usuário não precisa abrir tabelas manuais ou calculadora de bolso.
* **Perguntas Pós-Teste:**
  - *"Com que frequência você precisa converter medidas em quilos para conferir notas ou orçar?"*
  - *"Faltou algum formato de perfil (ex: cantoneira, ferro chato, viga U) que você usa sempre?"*

---

### 📝 Roteiro 6: Inventário Físico Rotativo (Balanço Rápido)
* **Persona:** Almoxarife / Auditor
* **Cenário:** Sexta-feira à tarde, o almoxarife vai contar 5 caixas de parafusos e prateleiras de insertos no gaveteiro para bater com o físico.
* **Passo a Passo para o Usuário:**
  1. Acesse **Almoxarifado**.
  2. Teste o **"Modo Edição Rápida"**: altere o saldo de 3 itens direto na tabela e clique em **Salvar**.
  3. Agora abra o modal **"Contagem Rápida"**: digite o código de um item (ex: `FIX-PAR-M1250`), informe que contou 15 caixas e aperte **Enter**.
  4. Observe o item ser registrado no log da sessão e o campo limpar sozinho para a próxima contagem.
* **Critérios de Sucesso:**
  - O usuário faz o ajuste em menos de 10 segundos por item.
  - A auditoria grava quem alterou e qual era o saldo anterior.
* **Perguntas Pós-Teste:**
  - *"Qual dos dois métodos (Edição em Grade ou Bipagem Rápida) você achou mais prático para o seu dia a dia?"*
  - *"Você usaria isso com um leitor de código de barras sem fio andando pelo galpão?"*

---

### 📝 Roteiro 7: Identificação de Gargalos e Exportação de Pedido de Compras
* **Persona:** Comprador / Gerente Financeiro
* **Cenário:** Segunda-feira de manhã, o comprador precisa ver tudo o que está faltando na fábrica e emitir uma lista de cotação para 3 fornecedores.
* **Passo a Passo para o Usuário:**
  1. Acesse a aba **Necessidade Compras**.
  2. Verifique os itens listados em vermelho (abaixo do estoque de segurança).
  3. Confira o valor total do investimento estimado sugerido pelo sistema.
  4. Clique em **"Exportar Pedido de Cotação (CSV)"**.
  5. Abra a planilha gerada e confira os dados.
* **Critérios de Sucesso:**
  - O sistema calcula automaticamente: `Estoque Máximo - Estoque Atual = Quantidade a Comprar`.
  - A planilha gerada já vem com descrição técnica e fornecedor homologado.
* **Perguntas Pós-Teste:**
  - *"Essa lista pronta economizaria quanto tempo da sua semana de compras?"*

---

## 📊 Matriz de Avaliação do Teste (Para o Avaliador Preencher)

Para cada roteiro executado com um usuário real, atribua notas de 1 a 5:

| Critério de Avaliação | Nota (1 a 5) | Observações / Dificuldades Encontradas |
| :--- | :---: | :--- |
| **Facilidade de Aprendizado (Intuitividade)** | ⭐⭐⭐⭐⭐ | O usuário entendeu sem manual? |
| **Velocidade de Execução** | ⭐⭐⭐⭐⭐ | Fez a tarefa rápido ou ficou procurando botões? |
| **Confiança no Resultado** | ⭐⭐⭐⭐⭐ | Teve certeza de que os dados foram salvos? |
| **Clareza dos Termos Industriais** | ⭐⭐⭐⭐⭐ | Entendeu SKU, Corrida, BOM, Sobras, etc.? |
| **Disposição para Pagar / Adotar** | ⭐⭐⭐⭐⭐ | O usuário usaria na rotina dele amanhã? |

---

## 🏆 Perguntas Finais de Ouro (Feedback Qualitativo)

Faça estas 3 perguntas ao final de cada sessão:
1. *"Se você pudesse mudar ou adicionar UMA única coisa nesse sistema agora, o que seria?"*
2. *"Qual parte do sistema você achou mais impressionante ou mais útil para a sua oficina?"*
3. *"Comparado ao que você usa hoje (planilhas de Excel ou outro sistema), você prefere este?"*
