# کودکستان هدیه - وب‌سایت رسمی

یک وب‌سایت مدرن و حرفه‌ای برای کودکستان هدیه با قابلیت ثبت‌نام آنلاین، گالری، و پنل مدیریت کامل.

## 📋 اطلاعات پروژه

- **نام مجموعه:** کودکستان هدیه
- **زبان:** فارسی (RTL)
- **تکنولوژی‌ها:** React + TypeScript + Vite (Frontend) | Laravel + PHP (Backend)
- **دیتابیس:** MySQL

## 🏗️ ساختار پروژه

```
kindergarten-website/
├── frontend/          # React Application
├── backend/           # Laravel Application
├── README.md
└── .gitignore
```

## 🚀 تکنولوژی‌ها

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Zod
- Lucide React

### Backend
- Laravel 12
- PHP 8.2+
- MySQL
- Laravel Sanctum (Authentication)
- Laravel Storage

## 📦 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL
- Git

### 1. کلون کردن پروژه
```bash
git clone https://github.com/Mahsa-Arjmand/kindergarten-website.git
cd kindergarten-website
```

### 2. تنظیم Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
php artisan serve
```

**یا از اسکریپت نصب استفاده کنید:**

**Windows:**
```bash
cd backend
install.bat
```

**Linux/Mac:**
```bash
cd backend
chmod +x install.sh
./install.sh
```

**عیب‌یابی composer:**

اگر با خطای "Could not authenticate against github.com" مواجه شدید:

**راه‌حل ۱: استفاده از prefer-source**
```bash
composer install --prefer-source
```

**راه‌حل ۲: تنظیم composer config**
```bash
composer config -g repo.packagist composer https://packagist.org
composer install
```

**راه‌حل ۳: استفاده از VPN**
- اگر در ایران هستید، از VPN استفاده کنید
- یا DNS خود را به 8.8.8.8 تغییر دهید

**راه‌حل ۴: نصب بدون dev dependencies**
```bash
composer install --no-dev
```

**راه‌حل ۵: استفاده از proxy در composer**
```bash
composer config -g http-proxy http://your-proxy:port
composer install
```

### 3. تنظیم Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 4. تنظیم Environment Variables

#### Backend (.env)
```env
APP_NAME="کودکستان هدیه"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kindergarten
DB_USERNAME=root
DB_PASSWORD=

FILESYSTEM_DISK=public
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api/v1
```

## 👤 Admin Panel

برای دسترسی به پنل مدیریت:

```bash
php artisan tinker
```

سپس اجرا کنید:
```php
$user = \App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => bcrypt('password')
]);
```

URL: `http://localhost:5173/admin/login`
Email: `admin@example.com`
Password: `password`

## 🛠️ دستورات مفید

### Backend
```bash
php artisan migrate           # اجرای migrations
php artisan db:seed          # اجرای seeders
php artisan migrate:fresh --seed  # بازسازی دیتابیس
php artisan storage:link     # لینک storage
php artisan serve            # اجرای سرور
```

### Frontend
```bash
npm run dev          # اجرای development server
npm run build        # بیلد برای production
npm run preview      # پیش‌نمایش production build
```

## 📡 API Endpoints

### Public APIs
- `GET /api/v1/services` - لیست خدمات
- `GET /api/v1/activities` - لیست فعالیت‌ها
- `GET /api/v1/teachers` - لیست مربیان
- `GET /api/v1/gallery` - گالری
- `GET /api/v1/news` - اخبار
- `GET /api/v1/faqs` - سوالات متداول
- `POST /api/v1/registrations` - ثبت‌نام کودک
- `POST /api/v1/job-applications` - درخواست همکاری
- `POST /api/v1/contact-messages` - پیام تماس

