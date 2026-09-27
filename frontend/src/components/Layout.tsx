import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

// ——— Grouped navigation ———
// Fewer top-level items, like hbsmartfactory: 5 visible + 1 CTA
// Keeps orange, but calm & spacious
type NavChild = { label: string; path: string; desc?: string };
type NavGroup = { label: string; path?: string; children?: NavChild[] };

const navGroups: NavGroup[] = [
  { label: 'خانه', path: '/' },
  {
    label: 'درباره ما',
    children: [
      { label: 'درباره مهدکودک', path: '/about', desc: 'رویکرد و ارزش‌ها' },
      { label: 'مربیان', path: '/teachers', desc: 'تیم آموزشی' },
    ],
  },
  {
    label: 'برنامه‌ها',
    children: [
      { label: 'برنامه‌های آموزشی', path: '/services', desc: 'خدمات و برنامه‌ها' },
      { label: 'فعالیت‌ها', path: '/activities', desc: 'بازی و تجربه' },
      { label: 'گالری', path: '/gallery', desc: 'لحظه‌های هدیه' },
    ],
  },
  {
    label: 'برای والدین',
    children: [
      { label: 'اخبار', path: '/news', desc: 'اطلاعیه‌ها' },
      { label: 'سؤالات متداول', path: '/faq', desc: 'پاسخ پرسش‌ها' },
      { label: 'تماس با ما', path: '/contact', desc: 'ارتباط مستقیم' },
    ],
  },
  { label: 'فرصت همکاری', path: '/careers' },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'مهدکودک هدیه | جایی برای رشد، بازی و کشف', description: 'مهدکودک هدیه؛ محیطی برای رشد، بازی، یادگیری و تجربه‌های شیرین کودکان.' },
  '/about': { title: 'درباره مهدکودک هدیه', description: 'با رویکرد، ارزش‌ها و فضای مهدکودک هدیه بیشتر آشنا شوید.' },
  '/services': { title: 'برنامه‌ها و خدمات | مهدکودک هدیه', description: 'آشنایی با برنامه‌ها و خدمات مهدکودک هدیه.' },
  '/activities': { title: 'فعالیت‌ها | مهدکودک هدیه', description: 'فعالیت‌ها و تجربه‌های آموزشی، هنری و بازی در مهدکودک هدیه.' },
  '/teachers': { title: 'مربیان | مهدکودک هدیه', description: 'آشنایی با مربیان و تیم آموزشی مهدکودک هدیه.' },
  '/gallery': { title: 'گالری تصاویر | مهدکودک هدیه', description: 'تصاویر محیط، فعالیت‌ها و لحظات روزمره مهدکودک هدیه.' },
  '/news': { title: 'اخبار و مطالب | مهدکودک هدیه', description: 'آخرین اخبار و اطلاعیه‌های مهدکودک هدیه.' },
  '/faq': { title: 'سؤالات متداول | مهدکودک هدیه', description: 'پاسخ پرسش‌های متداول والدین درباره مهدکودک هدیه.' },
  '/contact': { title: 'تماس با ما | مهدکودک هدیه', description: 'راه‌های ارتباطی و اطلاعات تماس مهدکودک هدیه.' },
  '/registration': { title: 'ثبت‌نام | مهدکودک هدیه', description: 'فرم درخواست ثبت‌نام و اطلاعات مربوط به پذیرش در مهدکودک هدیه.' },
  '/careers': { title: 'فرصت‌های همکاری | مهدکودک هدیه', description: 'فرم ارسال درخواست همکاری با مهدکودک هدیه.' },
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const closeTimeout = useRef<number | null>(null);

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
    themeColor.content = '#fdfcfa';
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
    setMobileOpenGroup(null);
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
        setOpenGroup(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleEnter = (label: string) => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    setOpenGroup(label);
  };
  const handleLeave = () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => setOpenGroup(null), 120);
  };

  const isGroupActive = (group: NavGroup) => {
    if (group.path && location.pathname === group.path) return true;
    if (group.children) return group.children.some((c) => location.pathname === c.path);
    return false;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-cream text-ink antialiased">
      <a href="#main-content" className="sr-only fixed right-4 top-4 z-[100] rounded-lg bg-ink px-4 py-3 text-sm font-medium text-white focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-brand-light">
        رفتن به محتوای اصلی
      </a>

      {/* Header — CLEAN, SPACIOUS, like hbsmartfactory but warm orange */}
      <header className="sticky top-0 z-50 border-b border-border-light bg-white">
        <div className="container-hedieh">
          <div className="flex h-[68px] items-center justify-between gap-6">
            {/* Logo */}
            {/* Logo — real happy logo, compatible with colorful theme */}
            <Link to="/" aria-label="صفحه اصلی مهدکودک هدیه" className="flex shrink-0 items-center gap-2.5">
              <img
                src="/logo-hediyeh.jpg"
                alt="مهدکودک هدیه - کودکستان و پیش‌دبستانی"
                className="h-11 w-auto object-contain sm:h-[52px]"
                width={200}
                height={80}
                loading="eager"
                decoding="async"
              />
              <span className="hidden lg:block">
                <span className="block text-[14px] font-bold leading-none tracking-tight text-ink">مهدکودک هدیه</span>
                <span className="mt-1 block text-[10px] font-medium tracking-[0.08em] text-subtle">کودکستان و پیش‌دبستانی</span>
              </span>
            </Link>

            {/* Mobile center — move kicker to navbar center on mobile */}
            <div className="flex flex-1 justify-center px-2 xl:hidden">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-pink-100 bg-white px-2.5 py-1 text-[10px] font-bold leading-none text-brand shadow-sm sm:px-3 sm:text-[11px]">
                کودکستان و پیش‌دبستانی هدیه
                <span className="hidden sm:inline font-medium text-subtle">• از ۱۳۹۲</span>
              </span>
            </div>

            {/* Desktop Nav — grouped, calm */}
            <nav aria-label="منوی اصلی" className="hidden items-center gap-1 xl:flex">
              {navGroups.map((group) => {
                const hasChildren = !!group.children?.length;
                const active = isGroupActive(group);

                if (!hasChildren) {
                  return (
                    <NavLink
                      key={group.label}
                      to={group.path!}
                      className={[
                        'relative px-3 py-[24px] text-[13.5px] font-medium tracking-wide transition-colors',
                        'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-brand after:transition-all after:duration-300',
                        active ? 'text-ink after:opacity-100' : 'text-muted after:opacity-0 hover:text-ink hover:after:opacity-100',
                      ].join(' ')}
                    >
                      {group.label}
                    </NavLink>
                  );
                }

                const isOpen = openGroup === group.label;

                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => handleEnter(group.label)}
                    onMouseLeave={handleLeave}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenGroup(isOpen ? null : group.label)}
                      className={[
                        'inline-flex items-center gap-1.5 px-3 py-[24px] text-[13.5px] font-medium tracking-wide transition-colors',
                        'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-brand after:transition-all after:duration-300',
                        active || isOpen ? 'text-ink after:opacity-100' : 'text-muted after:opacity-0 hover:text-ink hover:after:opacity-100',
                      ].join(' ')}
                    >
                      {group.label}
                      <ChevronDown size={14} className={['transition-transform duration-200', isOpen ? 'rotate-180' : ''].join(' ')} aria-hidden="true" />
                    </button>

                    {/* Dropdown — lightweight, friendly, NOT enterprise mega */}
                    <div
                      className={[
                        'absolute right-0 top-full z-20 w-[300px] pt-2 transition-all duration-200',
                        isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
                      ].join(' ')}
                      onMouseEnter={() => handleEnter(group.label)}
                      onMouseLeave={handleLeave}
                    >
                      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_32px_rgba(31,26,23,0.08)]">
                        <div className="p-1.5">
                          {group.children!.map((child) => {
                            const childActive = location.pathname === child.path;
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={() => setOpenGroup(null)}
                                className={[
                                  'flex items-center justify-between rounded-xl px-3 py-3 transition',
                                  childActive ? 'bg-brand-light text-ink' : 'hover:bg-cream text-ink',
                                ].join(' ')}
                              >
                                <span>
                                  <span className={['block text-[14px] leading-none', childActive ? 'font-bold' : 'font-medium'].join(' ')}>{child.label}</span>
                                  {child.desc && <span className="mt-1 block text-[12px] font-normal text-muted">{child.desc}</span>}
                                </span>
                                <ArrowLeft size={14} className={childActive ? 'text-brand' : 'text-subtle'} aria-hidden="true" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Link
                to="/registration"
                style={{ color: '#fff' }}
                className="hidden min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand px-5 text-[13.5px] font-bold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light xl:inline-flex"
              >
                ثبت‌نام
                <ArrowLeft size={14} aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((c) => !c)}
                aria-label={menuOpen ? 'بستن منوی اصلی' : 'باز کردن منوی اصلی'}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className="inline-flex h-9 w-9 items-center justify-center border border-border bg-white text-ink transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand xl:hidden"
              >
                {menuOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile — hierarchical, not wall of links */}
          {menuOpen && (
            <div id="mobile-navigation" className="border-t border-border-light py-3 xl:hidden">
              <nav aria-label="منوی موبایل" className="flex flex-col">
                {navGroups.map((group) => {
                  const hasChildren = !!group.children?.length;
                  if (!hasChildren) {
                    return (
                      <NavLink
                        key={group.label}
                        to={group.path!}
                        className={({ isActive }) =>
                          [
                            'flex items-center justify-between border-b border-border-light px-1 py-3.5 text-[14px] font-medium last:border-0',
                            isActive ? 'text-ink' : 'text-muted',
                          ].join(' ')
                        }
                      >
                        {group.label}
                      </NavLink>
                    );
                  }
                  const isMobileOpen = mobileOpenGroup === group.label;
                  const active = isGroupActive(group);
                  return (
                    <div key={group.label} className="border-b border-border-light last:border-0">
                      <button
                        type="button"
                        onClick={() => setMobileOpenGroup(isMobileOpen ? null : group.label)}
                        aria-expanded={isMobileOpen}
                        className={[
                          'flex w-full items-center justify-between px-1 py-3.5 text-right text-[14px] font-medium',
                          active || isMobileOpen ? 'text-ink' : 'text-muted',
                        ].join(' ')}
                      >
                        <span>{group.label}</span>
                        <ChevronDown size={16} className={['text-subtle transition-transform', isMobileOpen ? 'rotate-180' : ''].join(' ')} aria-hidden="true" />
                      </button>
                      <div className={['grid transition-all', isMobileOpen ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'].join(' ')}>
                        <div className="overflow-hidden">
                          <div className="mr-2 space-y-1 border-r-2 border-border-light pr-3">
                            {group.children!.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={[
                                  'flex items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px]',
                                  location.pathname === child.path ? 'bg-brand-light font-bold text-ink' : 'text-muted hover:bg-cream hover:text-ink',
                                ].join(' ')}
                              >
                                <span>{child.label}</span>
                                <ArrowLeft size={14} className="text-subtle" aria-hidden="true" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Link
                  to="/registration"
                  style={{ color: '#fff' }}
                  className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-sm hover:bg-brand-dark"
                >
                  ثبت‌نام آنلاین
                  <ArrowLeft size={16} aria-hidden="true" />
                </Link>
                <Link to="/admin/login" className="mt-2 inline-flex justify-center py-3 text-sm font-medium text-subtle hover:text-ink">
                  ورود مدیر
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="border-t border-border bg-white">
        <div className="container-hedieh py-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Link to="/" aria-label="صفحه اصلی مهدکودک هدیه" className="inline-flex items-center gap-3">
                <img src="/logo-hediyeh.jpg" alt="مهدکودک هدیه" className="h-12 w-auto object-contain" width={160} height={64} loading="lazy" />
                <span className="hidden sm:block">
                  <span className="block text-[14px] font-bold tracking-tight text-ink">مهدکودک هدیه</span>
                  <span className="mt-1 block text-[10px] font-medium tracking-[0.08em] text-subtle">کودکستان و پیش‌دبستانی</span>
                </span>
              </Link>
              <p className="mt-4 max-w-md text-[13.5px] leading-7 text-muted">
                فضایی گرم و امن برای تجربه‌های تازه، بازی، یادگیری و رشد همه‌جانبه کودکان.
              </p>
            </div>

            <div>
              <h2 className="text-[11px] font-bold tracking-[0.12em] text-subtle">دسترسی سریع</h2>
              <nav aria-label="لینک‌های سریع" className="mt-4 flex flex-col gap-2.5">
                {[
                  { label: 'درباره ما', path: '/about' },
                  { label: 'برنامه‌ها', path: '/services' },
                  { label: 'مربیان', path: '/teachers' },
                  { label: 'گالری', path: '/gallery' },
                  { label: 'سؤالات متداول', path: '/faq' },
                ].map((item) => (
                  <Link key={item.path} to={item.path} className="w-fit text-[13.5px] text-muted transition hover:text-ink">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-[11px] font-bold tracking-[0.12em] text-subtle">ارتباط با ما</h2>
              <div className="mt-4 space-y-3 text-[13.5px] text-muted">
                <a href="tel:+982100000000" className="flex items-start gap-2.5 transition hover:text-ink" aria-label="تماس تلفنی با مهدکودک هدیه">
                  <Phone size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span dir="ltr">021-00000000</span>
                </a>
                <a href="mailto:info@hedieh-kindergarten.ir" className="flex items-start gap-2.5 transition hover:text-ink" aria-label="ارسال ایمیل به مهدکودک هدیه">
                  <Mail size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span dir="ltr">info@hedieh-kindergarten.ir</span>
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>آدرس مهدکودک در این بخش قرار می‌گیرد.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-light">
          <div className="container-hedieh flex min-h-14 flex-col items-center justify-between gap-2 py-4 text-center text-[11px] tracking-wide text-subtle sm:flex-row sm:text-right">
            <p>© {new Date().getFullYear()} مهدکودک هدیه. تمامی حقوق محفوظ است.</p>
            <div className="flex items-center gap-6">
              <Link to="/contact" className="font-medium transition hover:text-ink">
                ارتباط با ما
              </Link>
              <Link to="/admin/login" className="font-medium transition hover:text-ink">
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
