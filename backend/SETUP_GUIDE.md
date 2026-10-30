# Backend Database Setup Guide

## Prerequisites (Must be installed on your laptop)

### 1. Install PHP 8.2+
**Windows:**
- Download from: https://windows.php.net/download/
- Choose PHP 8.2 or higher (VC15 x64 Thread Safe)
- Extract to C:\php
- Add C:\php to your Windows PATH environment variable

**Alternative:** Use XAMPP (includes PHP + MySQL + Apache)
- Download from: https://www.apachefriends.org/download.html

### 2. Install Composer
**Windows:**
- Download from: https://getcomposer.org/Composer-Setup.exe
- Run the installer
- It will automatically detect your PHP installation

### 3. Install MySQL
**Option 1 - Standalone:**
- Download MySQL Community Server: https://dev.mysql.com/downloads/mysql/
- Install and set root password

**Option 2 - XAMPP:**
- XAMPP includes MySQL, no separate installation needed

## Setup Steps

Once you have PHP, Composer, and MySQL installed:

### 1. Open Command Prompt/Terminal
Navigate to the backend folder:
```bash
cd C:\kindergraten_website\kindergarten-website\backend
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Generate Application Key
```bash
php artisan key:generate
```

### 4. Configure Database
The `.env` file is already created with these default settings:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kindergarten
DB_USERNAME=root
DB_PASSWORD=
```

**If you set a MySQL password**, update `DB_PASSWORD` in the `.env` file.

### 5. Create MySQL Database
**Option 1 - Using MySQL Command Line:**
```bash
mysql -u root -p
```
Then run:
```sql
CREATE DATABASE kindergarten;
EXIT;
```

**Option 2 - Using phpMyAdmin (if using XAMPP):**
- Open http://localhost/phpmyadmin
- Create new database named "kindergarten"

### 6. Run Database Migrations
```bash
php artisan migrate
```

This will create all the required tables:
- users
- registrations
- job_applications
- contact_messages
- teachers
- services
- activities
- gallery
- news
- faqs
- cache, jobs, personal_access_tokens

### 7. Seed the Database
```bash
php artisan db:seed
```

This will populate the database with:
- Admin user (admin@example.com / password)
- Sample teachers
- Sample services
- Sample activities
- Sample gallery images
- Sample news
- Sample FAQs
- Sample registrations
- Sample job applications
- Sample contact messages

### 8. Create Storage Link
```bash
php artisan storage:link
```

This creates a symbolic link for file uploads.

#### Gallery video upload limits

The gallery accepts videos up to 50 MB. `public/.user.ini` sets PHP upload and request limits for CGI/FastCGI hosting. If uploads still return HTTP 413, the web server or hosting proxy also needs a request-body limit of at least 55 MB. For Nginx, add `client_max_body_size 55m;` inside the site's `server` block and reload Nginx. With PHP's built-in development server, update `upload_max_filesize` and `post_max_size` in the active `php.ini`, then restart the backend.

### 9. Start the Laravel Server
```bash
php artisan serve
```

The backend will now be available at: http://localhost:8000

## Verify Installation

### Test Backend API
Open your browser and visit:
- http://localhost:8000/api/v1/services
- http://localhost:8000/api/v1/teachers
- http://localhost:8000/api/v1/activities

### Test Admin Login
- Visit: http://localhost:8000/api/v1/auth/login
- Email: admin@example.com
- Password: password

## Troubleshooting

### Composer Issues
If you get "Could not authenticate against github.com":
```bash
composer install --prefer-source
```

### MySQL Connection Issues
- Ensure MySQL is running
- Check your MySQL password in `.env`
- Verify database name "kindergarten" exists

### PHP Not Found
- Ensure PHP is in your Windows PATH
- Restart command prompt after adding to PATH
- Test with: `php --version`

### Permission Issues (Storage Link)
If `php artisan storage:link` fails on Windows:
- Run command prompt as Administrator
- Or manually create the symlink

## Common Port Conflicts

If port 8000 is already in use:
```bash
php artisan serve --port=8080
```

Then update `APP_URL` in `.env` to: `http://localhost:8080`

## Next Steps

Once backend is running:
1. Update frontend `.env` with: `VITE_API_URL=http://localhost:8000/api/v1`
2. Start frontend from the repository root with `npm run dev` (or run `npm run install:frontend` once if dependencies are not installed).
3. Visit: http://localhost:5173

## Database Reset (if needed)

To completely reset the database:
```bash
php artisan migrate:fresh --seed
```

This drops all tables and re-runs migrations and seeders.