### Admin APIs (Require Authentication)
- `GET /api/v1/admin/dashboard` - داشبورد
- `GET /api/v1/admin/registrations` - لیست ثبت‌نام‌ها
- `PUT /api/v1/admin/registrations/{id}` - تغییر وضعیت ثبت‌نام
- `GET /api/v1/admin/job-applications` - لیست درخواست‌های همکاری
- `PUT /api/v1/admin/job-applications/{id}` - تغییر وضعیت درخواست
- `GET /api/v1/admin/teachers` - مدیریت مربیان
- `POST /api/v1/admin/teachers` - افزودن مربی
- `PUT /api/v1/admin/teachers/{id}` - ویرایش مربی
- `DELETE /api/v1/admin/teachers/{id}` - حذف مربی
- `GET /api/v1/admin/services` - مدیریت خدمات
- `POST /api/v1/admin/services` - افزودن خدمت
- `PUT /api/v1/admin/services/{id}` - ویرایش خدمت
- `DELETE /api/v1/admin/services/{id}` - حذف خدمت
- `GET /api/v1/admin/activities` - مدیریت فعالیت‌ها
- `POST /api/v1/admin/activities` - افزودن فعالیت
- `PUT /api/v1/admin/activities/{id}` - ویرایش فعالیت
- `DELETE /api/v1/admin/activities/{id}` - حذف فعالیت
- `GET /api/v1/admin/gallery` - مدیریت گالری
- `POST /api/v1/admin/gallery` - افزودن تصویر
- `DELETE /api/v1/admin/gallery/{id}` - حذف تصویر
- `GET /api/v1/admin/news` - مدیریت اخبار
- `POST /api/v1/admin/news` - افزودن خبر
- `PUT /api/v1/admin/news/{id}` - ویرایش خبر
- `DELETE /api/v1/admin/news/{id}` - حذف خبر
- `GET /api/v1/admin/faqs` - مدیریت سوالات متداول
- `POST /api/v1/admin/faqs` - افزودن سوال
- `PUT /api/v1/admin/faqs/{id}` - ویرایش سوال
- `DELETE /api/v1/admin/faqs/{id}` - حذف سوال

## 🎨 صفحات سایت

1. **صفحه اصلی** - Hero، معرفی، مزیت‌ها، برنامه‌ها، فعالیت‌ها، مربیان، گالری
2. **درباره ما** - معرفی کامل کودکستان
3. **برنامه‌ها و خدمات** - لیست خدمات
4. **کلاس‌ها و فعالیت‌ها** - لیست فعالیت‌ها
5. **مربیان** - معرفی تیم آموزشی
6. **گالری** - تصاویر با فیلتر دسته‌بندی
7. **ثبت‌نام آنلاین** - فرم ثبت‌نام کودک
8. **همکاری با ما** - فرم درخواست استخدام
9. **سوالات متداول** - FAQ با Accordion
10. **تماس با ما** - فرم تماس و اطلاعات
11. **اخبار** - اخبار و اطلاعیه‌ها

## 🔒 امنیت

- Validation سمت Backend و Frontend
- Authentication برای Admin با Sanctum
- CSRF Protection
- Rate Limiting برای فرم‌های عمومی
- File Upload Validation
- جلوگیری از SQL Injection و XSS
- عدم نمایش اطلاعات حساس در frontend

## 📝 نکات مهم

- کلید نقشه در `frontend/.env.production` نمونه است؛ آن را در پنل هاست هم تنظیم و به دامنه سایت محدود کنید
- فایل‌های .env commit نمی‌شوند
- اطلاعات نمونه برای development استفاده می‌شوند
- تصاویر کودکان واقعی استفاده نمی‌شود
- تمام اطلاعات حساس در backend محافظت می‌شوند

## 🚀 استقرار (Deployment) و رفع مشکلات رایج

### ۱. نقشه گوگل (موقعیت ما)

کلید و شناسه نقشه از طریق متغیرهای محیطی تنظیم می‌شوند و اسکریپت نقشه دیگر در
`index.html` هارد‌کد نشده است:

```env
# frontend/.env.production
VITE_API_URL=https://hediehkindergarten.ir/backend/public/api/v1
VITE_GOOGLE_MAPS_API_KEY=...
VITE_GOOGLE_MAPS_MAP_ID=      # اختیاری — پیش‌فرض DEMO_MAP_ID
```

در Google Cloud Console:

1. **Maps JavaScript API** را فعال کنید.
2. در *API key restrictions* نوع **HTTP referrers** را انتخاب و این دامنه‌ها را
   مجاز کنید: `hediehkindergarten.ir/*`، `*.hediehkindergarten.ir/*` و برای
   توسعه `localhost:5173/*`.

