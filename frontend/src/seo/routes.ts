// Single source of truth for page-level SEO.
// Used by the client (src/seo/RouteSeo.tsx) and by the build plugin
// (vite-seo-plugin.ts) that bakes the same tags into static HTML,
// the sitemap and robots.txt. Keep this file free of browser/Vite-only APIs.

export const SITE_NAME = 'مهدکودک هدیه';
export const SITE_ALT_NAME = 'کودکستان هدیه';
export const SITE_LOCALE = 'fa_IR';
export const LOGO_PATH = '/logo-hediyeh.png';
export const LOGO_SIZE = 512;

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
}

// Indexable public pages. Order = order in sitemap.xml.
export const publicRoutes: RouteSeo[] = [
  {
    path: '/',
    title: 'مهدکودک هدیه | کودکستان و پیش‌دبستانی؛ جایی برای رشد، بازی و کشف',
    description:
      'مهدکودک هدیه؛ کودکستان و پیش‌دبستانی با محیطی امن و شاد برای رشد، بازی و یادگیری کودکان. برنامه‌ها، مربیان و ثبت‌نام آنلاین.',
  },
  {
    path: '/about',
    title: 'درباره مهدکودک هدیه | رویکرد و ارزش‌ها',
    description:
      'با رویکرد آموزشی، ارزش‌ها و فضای مهدکودک هدیه آشنا شوید؛ محیطی امن و شاد برای رشد کودکان.',
  },
  {
    path: '/services',
    title: 'برنامه‌ها و خدمات آموزشی | مهدکودک هدیه',
    description:
      'آشنایی با برنامه‌ها و خدمات آموزشی و مراقبتی مهدکودک هدیه برای کودکان.',
  },
  {
    path: '/activities',
    title: 'کلاس‌ها و فعالیت‌های کودکان | مهدکودک هدیه',
    description:
      'فعالیت‌های آموزشی، هنری و بازی کودکان در مهدکودک هدیه به تفکیک گروه سنی.',
  },
  {
    path: '/teachers',
    title: 'مربیان و تیم آموزشی | مهدکودک هدیه',
    description:
      'آشنایی با مربیان و تیم آموزشی مهدکودک هدیه، تحصیلات و تخصص هر مربی.',
  },
  {
    path: '/gallery',
    title: 'گالری تصاویر | مهدکودک هدیه',
    description:
      'تصاویر محیط، کلاس‌ها، فعالیت‌ها و لحظه‌های روزمره کودکان در مهدکودک هدیه.',
  },
  {
    path: '/news',
    title: 'اخبار و اطلاعیه‌ها | مهدکودک هدیه',
    description: 'آخرین اخبار، رویدادها و اطلاعیه‌های مهدکودک هدیه برای والدین.',
  },
  {
    path: '/faq',
    title: 'سؤالات متداول والدین | مهدکودک هدیه',
    description:
      'پاسخ پرسش‌های متداول والدین درباره ثبت‌نام، برنامه‌ها و خدمات مهدکودک هدیه.',
  },
  {
    path: '/contact',
    title: 'تماس با ما | مهدکودک هدیه',
    description:
      'راه‌های ارتباط با مهدکودک هدیه، ساعت کاری و فرم ارسال پیام برای والدین.',
  },
  {
    path: '/registration',
    title: 'ثبت‌نام آنلاین کودک | مهدکودک هدیه',
    description:
      'درخواست ثبت‌نام کودک در مهدکودک هدیه را به‌صورت آنلاین و با یک فرم ساده ارسال کنید.',
  },
  {
    path: '/careers',
    title: 'فرصت‌های همکاری | مهدکودک هدیه',
    description:
      'درخواست همکاری با مهدکودک هدیه؛ رزومه خود را از طریق فرم آنلاین ارسال کنید.',
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
