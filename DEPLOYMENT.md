# راهنمای Deploy پروژه مهدکودک هدیه

## اطلاعات هاست
- دامنه: hediehkindergarden.ir
- PHP: 8.1 یا بالاتر
- MySQL: 5.7 یا بالاتر
- Node.js: 18 یا بالاتر

## ⚠️ نکته مهم: HashRouter
این پروژه از **HashRouter** استفاده می‌کند. این یعنی:
- آدرس‌ها شامل `#` هستند: `https://hediehkindergarden.ir/#/admin`
- این برای هاست‌های بدون دسترسی به web server configuration طراحی شده
- همه لینک‌ها و رفرش‌ها بدون مشکل کار می‌کنند

## فایل‌های مورد نیاز برای آپلود

### 1. فرونت‌اند (React + Vite)
- پوشه `frontend/dist` - فایل‌های build شده
- این پوشه باید در روت هاست آپلود شود

### 2. بک‌اند (Laravel)
- تمام فایل‌های پوشه `backend` به جز:
  - `node_modules`
  - `vendor`
  - `.env` (یک نسخه جدید بسازید)

### 3. دیتابیس
- فایل `database_schema.sql` برای ساخت دیتابیس

## مراحل Deploy

### مرحله 1: آپلود فایل‌ها به هاست

1. تمام فایل‌های پوشه `backend` (به جز موارد بالا) را به هاست آپلود کنید
2. فایل‌های پوشه `frontend/dist` را به روت هاست آپلود کنید

### مرحله 2: تنظیم دیتابیس

1. یک دیتابیس MySQL جدید در هاست بسازید (اسم: kindergarten)
2. از phpMyAdmin یا مشابه، فایل `database_schema.sql` را ایمپورت کنید
3. اطلاعات دیتابیس را در فایل `backend/.env` تنظیم کنید:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=kindergarten
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   ```

### مرحله 3: تنظیم Environment Variables در بک‌اند

فایل `backend/.env` را ویرایش کنید:
```env
APP_NAME="کودکستان هدیه"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://hediehkindergarden.ir

APP_LOCALE=fa
APP_FALLBACK_LOCALE=en

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=kindergarten
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# Storage
FILESYSTEM_DISK=public

# Cache
CACHE_DRIVER=file

# Session
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

### مرحله 4: نصب وابستگی‌های Laravel

از طریق SSH یا کنسول هاست:
```bash
cd backend
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan storage:link
php artisan migrate
php artisan db:seed
```

### مرحله 5: تنظیم آدرس روت

فایل `backend/public/index.php` باید به روت هاست اشاره کند.

### مرحله 6: تنظیم Nginx (اگر از Nginx استفاده می‌کنید)

نمونه تنظیم Nginx:
```nginx
server {
    listen 80;
    server_name hediehkindergarden.ir;
    root /path/to/your/site/public;

    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location /storage {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location /api {
        try_files $uri $uri/ /index.php?$query_string;
    }
}
```

### مرحله 7: آپلود فایل‌های Storage

فایل‌های تصاویر و مدیا باید در پوشه `backend/storage/app/public` آپلود شوند.

## پس از Deploy

1. مرورگر را باز کنید و به آدرس `https://hediehkindergarden.ir` بروید
2. صفحه اصلی باید نمایش داده شود
3. پنل ادمین: `https://hediehkindergarden.ir/#/admin/login`
4. برای ورود به پنل ادمین، ابتدا یک کاربر بسازید:
   ```bash
   php artisan tinker
   >>> $user = new App\Models\User;
   >>> $user->name = 'Admin';
   >>> $user->email = 'admin@example.com';
   >>> $user->password = bcrypt('your_password');
   >>> $user->is_admin = true;
   >>> $user->save();
   ```

## عیب‌یابی مشکلات

### اگر CSS لود نمی‌شود
- بررسی کنید که فایل‌های CSS در مسیر درست هستند
- از Browser DevTools Console خطاها را چک کنید

### اگر API کار نمی‌کند
- `.env` در بک‌اند را چک کنید
- لینک API در فرونت‌اند (`.env.production`) را بررسی کنید

### اگر تصاویر نمایش داده نمی‌شوند
- دسترسی پوشه `storage/app/public` را چک کنید
- دسترسی به فایل‌ها در سرور تنظیم کنید (chmod 755)

## پشتیبانی
اگر مشکلی داشتید، با توسعه‌دهنده تماس بگیرید.
