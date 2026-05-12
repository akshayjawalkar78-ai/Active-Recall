# Active Recall Full-Stack Startup Script
# This script installs dependencies and starts the FastAPI server.

Write-Host "--- Initializing Active Recall Production-Grade Backend ---" -ForegroundColor Indigo

# 1. Check for Python
if (!(Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Python is not installed. Please install Python 3.11+." -ForegroundColor Red
    exit
}

# 2. Install Dependencies
Write-Host "Installing/Updating dependencies..." -ForegroundColor Gray
python -m pip install fastapi uvicorn[standard] sqlmodel python-jose[cryptography] passlib[bcrypt] python-multipart google-generativeai --user

# 3. Create .env if it doesn't exist
if (!(Test-Path .env)) {
    $secret = [Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Minimum 0 -Maximum 255) }))
    "SECRET_KEY=$secret`nGEMINI_API_KEY=your_key_here" | Out-File -FilePath .env
    Write-Host "Generated new .env file. PLEASE ADD YOUR GEMINI_API_KEY!" -ForegroundColor Yellow
}

# 4. Start Server
Write-Host "Starting FastAPI Server at http://127.0.0.1:8000" -ForegroundColor Green
python -m uvicorn backend.app.main:app --reload --port 8000
