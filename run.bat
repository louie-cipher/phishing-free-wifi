@echo off
set DIR=%~dp0

if "%1" == "init" (
    if not exist "%DIR%\.env" (
        copy .env.example .env
    )
    npm --prefix %DIR%\server install
    npm --prefix %DIR%\client install
    exit
)

if "%1" == "build" (
    npm --prefix %DIR%\server run build
    npm --prefix %DIR%\client run build
    exit
)

if "%1" == "prod" (
    wt -w 0 new-tab PowerShell -c "npm --prefix %DIR%\server start"
    wt -w 0 new-tab PowerShell -c "npm --prefix %DIR%\client start"
    exit
)

wt -w 0 new-tab PowerShell -c "npm --prefix %DIR%\server run dev"
wt -w 0 new-tab PowerShell -c "npm --prefix %DIR%\client run dev"
