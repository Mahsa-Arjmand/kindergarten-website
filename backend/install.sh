#!/bin/bash

echo "Installing Laravel dependencies..."
echo ""

# Try different installation methods
echo "Method 1: Standard install"
composer install
if [ $? -eq 0 ]; then
    echo "Installation successful!"
    exit 0
fi

echo ""
echo "Method 1 failed. Trying Method 2: prefer-source"
composer install --prefer-source
if [ $? -eq 0 ]; then
    echo "Installation successful!"
    exit 0
fi

echo ""
echo "Method 2 failed. Trying Method 3: no-dev"
composer install --no-dev
if [ $? -eq 0 ]; then
    echo "Installation successful (no-dev)!"
    exit 0
fi

echo ""
echo "All installation methods failed."
echo "Please check your internet connection or try using a VPN."
echo "See README.md for more troubleshooting options."

echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env"
echo "2. Run: php artisan key:generate"
echo "3. Run: php artisan migrate"
echo "4. Run: php artisan db:seed"
echo "5. Run: php artisan storage:link"
