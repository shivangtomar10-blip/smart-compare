@echo off
echo Starting SmartCompare Backend and Frontend...

start "SmartCompare Backend (Port 5000)" cmd /k "cd server && npm start"
start "SmartCompare Frontend (Port 5173)" cmd /k "cd client && npm run dev"

echo Both servers started!
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000
