@echo off
setlocal
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"

if not exist node_modules (
  echo Installing dependencies...
  call "C:\Program Files\nodejs\npm.cmd" install
  if errorlevel 1 (
    echo.
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Starting game server...
echo Open the Local URL shown below in your browser.
call "C:\Program Files\nodejs\npm.cmd" run dev -- --host 127.0.0.1
pause
