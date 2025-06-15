@echo off

REM === Start MongoDB (edit version number if needed) ===
start "" "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"

REM === Wait 5 seconds to ensure MongoDB is running ===
timeout /t 5

REM === Navigate to your Fried Sea project folder ===
cd /d "C:\Users\Ahmed Magdy\Downloads\Website for fried sea1.2 (2)"

REM === Start the Node.js application ===
node app.js

pause
