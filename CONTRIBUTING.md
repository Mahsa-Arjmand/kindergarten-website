# راهنمای مشارکت در پروژه کودکستان هدیه

خوشحال می‌شویم که در توسعه این پروژه مشارکت می‌کنید! لطفاً این راهنما را مطالعه کنید.

## 🌳 ساختار شاخه‌ها (Branch Strategy)

### شاخه‌های اصلی:
- **main**: شاخه اصلی برای نسخه‌های پایدار
- **develop**: شاخه توسعه برای ادغام تغییرات قبل از ورود به main

### شاخه‌های ویژگی (Feature Branches):
- **feature/backend-setup**: تنظیمات و پیاده‌سازی Backend
- **feature/frontend-setup**: تنظیمات و پیاده‌سازی Frontend
- **feature/authentication**: سیستم احراز هویت
- **feature/registration-system**: سیستم ثبت‌نام
- **feature/careers-system**: سیستم استخدام
- **feature/admin-dashboard**: پنل مدیریت
- **feature/content-management**: مدیریت محتوا

## 📋 روند کار (Workflow)

### 1. ایجاد شاخه جدید
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. انجام تغییرات
- کد خود را در شاخه feature تغییر دهید
- commitهای منظم و معناداری ایجاد کنید

### 3. تست کردن
```bash
# Frontend tests
cd frontend
npm run build

# Backend tests
cd backend
php artisan test
```

### 4. ارسال Pull Request
- push کنید به GitHub
- Pull Request ایجاد کنید
- توضیح تغییرات را بنویسید
- منتظر بررسی باشید

### 5. ادغام (Merge)
- پس از تایید، تغییرات به develop منتقل می‌شوند
- مدیر پروژه تغییرات را به main منتقل می‌کند

## 📝 پیام‌های Commit

از الگوی زیر استفاده کنید:
```
type(scope): subject

body

footer
```

انواع type:
- `feat`: ویژگی جدید
- `fix`: رفع باگ
- `docs`: مستندات
- `style`: فرمت کد
- `refactor`: بازنویسی
- `test`: تست
- `chore`: سایر کارها

مثال:
```
feat(registration): add email confirmation for new registrations

Added email confirmation system for new registrations with verification link.

Closes #123
```

## 🔧 تنظیمات محیط

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan storage:link
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 🧪 تست

قبل از ارسال PR، حتماً تست‌ها را اجرا کنید:
```bash
# Frontend build
cd frontend
npm run build

# Backend tests
cd backend
php artisan test
```

## 🐤 گزارش باگ

برای گزارش باگ:
1. به GitHub Issues بروید
2. یک Issue جدید ایجاد کنید
3. عنوان واضح بنویسید
4. باگ را با جزئیات توضیح دهید
5. اگر امکان دارد، مراحل تکرار را بنویسید

## 💡 پیشنهادات

برای پیشنهاد ویژگی جدید:
1. به GitHub Issues بروید
2. یک Issue جدید ایجاد کنید
3. ویژگی را توضیح دهید
4. مزایا و موارد استفاده را بنویسید

## 📞 تماس

برای سوالات:
- Issue در GitHub ایجاد کنید
- یا با مدیر پروژه تماس بگیرید

---

با تشکر از مشارکت شما! 🎉