اگر کلید نامعتبر یا محدود باشد، نقشه به‌صورت خودکار به **embed بدون کلید**
(`maps.google.com/maps?...&output=embed`) و سپس به دکمه «مشاهده روی نقشه»
سقوط می‌کند؛ صفحه هرگز خراب نمی‌شود.

#### اگر پیام `RefererDeniedMapError` دیدید

یعنی دامنه‌ای که سایت از آن باز شده در محدودیت‌های کلید نیست:

1. در Google Cloud Console → *APIs & Services → Credentials* کلید را باز کنید.
2. در *Website restrictions* دامنه فعلی را اضافه کنید (هر دو حالت با و بدون
   `www.`؛ برای تست `http://localhost:5173/*`).
3. مطمئن شوید **Maps JavaScript API** فعال و Billing وصل است. اگر Billing وصل
   نباشد، پیام `BillingNotEnabledMapError` و صفحه خاکستری «For development
   purposes only» دیده می‌شود.
4. کش مرورگر/CDN را پاک کنید: پیام‌های `libraries=places` و
   «google.maps.Marker is deprecated» مربوط به نسخه قدیمی است که اسکریپت نقشه
   را در `index.html` هارد‌کد می‌کرد؛ بعد از `npm run build` و آپلود مجدد
   `dist` نباید دیده شوند.

### ۲. CORS و آدرس API

- `VITE_API_URL` باید به `public` لاراول و با `/api/v1` تمام شود
  (مثلاً `https://hediehkindergarten.ir/backend/public/api/v1`).
- دامنه‌های مجاز در `backend/config/cors.php` تعریف شده‌اند و با متغیر
  `CORS_ALLOWED_ORIGINS` (لیست جدا‌شده با کاما) قابل تنظیم‌اند. پس از تغییر
  `.env` دستور `php artisan config:clear` را اجرا کنید.
- اگر ساب‌دامین اضافه می‌کنید، آن را به `CORS_ALLOWED_ORIGINS` اضافه کنید.

### ۳. لودر سایت

- لودر اولیه (`#app-boot-loader`) به‌صورت inline در `index.html` قرار دارد، پس
  حتی قبل از دانلود CSS و JS نمایش داده می‌شود.
- پس از mount شدن React، لودر `src/components/SiteLoader.tsx` جای آن را
  می‌گیرد و در تغییر مسیرها یک نوار پیشرفت باریک بالای صفحه نشان داده می‌شود.

## 🧪 تست

```bash
# Frontend build test
cd frontend
npm run build
```

## 🔎 سئو (SEO)

- **عنوان، توضیحات، canonical، Open Graph و داده ساختاریافته (JSON‌-LD)** برای هر صفحه عمومی در زمان بیلد داخل HTML ساخته می‌شود (`frontend/vite-seo-plugin.ts`)، پس ربات‌های گوگل و پیش‌نمایش لینک (تلگرام، واتساپ، اینستاگرام) بدون اجرای جاوااسکریپت هم آن‌ها را می‌بینند.
- متن عنوان و توضیحات همه صفحات فقط در یک فایل است: `frontend/src/seo/routes.ts`. برای افزودن صفحه عمومی جدید، آن را همین‌جا (و در `App.tsx`) اضافه کنید تا خودکار وارد sitemap شود.
- فایل‌های `sitemap.xml` و `robots.txt` هنگام بیلد ساخته می‌شوند. مسیر `/admin` هم در robots.txt مسدود است و هم `noindex` دارد.
- دامنه پیش‌فرض و اطلاعات واقعی کسب‌وکار (تلفن، آدرس، مختصات، ساعت کاری، خدمات) در `frontend/src/seo/routes.ts` است و در داده ساختاریافته منتشر می‌شود. اگر دامنه نهایی فرق دارد، `VITE_SITE_URL` را تنظیم کنید. هر تغییر در اطلاعات تماس را هم در سایت و هم در این فایل اعمال کنید تا یکسان بمانند.
- سرور باید برای مسیرهای ناشناخته `index.html` را برگرداند (SPA fallback) و فایل‌های `about/index.html` و مشابه آن را مستقیم سرو کند.

## 📄 لایسنس

این پروژه برای کودکستان هدیه توسعه داده شده است.

## 👥 توسعه‌دهندگان

- Mahsa Arjmand
- Arezoo Safari

---

**نسخه:** 1.0.0
**تاریخ:** ۱۴۰۵
