Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       Starting SmartCompare Locally on Windows           " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Start Backend Server
Write-Host "Starting Backend API on http://localhost:5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptDir\server'; node src/server.js"

# 2. Wait 2 seconds for MongoDB connection
Start-Sleep -Seconds 2

# 3. Start Frontend Vite Dev Server
Write-Host "Starting Frontend Client on http://localhost:5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$scriptDir\client'; npm run dev"

# 4. Wait 3 seconds for Vite to be ready and open in default browser
Start-Sleep -Seconds 3
Write-Host "Opening SmartCompare in your browser..." -ForegroundColor Cyan
Start-Process "http://localhost:5173"

Write-Host "`nSmartCompare is now LIVE locally:" -ForegroundColor Green
Write-Host "  -> Frontend:    http://localhost:5173" -ForegroundColor White
Write-Host "  -> Backend API: http://localhost:5000" -ForegroundColor White
