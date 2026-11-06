// Single source of truth for page-level SEO.
// Used by the client (src/seo/RouteSeo.tsx) and by the build plugin
// (vite-seo-plugin.ts) that bakes the same tags into static HTML,
// the sitemap and robots.txt. Keep this file free of browser/Vite-only APIs.

export const SITE_NAME = 'مهدکودک هدیه';
export const SITE_ALT_NAME = 'کودکستان هدیه';
export const SITE_LOCALE = 'fa_IR';
export const LOGO_PATH = '/logo-hediyeh.png';
export const LOGO_SIZE = 512;

// Public site URL. Overridable with VITE_SITE_URL at build time.
// Lowercase on purpose: hostnames are case-insensitive, and canonical URLs should be consistent.
export const DEFAULT_SITE_URL = 'https://hediehkindergarden.ir';

// Facts published in structured data. They must match what the site shows
// (footer / Contact page); update both together.
export const BUSINESS = {
  phone: '+989127402532',
  street: 'نسیم ۱۰ غربی، خیابان شهید علیرضا حق وردی، قطعه ۱۸۴',
  locality: 'زنجان',
  region: 'زنجان',
  postalCode: '4515638191',
  country: 'IR',
  latitude: 36.6707529,
  longitude: 48.5353899,
  priceRange: '$$',
  hours: {
    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '07:00',
    closes: '18:00',
  },
  services: [
    { name: 'شیرخوار و نوپا', description: 'مراقبت و آموزش کودکان ۲ تا ۳ سال' },
    { name: 'پیش‌دبستانی', description: 'آموزش و آماده‌سازی کودکان ۴ تا ۶ سال برای مدرسه' },
    { name: 'سرویس رفت و آمد', description: 'انتقال امن کودکان از خانه به مهدکودک' },
  ],
};

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
}

// Indexable public pages. Order = order in sitemap.xml.
export const publicRoutes: RouteSeo[] = [
  {
    path: '/',
    title: 'مهدکودک هدیه زنجان | مهدکودک و پیش‌دبستانی در منظریه | ثبت‌نام آنلاین',
    description:
      'مهدکودک هدیه در منظریه زنجان: خدمات شیرخوار، نوپا و پیش‌دبستانی با مربیان متخصص. محیطی امن و شاد برای کودکان ۲ تا ۶ سال. ثبت‌نام آنلاین و مشاهده برنامه‌ها.',
  },
  {
    path: '/about',
    title: 'درباره مهدکودک هدیه | ۲۰ سال تجربه در منظریه زنجان',
    description:
      'مهدکودک هدیه در منظریه زنجان با بیش از ۲۰ سال تجربه در آموزش کودکان. آشنایی با رویکرد آموزشی، تیم مربیان و ارزش‌های ما. ثبت‌نام آنلاین فرزندان شما.',
  },
  {
    path: '/services',
    title: 'خدمات مهدکودک هدیه | شیرخوار، نوپا و پیش‌دبستانی در منظریه زنجان',
    description:
      'خدمات مهدکودک هدیه در منظریه زنجان: برنامه شیرخوار نوزاد تا ۲ سال، نوپا ۲ تا ۴ سال، پیش‌دبستانی ۴ تا ۶ سال. با مربیان حرفه‌ای و محیطی امن. ثبت‌نام آنلاین.',
  },
  {
    path: '/activities',
    title: 'کلاس‌ها و فعالیت‌های کودکان | مهدکودک هدیه زنجان',
    description:
      'کلاس‌ها و فعالیت‌های مهدکودک هدیه در زنجان؛ تجربه‌های آموزشی، هنری و خلاقانه برای کودکان به تفکیک گروه سنی.',
  },
  {
    path: '/teachers',
    title: 'مربیان و تیم آموزشی | مهدکودک هدیه زنجان',
    description:
      'آشنایی با مربیان و تیم آموزشی متخصص مهدکودک هدیه در منظریه زنجان، تحصیلات و تخصص هر مربی.',
  },
  {
    path: '/gallery',
    title: 'گالری تصاویر | مهدکودک هدیه زنجان',
    description:
      'تصاویر محیط، کلاس‌ها، فعالیت‌ها و لحظه‌های کودکان در مهدکودک هدیه منظریه زنجان.',
  },
  {
    path: '/news',
    title: 'اخبار و اطلاعیه‌ها | مهدکودک هدیه زنجان',
    description: 'آخرین اخبار، رویدادها و اطلاعیه‌های مهدکودک هدیه زنجان برای والدین.',
  },
  {
    path: '/faq',
    title: 'سؤالات متداول والدین | مهدکودک هدیه زنجان',
    description:
      'پاسخ پرسش‌های متداول والدین درباره ثبت‌نام، برنامه‌ها و خدمات مهدکودک هدیه در زنجان.',
  },
  {
    path: '/contact',
    title: 'تماس با مهدکودک هدیه | آدرس و تلفن در منظریه زنجان',
    description:
      'تماس با مهدکودک هدیه در منظریه زنجان: آدرس دقیق، شماره تلفن و ساعات کاری. برای ثبت‌نام حضوری یا پرسش‌ها تماس بگیرید یا به مهدکودک مراجعه کنید.',
  },
  {
    path: '/registration',
    title: 'ثبت‌نام آنلاین مهدکودک در زنجان | مهدکودک هدیه',
    description:
      'درخواست ثبت‌نام کودک در مهدکودک هدیه زنجان را به‌صورت آنلاین و با یک فرم ساده ارسال کنید.',
  },
  {
    path: '/careers',
    title: 'فرصت‌های همکاری | مهدکودک هدیه زنجان',
    description:
      'درخواست همکاری با مهدکودک هدیه زنجان؛ رزومه خود را از طریق فرم آنلاین ارسال کنید.',
  },
];

// Pages that must never appear in search results.
export const noindexPrefixes = ['/admin'];

export const notFoundSeo = {
  title: `صفحه پیدا نشد | ${SITE_NAME}`,
  description: 'صفحه‌ای که دنبال آن بودید پیدا نشد.',
};

export const adminSeo = {
  title: `پنل مدیریت | ${SITE_NAME}`,
  description: 'پنل مدیریت مهدکودک هدیه.',
};

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname || '/';
}

export function isNoindexPath(pathname: string): boolean {
  const p = normalizePath(pathname);
  return noindexPrefixes.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
}

export function findRoute(pathname: string): RouteSeo | undefined {
  const p = normalizePath(pathname);
  return publicRoutes.find((r) => r.path === p);
}
