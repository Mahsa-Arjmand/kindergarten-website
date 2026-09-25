import { ArrowLeft, BookOpen, Heart, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const values = [
  {
    icon: Heart,
    number: '۰۱',
    title: 'احترام به فردیت',
    description: 'هر کودک مسیر رشد و علایق خودش را دارد — ما برای این تفاوت‌ها ارزش قائلیم.',
  },
  {
    icon: ShieldCheck,
    number: '۰۲',
    title: 'امنیت و آرامش',
    description: 'محیطی امن و قابل اعتماد می‌سازیم تا کودک با آرامش تجربه و یادگیری کند.',
  },
  {
    icon: BookOpen,
    number: '۰۳',
    title: 'یادگیری باکیفیت',
    description: 'یادگیری را به تجربه‌ای جذاب و متناسب با مرحله رشد کودک تبدیل می‌کنیم.',
  },
  {
    icon: Users,
    number: '۰۴',
    title: 'همراهی با خانواده',
    description: 'ارتباط سازنده با والدین را بخشی از مسیر رشد کودک می‌دانیم.',
  },
];

const About = () => {
  useEffect(() => {
    document.title = 'درباره ما - مهدکودک هدیه';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'آشنایی با مهدکودک هدیه - بیش از ۱۰ سال تجربه در آموزش کودکان با محیطی امن و شاد');
  }, []);

  return (
    <main className="bg-cream">
      {/* Intro - exactly like Home hero, no blobs */}
      <section className="bg-cream">
        <div className="container-hedieh grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.85fr] lg:gap-14 lg:py-12">
          <div>
            <p className="section-kicker">درباره مهدکودک هدیه</p>
            <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
              جایی که
              <span className="text-brand-dark"> کودکی کردن</span> را جدی می‌گیریم.
            </h1>
            <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-muted sm:text-[16px]">
              با بیش از ۱۰ سال تجربه، محیطی امن، آرام و پویا برای رشد کودکان ساخته‌ایم — جایی که هر کودک دیده می‌شود و تفاوت‌هایش محترم است.
            </p>
            <Link
              to="/registration"
              style={{ color: '#000' }}
              className="mt-7 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 text-[14px] font-bold !text-ink shadow-sm transition hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
            >
              آشنایی و ثبت‌نام
              <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="mx-auto w-full max-w-[480px]">
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_16px_40px_rgba(31,26,23,0.07)]">
              <div className="aspect-[4/3.2] w-full bg-sage-light" />
            </div>
            <div className="mx-auto -mt-6 flex w-fit items-center gap-3 rounded-full border border-border bg-white px-4 py-2 shadow-sm">
              <span className="text-[18px] font-black text-brand-dark">۱۰+</span>
              <span className="text-[13px] font-bold text-ink">سال تجربه همراه خانواده‌ها</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy - like Home About, tight */}
      <section className="bg-white py-10 lg:py-12">
        <div className="container-hedieh grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div>
            <p className="section-kicker">نگاه ما</p>
            <h2 className="max-w-[380px] text-balance text-[26px] font-black leading-[1.45] tracking-tight text-ink sm:text-[30px]">
              کودکی، فقط آماده شدن برای آینده نیست.
            </h2>
          </div>
          <div className="max-w-[580px]">
            <p className="text-[16px] font-bold leading-8 text-ink">
              سال‌های کودکی ارزشمندند — کودک باید فرصت بازی، پرسیدن، اشتباه کردن و لذت بردن از دنیا را داشته باشد.
            </p>
            <p className="mt-3 text-[15px] leading-8 text-muted">
              رویکرد ما بر احترام به فردیت، امنیت عاطفی، مهارت‌های اجتماعی و فرصت‌های خلاقانه بنا شده است — نه حفظ کردن و رقابت.
            </p>
          </div>
        </div>
      </section>

      {/* Values - same cards as Home Why */}
      <section className="bg-sage-light/60 py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mb-5 max-w-[520px]">
            <p className="section-kicker">ارزش‌های ما</p>
            <h2 className="section-title">چیزهایی که برای ما مهم است</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.number} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-bold text-subtle">{v.number}</span>
                  </div>
                  <h3 className="mt-4 text-[15px] font-extrabold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-7 text-muted">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision - centered, no border-y gap mess */}
      <section className="bg-cream py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mx-auto max-w-[720px] rounded-2xl border border-border bg-white px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
            <p className="section-kicker justify-center">چشم‌انداز ما</p>
            <h2 className="mx-auto mt-2 max-w-[600px] text-balance text-[22px] font-black leading-[1.6] text-ink sm:text-[26px]">
              محیطی که هر کودک احساس کند دیده می‌شود، شنیده می‌شود و فرصت رشد دارد.
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-7 text-muted">
              می‌خواهیم خانواده‌ها سال‌های حساس کودکی را با اطمینان به ما بسپارند — با آموزش باکیفیت و ارتباط انسانی.
            </p>
          </div>
        </div>
      </section>

      {/* CTA - same as Home */}
      <section className="bg-white py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-brand-dark px-6 py-8 text-white sm:px-8 sm:py-10">
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[13px] font-bold tracking-wide text-white/70">مهدکودک هدیه</p>
                <h2 className="mt-2 text-[22px] font-black leading-[1.5] sm:text-[26px]">دوست دارید فضای هدیه را از نزدیک ببینید؟</h2>
              </div>
              <Link
                to="/contact"
                style={{ color: '#000' }}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[14px] font-extrabold !text-ink shadow-sm transition hover:bg-cream focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                با ما در تماس باشید
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
