import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Menu, Phone, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'خانه', path: '/' },
  { label: 'درباره ما', path: '/about' },
  { label: 'برنامه‌ها', path: '/services' },
  { label: 'فعالیت‌ها', path: '/activities' },
  { label: 'مربیان', path: '/teachers' },
  { label: 'گالری', path: '/gallery' },
  { label: 'اخبار', path: '/news' },
  { label: 'سؤالات متداول', path: '/faq' },
  { label: 'فرصت همکاری', path: '/careers' },
  { label: 'تماس با ما', path: '/contact' },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'مهدکودک هدیه | جایی برای رشد، بازی و کشف',
    description: 'مهدکودک هدیه؛ محیطی برای رشد، بازی، یادگیری و تجربه‌های شیرین کودکان.',
  },
  '/about': {
    title: 'درباره مهدکودک هدیه',
    description: 'با رویکرد، ارزش‌ها و فضای مهدکودک هدیه بیشتر آشنا شوید.',
  },
  '/services': {
    title: 'برنامه‌ها و خدمات | مهدکودک هدیه',
    description: 'آشنایی با برنامه‌ها و خدمات مهدکودک هدیه برای کودکان و خانواده‌ها.',
  },
  '/activities': {
    title: 'فعالیت‌ها | مهدکودک هدیه',
    description: 'فعالیت‌ها و تجربه‌های آموزشی، هنری، بازی و خلاقیت در مهدکودک هدیه.',
  },
  '/teachers': {
    title: 'مربیان | مهدکودک هدیه',
    description: 'آشنایی با مربیان و تیم آموزشی مهدکودک هدیه.',
  },
  '/gallery': {
    title: 'گالری تصاویر | مهدکودک هدیه',
    description: 'تصاویر محیط، فعالیت‌ها و لحظات روزمره مهدکودک هدیه.',
  },
  '/news': {
    title: 'اخبار و مطالب | مهدکودک هدیه',
    description: 'آخرین اخبار، مطالب و اطلاعیه‌های مهدکودک هدیه.',
  },
  '/faq': {
    title: 'سؤالات متداول | مهدکودک هدیه',
    description: 'پاسخ پرسش‌های متداول والدین درباره مهدکودک هدیه.',
  },
  '/contact': {
    title: 'تماس با ما | مهدکودک هدیه',
    description: 'راه‌های ارتباطی و اطلاعات تماس مهدکودک هدیه.',
  },
  '/registration': {
    title: 'ثبت‌نام | مهدکودک هدیه',
    description: 'فرم درخواست ثبت‌نام و اطلاعات مربوط به پذیرش در مهدکودک هدیه.',
  },
  '/careers': {
    title: 'فرصت‌های همکاری | مهدکودک هدیه',
    description: 'فرم ارسال درخواست همکاری با مهدکودک هدیه.',
  },
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const meta = pageMeta[location.pathname] ?? pageMeta['/'];
    document.title = meta.title;
    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = meta.description;

    let themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      document.head.appendChild(themeColor);
    }
    themeColor.content = '#fffaf4';
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div dir="rtl" className="min-h-screen bg-cream text-ink antialiased">
      <a
        href="#main-content"
        className="sr-only fixed right-4 top-4 z-[100] rounded-lg bg-brand px-4 py-3 text-sm font-bold text-white focus:not-sr-only focus:outline-none focus:ring-4 focus:ring-brand-light"
      >
        رفتن به محتوای اصلی
      </a>

      {/* Header - tighter, calmer */}
      <header className="sticky top-0 z-50 border-b border-border-light bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/85">
        <div className="container-hedieh">
          <div className="flex min-h-[64px] items-center justify-between gap-4">
            <Link to="/" aria-label="صفحه اصلی مهدکودک هدیه" className="flex shrink-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-[16px] font-black text-white shadow-sm"
              >
                ه
                <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-yellow" />
              </span>
              <span className="hidden sm:block">
                <span className="block text-[14.5px] font-black leading-none tracking-tight text-ink">مهدکودک هدیه</span>
                <span className="mt-1 block text-[11px] font-medium tracking-wide text-muted">جایی برای رشد، بازی و کشف</span>
              </span>
            </Link>

            <nav aria-label="منوی اصلی" className="hidden items-center gap-0.5 xl:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light',
                      isActive ? 'bg-white font-bold text-brand-dark shadow-sm ring-1 ring-border' : 'text-muted hover:bg-white hover:text-ink',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/registration"
                className="hidden min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-border bg-white px-5 text-[13.5px] font-bold text-ink shadow-sm transition hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light xl:inline-flex"
              >
                ثبت‌نام
                <ArrowLeft size={15} aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((c) => !c)}
                aria-label={menuOpen ? 'بستن منوی اصلی' : 'باز کردن منوی اصلی'}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-ink shadow-sm transition hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light xl:hidden"
              >
                {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div id="mobile-navigation" className="border-t border-border-light py-3 xl:hidden">
              <nav aria-label="منوی موبایل" className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-4 py-3 text-[14px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light',
                        isActive ? 'bg-white font-bold text-brand-dark shadow-sm ring-1 ring-border' : 'text-muted hover:bg-white hover:text-ink',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/registration"
                  className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-sm font-bold text-ink shadow-sm hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
                >
                  ثبت‌نام آنلاین
                  <ArrowLeft size={17} aria-hidden="true" />
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="border-t border-border bg-warm-white">
        <div className="container-hedieh py-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link to="/" aria-label="صفحه اصلی مهدکودک هدیه" className="inline-flex items-center gap-3">
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-[16px] font-black text-white">
                  ه
                </span>
                <span>
                  <span className="block text-[14.5px] font-black text-ink">مهدکودک هدیه</span>
                  <span className="mt-1 block text-[11px] font-medium text-muted">جایی برای رشد، بازی و کشف</span>
                </span>
              </Link>
              <p className="mt-4 max-w-md text-[13.5px] leading-7 text-muted">
                فضایی گرم و امن برای تجربه‌های تازه، بازی، یادگیری و رشد همه‌جانبه کودکان.
              </p>
            </div>

            <div>
              <h2 className="text-[13px] font-black tracking-wide text-ink">دسترسی سریع</h2>
              <nav aria-label="لینک‌های سریع" className="mt-3 flex flex-col gap-2.5">
                {[
                  { label: 'درباره ما', path: '/about' },
                  { label: 'برنامه‌ها', path: '/services' },
                  { label: 'مربیان', path: '/teachers' },
                  { label: 'گالری', path: '/gallery' },
                  { label: 'سؤالات متداول', path: '/faq' },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="w-fit text-[13.5px] text-muted transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-[13px] font-black tracking-wide text-ink">ارتباط با ما</h2>
              <div className="mt-3 space-y-3 text-[13.5px] text-muted">
                <a
                  href="tel:+982100000000"
                  className="flex items-start gap-2.5 transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  aria-label="تماس تلفنی با مهدکودک هدیه"
                >
                  <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span dir="ltr">021-00000000</span>
                </a>
                <a
                  href="mailto:info@hedieh-kindergarten.ir"
                  className="flex items-start gap-2.5 transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  aria-label="ارسال ایمیل به مهدکودک هدیه"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span dir="ltr">info@hedieh-kindergarten.ir</span>
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>آدرس مهدکودک در این بخش قرار می‌گیرد.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-light">
          <div className="container-hedieh flex min-h-14 flex-col items-center justify-between gap-2 py-4 text-center text-[12px] text-subtle sm:flex-row sm:text-right">
            <p>© {new Date().getFullYear()} مهدکودک هدیه. تمامی حقوق محفوظ است.</p>
            <Link
              to="/contact"
              className="font-medium transition hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              ارتباط با ما
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
