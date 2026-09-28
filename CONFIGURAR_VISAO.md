# Configuração da visão/OCR

O cadastro inteligente funciona em dois modos:

- **Manual:** não exige chave e sempre deve permanecer disponível.
- **OCR/visão:** envia a imagem para um endpoint compatível com Chat Completions configurado no servidor Node.

## Variáveis

No PowerShell, antes de iniciar a API:

```powershell
$env:VISION_API_KEY = "SUA_CHAVE_FORA_DO_REPOSITÓRIO"
$env:VISION_API_URL = "https://api.openai.com/v1/chat/completions"
$env:VISION_MODEL = "gpt-4o-mini"
node .\api-server.js
```

Ou use `iniciar_api.bat` depois de configurar a variável no ambiente do Windows. Nunca grave a chave em HTML, JavaScript do navegador, CSV, backup ou Git.

## Privacidade e revisão

1. A imagem só é enviada quando o operador clica em **Extrair dados por OCR/visão**.
2. O servidor não salva a imagem por padrão.
3. A resposta é apenas uma sugestão; o operador deve corrigir e confirmar todos os campos.
4. O botão **Salvar no banco SQLite** é a única etapa que cria o registro.
5. Antes de usar dados de clientes, certificados ou documentos pessoais, valide finalidade, retenção e base legal com o responsável de privacidade.

Sem `VISION_API_KEY`, o endpoint responde que a visão não está configurada, mas o cadastro manual continua funcionando.
