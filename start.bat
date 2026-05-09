@echo off
echo Starting Active Recall Coach...
echo Press Ctrl+C to stop the server.
echo.
echo Opening browser to http://localhost:8080/index.html
start http://localhost:8080/index.html
python -m http.server 8080


