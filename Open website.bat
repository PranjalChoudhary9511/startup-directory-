@echo off
title First Rupee website (keep this window open)
cd /d "%~dp0web"
if not exist node_modules call npm install
echo.
echo Starting the website. It opens in your browser at http://localhost:3000
echo Keep this window open while you use the site. Close it to stop the site.
echo.
start "" cmd /c "timeout /t 10 /nobreak >nul & start http://localhost:3000"
call npm run dev
pause
