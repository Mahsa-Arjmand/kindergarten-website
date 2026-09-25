import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';

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
  { label: 'تماس با ما', path: '/contact' },
];

const pageMeta: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  '/': {
    title: 'مهدکودک هدیه | جایی برای رشد، بازی و کشف',
    description:
      'مهدکودک هدیه؛ محیطی برای رشد، بازی، یادگیری و تجربه‌های شیرین کودکان.',
  },
  '/about': {
    title: 'درباره مهدکودک هدیه',
    description:
      'با رویکرد، ارزش‌ها و فضای مهدکودک هدیه بیشتر آشنا شوید.',
  },
  '/services': {
    title: 'برنامه‌ها و خدمات | مهدکودک هدیه',
    description:
      'آشنایی با برنامه‌ها و خدمات مهدکودک هدیه برای کودکان و خانواده‌ها.',
  },
  '/activities': {
    title: 'فعالیت‌ها | مهدکودک هدیه',
    description:
      'فعالیت‌ها و تجربه‌های آموزشی، هنری، بازی و خلاقیت در مهدکودک هدیه.',
  },
  '/teachers': {
    title: 'مربیان | مهدکودک هدیه',
    description:
      'آشنایی با مربیان و تیم آموزشی مهدکودک هدیه.',
  },
  '/gallery': {
    title: 'گالری تصاویر | مهدکودک هدیه',
    description:
      'تصاویر محیط، فعالیت‌ها و لحظات روزمره مهدکودک هدیه.',
  },
  '/news': {
    title: 'اخبار و مطالب | مهدکودک هدیه',
    description:
      'آخرین اخبار، مطالب و اطلاعیه‌های مهدکودک هدیه.',
  },
  '/faq': {
    title: 'سؤالات متداول | مهدکودک هدیه',
    description:
      'پاسخ پرسش‌های متداول والدین درباره مهدکودک هدیه.',
  },
  '/contact': {
    title: 'تماس با ما | مهدکودک هدیه',
    description:
      'راه‌های ارتباطی و اطلاعات تماس مهدکودک هدیه.',
  },
  '/registration': {
    title: 'ثبت‌نام | مهدکودک هدیه',
    description:
      'فرم درخواست ثبت‌نام و اطلاعات مربوط به پذیرش در مهدکودک هدیه.',
  },
  '/careers': {
    title: 'فرصت‌های همکاری | مهدکودک هدیه',
    description:
      'فرم ارسال درخواست همکاری با مهدکودک هدیه.',
  },
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const meta =
      pageMeta[location.pathname] ?? pageMeta['/'];

    document.title = meta.title;

    document.documentElement.lang = 'fa';
    document.documentElement.dir = 'rtl';

    let description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }

    description.content = meta.description;

    let themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );

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
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-cream text-ink"
    >
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only fixed right-4 top-4 z-[100] rounded-lg bg-brand px-4 py-3 text-sm font-bold text-white focus:not-sr-only focus:outline-none focus:ring-4 focus:ring-brand-light"
      >
        رفتن به محتوای اصلی
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border-light bg-cream/95 backdrop-blur-md">
        <div className="container-hedieh">
          <div className="flex min-h-[72px] items-center justify-between gap-4">
            {/* Brand */}
            <Link
              to="/"
              aria-label="صفحه اصلی مهدکودک هدیه"
              className="group flex shrink-0 items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-black text-white shadow-sm transition-transform duration-200 group-hover:-rotate-2"
              >
                ه
                <span className="absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full bg-yellow" />
              </span>

              <span className="hidden sm:block">
                <span className="block text-base font-black tracking-tight text-ink">
                  مهدکودک هدیه
                </span>

                <span className="mt-0.5 block text-xs font-medium text-muted">
                  جایی برای رشد، بازی و کشف
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="منوی اصلی"
              className="hidden xl:flex xl:items-center xl:gap-1"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light',
                      isActive
                        ? 'font-bold text-brand'
                        : 'text-muted hover:bg-brand-light/50 hover:text-ink',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              to="/registration"
              className="hidden min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light xl:inline-flex"
            >
              ثبت‌نام
              <ArrowLeft
                size={17}
                aria-hidden="true"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={
                menuOpen ? 'بستن منوی اصلی' : 'باز کردن منوی اصلی'
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-ink transition-colors duration-200 hover:bg-brand-light/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light xl:hidden"
            >
              {menuOpen ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div
              id="mobile-navigation"
              className="border-t border-border-light py-4 xl:hidden"
            >
              <nav
                aria-label="منوی موبایل"
                className="flex flex-col gap-1"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200',
                        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light',
                        isActive
                          ? 'bg-brand-light font-bold text-brand'
                          : 'text-muted hover:bg-brand-light/50 hover:text-ink',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <Link
                  to="/registration"
                  className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
                >
                  ثبت‌نام آنلاین
                  <ArrowLeft
                    size={17}
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to="/admin/login"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-brand-light/50 hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
                >
                  ورود مدیر
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-warm-white">
        <div className="container-hedieh py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                aria-label="صفحه اصلی مهدکودک هدیه"
                className="inline-flex items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-black text-white"
                >
                  ه
                </span>

                <span>
                  <span className="block text-base font-black text-ink">
                    مهدکودک هدیه
                  </span>

                  <span className="mt-1 block text-xs font-medium text-muted">
                    جایی برای رشد، بازی و کشف
                  </span>
                </span>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-8 text-muted">
                فضایی گرم و امن برای تجربه‌های تازه، بازی، یادگیری
                و رشد همه‌جانبه کودکان.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-sm font-black text-ink">
                دسترسی سریع
              </h2>

              <nav
                aria-label="لینک‌های سریع"
                className="mt-4 flex flex-col gap-3"
              >
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
                    className="w-fit text-sm text-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-sm font-black text-ink">
                ارتباط با ما
              </h2>

              <div className="mt-4 space-y-4 text-sm text-muted">
                <a
                  href="tel:+982100000000"
                  className="flex items-start gap-3 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  aria-label="تماس تلفنی با مهدکودک هدیه"
                >
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span dir="ltr">021-00000000</span>
                </a>

                <a
                  href="mailto:info@hedieh-kindergarten.ir"
                  className="flex items-start gap-3 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  aria-label="ارسال ایمیل به مهدکودک هدیه"
                >
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span dir="ltr">
                    info@hedieh-kindergarten.ir
                  </span>
                </a>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    آدرس مهدکودک در این بخش قرار می‌گیرد.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border-light">
          <div className="container-hedieh flex min-h-16 flex-col items-center justify-between gap-3 py-4 text-center text-xs text-subtle sm:flex-row sm:text-right">
            <p>
              © {new Date().getFullYear()} مهدکودک هدیه. تمامی
              حقوق محفوظ است.
            </p>

            <div className="flex items-center gap-4">
              <Link
                to="/contact"
                className="font-medium transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                ارتباط با ما
              </Link>
              <Link
                to="/admin/login"
                className="font-medium text-subtle transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                ورود مدیر
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;