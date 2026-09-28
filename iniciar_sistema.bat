@echo off
title MetalEstoque PRO - Inicializador
cls
echo ================================================================
echo           METALESTOQUE PRO - SISTEMA DE ESTOQUE INDUSTRIAL
echo ================================================================
echo.
echo Iniciando a API SQLite local do sistema...
echo.

cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

pause
