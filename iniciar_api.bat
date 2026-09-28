@echo off
setlocal
cd /d "%~dp0"
if "%PORT%"=="" set PORT=8090
echo MetalEstoque API SQLite em http://127.0.0.1:%PORT%
echo Cadastro inteligente: http://127.0.0.1:%PORT%/cadastro-inteligente.html
echo Para OCR, configure VISION_API_KEY antes de executar este arquivo.
node api-server.js
pause
