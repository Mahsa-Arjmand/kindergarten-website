import { ArrowLeft, BookOpen, Heart, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const values = [
  { icon: Heart, number: '۰۱', title: 'احترام به فردیت', description: 'هر کودک مسیر رشد و علایق خودش را دارد — ما برای این تفاوت‌ها ارزش قائلیم.', color: 'bg-brand-light text-brand' },
  { icon: ShieldCheck, number: '۰۲', title: 'امنیت و آرامش', description: 'محیطی امن و قابل اعتماد می‌سازیم تا کودک با آرامش تجربه و یادگیری کند.', color: 'bg-blue-light text-blue' },
  { icon: BookOpen, number: '۰۳', title: 'یادگیری باکیفیت', description: 'یادگیری را به تجربه‌ای جذاب و متناسب با مرحله رشد کودک تبدیل می‌کنیم.', color: 'bg-yellow-light text-amber-600' },
  { icon: Users, number: '۰۴', title: 'همراهی با خانواده', description: 'ارتباط سازنده با والدین را بخشی از مسیر رشد کودک می‌دانیم.', color: 'bg-sage-light text-green-700' },
];

const About = () => {
  useEffect(() => {
    document.title = 'درباره ما - مهدکودک هدیه';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'آشنایی با مهدکودک هدیه - بیش از ۱۰ سال تجربه در آموزش کودکان با محیطی امن و شاد');
  }, []);

  return (
    <main className="bg-[#fff7fb]">
      {/* Hero — same language as Home hero */}
      <section className="bg-[#fff7fb]">
        <div className="container-hedieh grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.85fr] lg:gap-14 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-100 bg-white px-3 py-1 text-[11px] font-bold tracking-widest text-brand shadow-sm">
              <Sparkles size={12} aria-hidden="true" /> درباره مهدکودک هدیه
            </span>
            <h1 className="mt-3 max-w-[560px] text-balance text-[30px] font-extrabold leading-[1.35] tracking-tight text-ink sm:text-[38px] lg:text-[42px]">
              جایی که
              <span className="text-brand"> کودکی کردن</span> را جدی می‌گیریم.
            </h1>
            <p className="mt-4 max-w-[520px] rounded-2xl border border-pink-100 bg-white p-4 text-[15px] leading-8 text-muted shadow-[0_8px_24px_rgba(236,42,134,0.06)] sm:text-[16px]">
              با بیش از ۱۰ سال تجربه، محیطی امن، آرام و پویا برای رشد کودکان ساخته‌ایم — جایی که هر کودک دیده می‌شود و تفاوت‌هایش محترم است.
            </p>
            <Link
              to="/registration"
              style={{ color: '#fff' }}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand px-7 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(236,42,134,0.25)] transition hover:bg-brand-dark"
            >
              آشنایی و ثبت‌نام <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="overflow-hidden rounded-[2.5rem] border-[8px] border-white bg-white p-3 shadow-[0_20px_60px_rgba(236,42,134,0.12)]">
              <img src="/logo-hediyeh.jpg" alt="مهدکودک هدیه" width={800} height={800} loading="eager" className="aspect-square w-full rounded-[1.75rem] object-contain" />
            </div>
            <div className="absolute -bottom-4 -left-2 flex items-center gap-2 rounded-2xl border-2 border-white bg-white px-4 py-3 shadow-[0_12px_32px_rgba(236,42,134,0.12)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white"><Heart size={14} fill="white" /></span>
              <span className="text-[11px] font-bold leading-4 text-ink">۱۰+ سال<br /><span className="font-medium text-muted">همراه خانواده‌ها</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Values — bubbly like Home */}
      <section className="bg-white py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-kicker mx-auto">ارزش‌های ما</span>
            <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-ink sm:text-[30px]">چهار رکن هدیه</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.number} className="rounded-[1.75rem] border-2 border-white bg-[#fff7fb] p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm ${v.color}`}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className="mt-3 block text-[11px] font-bold tracking-widest text-subtle">{v.number}</span>
                  <h3 className="mt-1 text-[15px] font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-muted">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story — airy */}
      <section className="bg-blue-soft py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mx-auto max-w-[760px] overflow-hidden rounded-[1.75rem] border-2 border-white bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:p-10">
            <h2 className="text-[20px] font-extrabold text-ink sm:text-[22px]">داستان ما</h2>
            <div className="mt-4 space-y-4 text-[14px] leading-8 text-muted">
              <p>هدیه از یک ایده ساده شروع شد: کودکی فقط مقدمه‌ای برای آینده نیست؛ خودش یک دنیای ارزشمند است. خواستیم خانه‌ای بسازیم که در آن کودک با آرامش، بازی و تجربه رشد کند.</p>
              <p>از سال ۱۳۹۲ تا امروز، خانواده‌های زیادی به ما اعتماد کرده‌اند — و ما هر روز تلاش می‌کنیم با عشق، دانش و همراهی، بهترین محیط را برای کشف‌های کودکانه فراهم کنیم.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-8">
        <div className="container-hedieh">
          <div className="rounded-[2rem] bg-brand px-6 py-8 text-white sm:px-8 lg:px-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-[20px] font-extrabold leading-7 sm:text-[22px]">دوست دارید هدیه را از نزدیک ببینید؟</h2>
                <p className="mt-2 max-w-xl text-[14px] leading-7 text-white/90">بازدید حضوری بهترین راه آشنایی است — با ما تماس بگیرید.</p>
              </div>
              <Link to="/contact" style={{ color: '#ec2a86' }} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-[14px] font-bold !text-brand transition hover:bg-yellow hover:!text-ink">
                تماس با هدیه <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
