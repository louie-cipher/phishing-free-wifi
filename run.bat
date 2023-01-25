@echo off
set DIR=%~dp0

if "%1" == "init" (
    copy .env.example .env
    cd %DIR%\server
    npm install
    cd ..\client
    npm install
    exit
)

if "%1" == "prod" (
    wt new-tab PowerShell -c "npm --prefix %DIR%\server start"
    wt -w 0 new-tab PowerShell -c "npm --prefix %DIR%\client start"
    exit
)

wt new-tab PowerShell -c "npm --prefix %DIR%\server run dev"
wt -w 0 new-tab PowerShell -c "npm --prefix %DIR%\client run dev"
