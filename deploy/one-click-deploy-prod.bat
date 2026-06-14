@echo off
REM =====================================================================
REM  Treelands Foundation - One-Click Production Deploy
REM  Builds the Vite SPA, dockerizes it, ships to the VPS, runs it on a
REM  dedicated port, and configures HTTPS for treelands.happytechnovation.com
REM =====================================================================
setlocal ENABLEDELAYEDEXPANSION
cd /d "%~dp0.."

REM ----- Configuration (mirrors deploy/deploy.env) -----
set SERVER_IP=147.93.102.50
set SERVER_USER=root
set SERVER_PASSWORD=Myworld@041293
set DOMAIN=treelands.happytechnovation.com
set PORT=3006
set CONTAINER_NAME=treelands-foundation
set IMAGE_NAME=treelands-foundation

echo =====================================================================
echo  Deploying Treelands Foundation  ^=^>  https://%DOMAIN%/  (port %PORT%)
echo =====================================================================

echo [0/8] Checking Docker...
docker info >nul 2>&1
if errorlevel 1 ( echo [ERROR] Docker is not running. Start Docker Desktop. & exit /b 1 )

echo [1/8] Clean production build...
if exist dist rmdir /s /q dist
call npm run build > deploy\build.log 2>&1
if errorlevel 1 ( echo [ERROR] Build failed. See deploy\build.log & type deploy\build.log & exit /b 1 )
echo    build OK

echo [2/8] Building Docker image...
docker build --no-cache -f deploy\Dockerfile -t %IMAGE_NAME%:prod . > deploy\docker.log 2>&1
if errorlevel 1 ( echo [ERROR] Docker build failed. See deploy\docker.log & type deploy\docker.log & exit /b 1 )
echo    image OK

echo [3/8] Local smoke test (port 3998)...
docker rm -f treelands-local-check >nul 2>&1
docker run -d --name treelands-local-check -p 3998:3000 %IMAGE_NAME%:prod >nul
powershell -Command "Start-Sleep -Seconds 15"
powershell -Command "try{Invoke-WebRequest 'http://localhost:3998/health' -UseBasicParsing -TimeoutSec 30 | Out-Null; Write-Host '   local OK'}catch{Write-Host '   local FAILED: ' $_.Exception.Message; exit 1}"
if errorlevel 1 ( docker logs treelands-local-check --tail 20 & docker rm -f treelands-local-check >nul 2>&1 & exit /b 1 )
docker rm -f treelands-local-check >nul 2>&1

echo [4/8] Saving image to tar...
if exist treelands-prod.tar del treelands-prod.tar >nul 2>&1
docker save -o treelands-prod.tar %IMAGE_NAME%:prod

echo [4b/8] Caching SSH host key...
echo y | plink -pw %SERVER_PASSWORD% %SERVER_USER%@%SERVER_IP% "echo connected" >nul 2>&1

echo [5/8] Uploading image + configs to %SERVER_IP%...
pscp -batch -pw %SERVER_PASSWORD% treelands-prod.tar %SERVER_USER%@%SERVER_IP%:/root/ || ( echo [ERROR] image upload failed & exit /b 1 )
pscp -batch -pw %SERVER_PASSWORD% deploy\deploy.env %SERVER_USER%@%SERVER_IP%:/tmp/treelands.env
pscp -batch -pw %SERVER_PASSWORD% deploy\treelands.happytechnovation.com.conf %SERVER_USER%@%SERVER_IP%:/tmp/treelands-site.conf
pscp -batch -pw %SERVER_PASSWORD% deploy\remote\deploy-container.sh %SERVER_USER%@%SERVER_IP%:/tmp/deploy-container.sh
pscp -batch -pw %SERVER_PASSWORD% deploy\remote\setup-nginx-ssl.sh %SERVER_USER%@%SERVER_IP%:/tmp/setup-nginx-ssl.sh
echo    upload complete

echo [6/8] Starting container on server (port %PORT%)...
plink -batch -pw %SERVER_PASSWORD% %SERVER_USER%@%SERVER_IP% "sed -i 's/\r$//' /tmp/treelands.env /tmp/deploy-container.sh /tmp/setup-nginx-ssl.sh; bash /tmp/deploy-container.sh" > deploy\remote.log 2>&1
findstr /C:"DEPLOY_OK" deploy\remote.log >nul
if errorlevel 1 ( echo [ERROR] Container deploy failed. See deploy\remote.log & type deploy\remote.log & exit /b 1 )
echo    container running

echo [7/8] Configuring HTTPS (certbot + nginx)...
plink -batch -pw %SERVER_PASSWORD% %SERVER_USER%@%SERVER_IP% "bash /tmp/setup-nginx-ssl.sh" >> deploy\remote.log 2>&1
findstr /C:"NGINX_OK" deploy\remote.log >nul
if errorlevel 1 (
    echo    [WARN] HTTPS/nginx step did not complete - likely DNS for %DOMAIN% not pointed yet.
    echo           Point an A record to %SERVER_IP%, then re-run this script.
    echo           Details in deploy\remote.log
)

echo [8/8] Verifying live site...
powershell -Command "Start-Sleep -Seconds 15"
findstr /C:"NGINX_OK" deploy\remote.log >nul
if not errorlevel 1 (
    powershell -Command "try{Invoke-WebRequest 'https://%DOMAIN%/health' -UseBasicParsing -TimeoutSec 10 | Out-Null; Write-Host '   HTTPS OK -> https://%DOMAIN%/'}catch{Write-Host '   HTTPS not reachable yet (DNS/cert may need a few minutes)'}"
) else (
    powershell -Command "try{Invoke-WebRequest 'http://%DOMAIN%/health' -UseBasicParsing -TimeoutSec 10 | Out-Null; Write-Host '   HTTP fallback OK -> http://%DOMAIN%/'}catch{Write-Host '   HTTP fallback not reachable yet (DNS may still be propagating)'}"
)

del treelands-prod.tar >nul 2>&1
echo.
echo =====================================================================
echo  DONE
echo  Live:   https://%DOMAIN%/
echo  Direct: http://%SERVER_IP%:%PORT%/
echo  Logs:   deploy\remote.log
echo =====================================================================
endlocal
