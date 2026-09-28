# 🏭 MetalEstoque PRO - Sistema de Gestão de Estoque Metalmecânica

Sistema de alta performance desenvolvido especialmente para **Indústrias Metalmecânicas, Caldeirarias, Usinagens e Serralherias Industriais**.

Funciona localmente após o carregamento dos assets, sem dependências externas de CDN, com persistência instantânea no navegador. A versão atual é single-user por origem e ainda não sincroniza dados entre computadores, tablets ou smartphones.

---

## 🚀 Como Iniciar o Sistema

Você pode iniciar o sistema de duas maneiras super simples:

### Opção 1: Servidor Local Nativo (Recomendado)
Dê um **duplo clique** no arquivo:
```
iniciar_sistema.bat
```
- Ele iniciará a API Node/SQLite local em `http://127.0.0.1:8090`. Abra esse endereço no navegador após a mensagem de API ativa.
- A API atual atende `127.0.0.1:8090` por padrão. O acesso pela rede exige configurar HOST, firewall e autenticação; a SPA antiga ainda mantém dados locais até a migração completa para SQLite.

### Opção 1B: Banco SQLite + Cadastro Inteligente

Para usar banco compartilhado local e cadastro por câmera/OCR, execute `iniciar_api.bat`. A API Node fica em `http://127.0.0.1:8090`, grava `metalestoque.sqlite` e abre o fluxo `cadastro-inteligente.html`. A visão exige `VISION_API_KEY`; sem chave, o preenchimento manual continua disponível. Consulte `CONFIGURAR_VISAO.md`. Para migrar um backup JSON exportado pela SPA, execute `node migrar-backup-para-sqlite.js caminho\backup.json`.

### Opção 2: Abertura Direta

Dê um **duplo clique** no arquivo `index.html` em qualquer navegador moderno (Opera, Edge, Chrome, etc.).

### Página comercial

Para apresentar o produto e preparar contatos de pilotos, abra o arquivo `vendas.html`. Ele também funciona sem internet e não envia formulários automaticamente; o formulário copia uma mensagem pronta para WhatsApp, e-mail ou CRM. Para medir baseline, uso, ROI e decisão de conversão, use `pilot-scorecard.html`; para acompanhar contas e próximas ações, use `pipeline-pilotos.html`; para gerar uma proposta revisável, use `proposta-piloto.html`; para revisar o escopo operacional, consulte `TERMO_PILOTO_COMERCIAL.md`; para executar a cadência de prospecção, consulte `PLANO_ACAO_14_DIAS_PILOTOS.md`. Para verificar os ativos antes de uma demonstração, execute `node qa-smoke.js` dentro da pasta `estoque`.
---

## ⚙️ Módulos e Recursos Industriais

### 1. 📊 Painel Geral (Dashboard Executivo)
- **KPIs em Tempo Real**: Quantidade de matérias-primas e insumos cadastrados, valor financeiro total imobilizado em estoque (R$), quantidade de itens abaixo do estoque mínimo, OPs ativas e sobras aproveitáveis.
- **Gráficos Dinâmicos**: Distribuição de capital por categoria e fluxo financeiro diário de entradas vs. saídas/consumo.
- **Alertas Críticos Imediatos**: Acesso rápido a itens zerados ou próximos do fim.

### 2. 📦 Almoxarifado & Catálogo Técnico
- **Categorias Especializadas**:
  - Chapas Metálicas (SAE 1020, SAE 1045, Inox 304, Alumínio)
  - Tubos Redondos, Metalões Quadrados, Vigas W/I e Perfis Estruturais
  - Consumíveis de Solda (Arames MIG, Eletrodos, Cilindros de Gás Argônio/Mistura)
  - Ferramental de Usinagem (Insertos de Metal Duro WNMG/CNMG, Fresas de Topo, Brocas)
  - Fixadores (Parafusos Sextavados Grau 8.8, Porcas Autotravantes, Arruelas)
  - Químicos e Fluidos (Óleos Solúveis de Corte, Solventes, Tintas Epóxi)
  - EPIs e Segurança (Luvas de Raspa, Aventais, Máscaras de Solda)
  - Semi-acabados e Produtos Acabados
