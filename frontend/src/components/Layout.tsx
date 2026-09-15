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
  children?: React.ReactNode;
}

const navItems = [
  { name: 'خانه', path: '/' },
  { name: 'درباره ما', path: '/about' },
  { name: 'برنامه‌ها', path: '/services' },
  { name: 'فعالیت‌ها', path: '/activities' },
  { name: 'مربیان', path: '/teachers' },
  { name: 'گالری', path: '/gallery' },
  { name: 'اخبار', path: '/news' },
  { name: 'سؤالات متداول', path: '/faq' },
  { name: 'تماس با ما', path: '/contact' },
];

const Layout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div
      dir="rtl"
      className="hedieh-paper flex min-h-screen flex-col"
    >
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        رفتن به محتوای اصلی
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border-light bg-warm-white/95 backdrop-blur-md">
        <div className="container-hedieh">
          <div className="flex h-[78px] items-center justify-between gap-6">
            {/* Logo */}
            <Link
              to="/"
              aria-label="کودکستان هدیه - صفحه اصلی"
              className="group flex shrink-0 items-center gap-3"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-[14px] bg-brand text-xl font-black text-white transition-transform duration-300 group-hover:-rotate-3">
                ه

                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full bg-yellow"
                />
              </div>

              <div>
                <div className="text-[17px] font-extrabold tracking-tight text-ink">
                  کودکستان هدیه
                </div>

                <div className="mt-0.5 hidden text-[11px] text-muted sm:block">
                  جایی برای رشد، بازی و کشف
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="منوی اصلی"
              className="hidden items-center gap-0.5 lg:flex"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    [
                      'relative rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors duration-200',
                      isActive
                        ? 'text-brand'
                        : 'text-muted hover:bg-brand-light/50 hover:text-ink',
                    ].join(' ')
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Registration */}
            <Link
              to="/registration"
              className="hidden items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md lg:flex"
            >
              ثبت‌نام
              <ArrowLeft size={16} />
            </Link>

            {/* Mobile button */}
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-ink transition hover:border-brand hover:text-brand lg:hidden"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              id="mobile-menu"
              className="border-t border-border-light py-4 lg:hidden"
            >
              <nav className="flex max-h-[calc(100vh-80px)] flex-col overflow-y-auto">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-4 py-3.5 text-sm font-semibold transition',
                        isActive
                          ? 'bg-brand-light text-brand'
                          : 'text-ink hover:bg-brand-light/50',
                      ].join(' ')
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                <Link
                  to="/registration"
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 font-bold text-white transition hover:bg-brand-dark"
                >
                  ثبت‌نام آنلاین
                  <ArrowLeft size={17} />
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white">
        <div className="container-hedieh py-14">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr]">
            {/* Brand */}
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-brand text-xl font-black text-white">
                  ه
                </div>

                <div>
                  <div className="font-extrabold text-ink">
                    کودکستان هدیه
                  </div>
                  <div className="text-xs text-muted">
                    جایی برای رشد، بازی و کشف
                  </div>
                </div>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-8 text-muted">
                فضایی امن و صمیمی برای اینکه کودکان بتوانند با آرامش
                یاد بگیرند، بازی کنند، تجربه کنند و خودشان را کشف کنند.
              </p>
            </div>

            {/* Links */}
            <div>
              <h2 className="text-sm font-extrabold text-ink">
                دسترسی سریع
              </h2>

              <div className="mt-5 grid gap-3">
                <Link
                  to="/about"
                  className="w-fit text-sm text-muted transition hover:text-brand"
                >
                  درباره ما
                </Link>

                <Link
                  to="/services"
                  className="w-fit text-sm text-muted transition hover:text-brand"
                >
                  برنامه‌ها
                </Link>

                <Link
                  to="/activities"
                  className="w-fit text-sm text-muted transition hover:text-brand"
                >
                  فعالیت‌ها
                </Link>

                <Link
                  to="/teachers"
                  className="w-fit text-sm text-muted transition hover:text-brand"
                >
                  مربیان
                </Link>

                <Link
                  to="/gallery"
                  className="w-fit text-sm text-muted transition hover:text-brand"
                >
                  گالری
                </Link>

                <Link
                  to="/registration"
                  className="w-fit text-sm font-bold text-brand transition hover:text-brand-dark"
                >
                  ثبت‌نام آنلاین
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-sm font-extrabold text-ink">
                با ما در ارتباط باشید
              </h2>

              <div className="mt-5 space-y-4">
                <a
                  href="tel:02112345678"
                  className="flex items-start gap-3 text-sm text-muted transition hover:text-brand"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                    <Phone size={16} />
                  </span>

                  <span>
                    <span className="block text-xs text-subtle">
                      تلفن
                    </span>

                    <span className="mt-1 block font-semibold text-ink">
                      ۰۲۱-۱۲۳۴۵۶۷۸
                    </span>
                  </span>
                </a>

                <a
                  href="mailto:info@hedieh-kindergarten.ir"
                  className="flex items-start gap-3 text-sm text-muted transition hover:text-brand"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                    <Mail size={16} />
                  </span>

                  <span>
                    <span className="block text-xs text-subtle">
                      ایمیل
                    </span>

                    <span className="mt-1 block break-all font-semibold text-ink">
                      info@hedieh-kindergarten.ir
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-3 text-sm text-muted">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                    <MapPin size={16} />
                  </span>

                  <span>
                    <span className="block text-xs text-subtle">
                      آدرس
                    </span>

                    <span className="mt-1 block font-semibold text-ink">
                      تهران، خیابان اصلی
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 flex flex-col gap-3 border-t border-border-light pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © ۱۴۰۵ کودکستان هدیه. تمامی حقوق محفوظ است.
            </p>

            <Link
              to="/contact"
              className="font-semibold text-brand transition hover:text-brand-dark"
            >
              با ما در ارتباط باشید
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;