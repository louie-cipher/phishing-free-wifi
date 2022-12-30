@echo off
@REM create a variable for the path to the current directory
set DIR=%~dp0

if "%1" == "init" (
    cd client
    npm install
    cd ..
    cd server
    npm install
    cd ..
    copy .env.example .env
    exit
)

if "%1" == "prod" (
    wt new-tab PowerShell -c "npm --prefix %DIR%\server start"
    wt -w 0 new-tab PowerShell -c "npm --prefix %DIR%\client start"
    exit
)

wt new-tab PowerShell -c "npm --prefix %DIR%\server run dev"
wt -w 0 new-tab PowerShell -c "npm --prefix %DIR%\client run dev"