- **Rastreabilidade e Qualidade (ISO 9001)**:
  - Registro de **Nº de Corrida da Usina** (Gerdau, Usiminas, Aperam, etc.) e certificado de matéria-prima.
  - Endereçamento físico detalhado (ex: *Pátio Chapas - Gaveto 02*, *Estante Fixadores - Gaveteiro 22*).
  - Controle de Custo Médio Ponderado automático a cada nova entrada.

### 3. ✂️ Pátio de Retalhos & Sobras Nobres
- Módulo exclusivo para metalmecânicas evitarem desperdício de matéria-prima.
- Cadastro de retalhos de corte a plasma/laser/oxiacetilenocorte e pontas de barra com dimensões milimétricas exatas, peso estimado e localização na gaiola de sobras.
- Botão **"Utilizar em OP"**: vincula a sobra diretamente a uma nova Ordem de Produção, baixando do pátio e gerando economia real.

### 4. ⚙️ Ordens de Produção (OP / Fabricação)
- Gestão de Ordens de Serviço e Projetos de fabricação de máquinas e estruturas.
- **Lista de Materiais (BOM)**: define todos os insumos e matérias-primas necessárias para o projeto.
- **Baixa Automática no Estoque**: com um clique, valida o saldo e debita todos os componentes do estoque com histórico documentado.
- **Conclusão de OP**: gera automaticamente a entrada do produto acabado no catálogo.

### 5. 🔄 Movimentações & Auditoria
- Histórico completo de auditoria para cada entrada, saída, baixa por OP e ajuste de balanço físico.
- Rastreamento com data, hora, motivo/número do documento fiscal e operador responsável.
- Exportação completa para planilhas em Excel/CSV.

### 6. 🛒 Sugestão de Compras (Ponto de Encomenda)
- Monitoramento automático de todos os itens com estoque abaixo do ponto de reposição.
- Cálculo da quantidade exata a adquirir com base no estoque máximo configurado.
- Estimativa orçamentária do investimento necessário.
- Botão para **Exportar Pedido de Cotação para Fornecedores em CSV**.

### 7. 🧮 Calculadora de Engenharia Metalmecânica Integrada
- Ferramenta nativa para cálculo de peso teórico:
  - **Chapas e Bobinas**: cálculo por espessura (mm), largura (mm), comprimento (mm) e densidade da liga.
  - **Tubos Redondos Industriais**: cálculo por diâmetro externo, espessura de parede e comprimento de barra.
  - **Tubos Quadrados e Retangulares (Metalões)**: cálculo de perímetro médio e espessura.
  - **Tarugos Maciços Redondos**: cálculo cilíndrico preciso.
  - Densidades pré-configuradas: Aço Carbono (7.85), Aço Inox (7.93), Alumínio (2.70), Cobre (8.96), Latão (8.50) e Ferro Fundido (7.20).

### 8. 🏷️ Etiquetas Industriais & QR Code
- Geração de etiquetas de identificação prontas para impressão física em folhas A4 ou impressoras térmicas (Zebra, Elgin, Argox).
- Código de barras, identificador SKU, certificado de usina, dimensões e localização física.

### 9. 💾 Backup & Segurança de Dados
- **Backup em 1 Clique**: Download imediato de arquivo `.json` com todo o banco de dados.
- **Restauração Segura**: Carregue arquivos de backup anteriores a qualquer momento.
- Exportação do inventário geral e movimentações em `.csv` compatível com Excel.

---

## 🛠️ Arquitetura Técnica

- **Frontend**: HTML5 Semântico, CSS3 Moderno (tema industrial Dark/Light responsivo), JavaScript ES6+ Vanilla.
- **Biblioteca de Ícones**: Lucide Icons (armazenada localmente na pasta `lib/`; não depende de CDN durante o uso normal).
- **Gráficos**: Chart.js (armazenada localmente em `lib/`).
- **API de cadastro**: Node.js + SQLite (`api-server.js`) para a base compartilhada local e auditoria do cadastro inteligente.
- **Visão/OCR**: endpoint configurável com revisão humana obrigatória (`cadastro-inteligente.html`); a imagem não é salva pelo servidor por padrão.
- **Persistência atual da SPA**: `localStorage` do navegador, isolado por origem/dispositivo; a API SQLite é o primeiro passo de migração para uma fonte compartilhada.
- **Servidor Web**: Script nativo em PowerShell (`server.ps1`) síncrono, com MIME types e proteção básica de caminho; atende localhost por padrão.

Desenvolvido para máxima agilidade e robustez no dia a dia da indústria.
