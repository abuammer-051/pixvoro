@echo off
echo ========================================================
echo Starting Pixvoro Pro (FastAPI Backend + Vite Frontend)
echo ========================================================

start "Pixvoro Backend (FastAPI)" cmd /k "cd backend && python run.py"
start "Pixvoro Frontend (Vite)" cmd /k "cd frontend && npm run dev"

echo.
echo Services launched!
echo - Frontend: http://localhost:5173
echo - Backend API: http://127.0.0.1:8000
echo - Swagger Docs: http://127.0.0.1:8000/docs
echo ========================================================
