@echo off
echo Installing Laravel dependencies...
echo.

REM Try different installation methods
echo Method 1: Standard install
composer install
if %errorlevel% equ 0 (
    echo Installation successful!
    goto :end
)

echo.
echo Method 1 failed. Trying Method 2: prefer-source
composer install --prefer-source
if %errorlevel% equ 0 (
    echo Installation successful!
    goto :end
)

echo.
echo Method 2 failed. Trying Method 3: no-dev
composer install --no-dev
if %errorlevel% equ 0 (
    echo Installation successful (no-dev)!
    goto :end
)

echo.
echo All installation methods failed.
echo Please check your internet connection or try using a VPN.
echo See README.md for more troubleshooting options.

:end
echo.
echo Next steps:
echo 1. Copy .env.example to .env
echo 2. Run: php artisan key:generate
echo 3. Run: php artisan migrate
echo 4. Run: php artisan db:seed
echo 5. Run: php artisan storage:link
pause
