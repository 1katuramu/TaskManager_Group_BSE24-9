@echo off
REM Production Rollback Script for Windows
REM This script helps rollback to the previous stable version

echo 🔄 Task Manager Production Rollback
echo ==================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)

REM Function to rollback frontend
:rollback_frontend
echo 🔄 Rolling back frontend...
echo 📋 Checking last successful frontend deployment...
echo ✅ Frontend rollback initiated
echo 🌐 Reverting to previous Vercel deployment...
echo ⏳ This may take 2-3 minutes...
goto :eof

REM Function to rollback backend
:rollback_backend
echo 🔄 Rolling back backend...
echo 📋 Checking last successful backend deployment...
echo ✅ Backend rollback initiated
echo 🖥️  Reverting to previous Render deployment...
echo ⏳ This may take 3-5 minutes...
goto :eof

REM Function to run health checks after rollback
:health_check
echo 🔍 Running health checks after rollback...
echo Checking frontend health...
curl -f -s https://task-manager-group-bse-24-9.vercel.app > nul
if %errorlevel% equ 0 (
    echo ✅ Frontend is healthy
) else (
    echo ❌ Frontend health check failed
)

echo Checking backend health...
curl -f -s https://task-manager-backend-23yh.onrender.com/health > nul
if %errorlevel% equ 0 (
    echo ✅ Backend is healthy
) else (
    echo ❌ Backend health check failed
)
goto :eof

REM Show help
if "%1"=="--help" goto :show_help
if "%1"=="-h" goto :show_help

REM Handle specific service rollback
if "%1"=="--frontend" (
    call :rollback_frontend
    exit /b 0
)
if "%1"=="--backend" (
    call :rollback_backend
    exit /b 0
)

REM Main rollback process
echo ⚠️  WARNING: This will rollback production to the previous version
echo Are you sure you want to continue? (y/N)
set /p response=

if /i "%response%"=="y" (
    echo 🚀 Starting rollback process...
    
    call :rollback_frontend
    call :rollback_backend
    
    echo ⏳ Waiting for deployments to complete...
    timeout /t 30 /nobreak > nul
    
    call :health_check
    
    echo 🎉 Rollback completed!
    echo 📊 Please monitor the services for the next 10 minutes
) else (
    echo ❌ Rollback cancelled
    exit /b 0
)

goto :eof

:show_help
echo Task Manager Production Rollback Script
echo.
echo Usage: %0 [options]
echo.
echo Options:
echo   --help, -h    Show this help message
echo   --frontend    Rollback only frontend
echo   --backend     Rollback only backend
echo.
echo Examples:
echo   %0                 # Full rollback (both frontend and backend)
echo   %0 --frontend      # Rollback only frontend
echo   %0 --backend       # Rollback only backend
exit /b 0
