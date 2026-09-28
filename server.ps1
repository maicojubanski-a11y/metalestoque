# METALESTOQUE PRO - inicializador da API Node/SQLite
# O servidor HTTP antigo baseado em HttpListener causava falhas em ambientes
# onde essa API .NET não está disponível. A API Node é agora o caminho oficial.

$ErrorActionPreference = "Stop"
$ApiScript = Join-Path $PSScriptRoot "api-server.js"
$NodeCommand = Get-Command node -ErrorAction SilentlyContinue
$Port = if ($env:PORT) { $env:PORT } else { "8090" }

if (-not (Test-Path $ApiScript -PathType Leaf)) {
    Write-Error "api-server.js não encontrado em $PSScriptRoot"
    exit 1
}

if (-not $NodeCommand) {
    Write-Error "Node.js não foi encontrado. Instale Node.js 22+ e tente novamente."
    exit 1
}

Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "       METALESTOQUE PRO - API SQLITE E CADASTRO INTELIGENTE" -ForegroundColor White
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " [V] API local ativa em http://127.0.0.1:$Port/" -ForegroundColor Green
Write-Host " [>] Sistema principal     : http://127.0.0.1:$Port/index.html" -ForegroundColor Yellow
Write-Host " [>] Cadastro por imagem   : http://127.0.0.1:$Port/cadastro-inteligente.html" -ForegroundColor Yellow
Write-Host " [i] Para OCR, configure VISION_API_KEY antes de iniciar." -ForegroundColor Gray
Write-Host " [i] Pressione Ctrl+C nesta janela para encerrar." -ForegroundColor Gray
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""

try {
    & $NodeCommand.Source $ApiScript
    exit $LASTEXITCODE
} catch {
    Write-Error ("Falha ao iniciar a API Node: " + $_.Exception.Message)
    exit 1
}
