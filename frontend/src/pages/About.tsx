import {
  ArrowLeft,
  BookOpen,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

document.title = 'درباره ما - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'آشنایی با مهدکودک هدیه - بیش از ۱۰ سال تجربه در آموزش و پرورش کودکان با محیطی امن و شاد'
  );

const values = [
  {
    icon: Heart,
    number: '۰۱',
    title: 'احترام به فردیت',
    description:
      'هر کودک مسیر رشد، علایق و ویژگی‌های منحصر به فرد خودش را دارد و ما برای این تفاوت‌ها ارزش قائلیم.',
  },
  {
    icon: ShieldCheck,
    number: '۰۲',
    title: 'امنیت و آرامش',
    description:
      'تلاش می‌کنیم محیطی امن و قابل اعتماد ایجاد کنیم تا کودک با آرامش تجربه و یادگیری کند.',
  },
  {
    icon: BookOpen,
    number: '۰۳',
    title: 'یادگیری باکیفیت',
    description:
      'یادگیری را به تجربه‌ای جذاب و متناسب با نیازها و مرحله رشد کودک تبدیل می‌کنیم.',
  },
  {
    icon: Users,
    number: '۰۴',
    title: 'همراهی با خانواده',
    description:
      'ارتباط سازنده با والدین را بخشی مهم از مسیر رشد و تربیت کودک می‌دانیم.',
  },
];

const About = () => {
  return (
    <main className="overflow-hidden bg-cream">
      {/* Intro */}
      <section className="border-b border-border bg-cream">
        <div className="container-hedieh grid min-h-[520px] items-center gap-12 py-16 lg:grid-cols-[1fr_0.8fr] lg:py-24">
          <div>
            <p className="mb-5 text-sm font-bold text-brand">
              درباره مهدکودک هدیه
            </p>

            <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.4] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              جایی که
              <span className="text-brand"> کودکی کردن</span>
              را جدی می‌گیریم.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              مهدکودک هدیه با بیش از ۱۰ سال تجربه در حوزه آموزش و پرورش
              کودکان، تلاش می‌کند محیطی امن، آرام و پویا برای رشد و شکوفایی
              کودکان فراهم کند.
            </p>

            <Link
              to="/registration"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              آشنایی و ثبت‌نام
              <ArrowLeft size={17} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-peach/50" />

            <div className="relative overflow-hidden rounded-[2rem] bg-sage-light">
              <div className="flex aspect-[4/3] items-center justify-center">
                <Sparkles className="text-brand" size={48} />
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 bg-white px-6 py-5 shadow-[0_15px_45px_rgba(67,50,38,0.09)]">
              <p className="text-3xl font-bold text-brand">۱۰+</p>
              <p className="mt-1 text-xs font-semibold text-muted">
                سال تجربه
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-hedieh grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-sm font-bold text-brand">نگاه ما</p>

            <h2 className="mt-4 text-3xl font-bold leading-[1.5] text-ink sm:text-4xl">
              کودکی، فقط آماده شدن برای آینده نیست.
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg leading-9 text-ink">
              ما باور داریم سال‌های کودکی به خودی خود ارزشمند هستند. کودک
              باید فرصت داشته باشد بازی کند، سؤال بپرسد، اشتباه کند، تجربه
              کند و از دنیای اطرافش لذت ببرد.
            </p>

            <p className="mt-6 text-base leading-8 text-muted">
              به همین دلیل، رویکرد ما بر پایه احترام به فردیت کودک، ایجاد
              احساس امنیت، تقویت مهارت‌های اجتماعی و عاطفی و فراهم کردن
              فرصت‌های متنوع برای یادگیری و خلاقیت شکل گرفته است.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-sage-light">
        <div className="container-hedieh">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-bold text-brand">ارزش‌های ما</p>

            <h2 className="text-3xl font-bold text-ink sm:text-4xl">
              چیزهایی که برای ما اهمیت دارند
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.number}
                  className="bg-warm-white p-7 sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-light text-brand">
                      <Icon size={21} />
                    </div>

                    <span className="text-xs font-bold text-subtle">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-ink">
                    {value.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-cream">
        <div className="container-hedieh">
          <div className="border-y border-border py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
              <div>
                <p className="text-sm font-bold text-brand">چشم‌انداز ما</p>
              </div>

              <div>
                <h2 className="max-w-3xl text-2xl font-bold leading-[1.6] text-ink sm:text-3xl">
                  ساختن محیطی که در آن هر کودک احساس کند دیده می‌شود، شنیده
                  می‌شود و فرصت رشد کردن دارد.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                  هدف ما ارائه خدمات آموزشی باکیفیت و ایجاد محیطی است که
                  خانواده‌ها بتوانند با اطمینان، سال‌های ارزشمند کودکی فرزندشان
                  را به ما بسپارند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand">
        <div className="container-hedieh">
          <div className="bg-brand-dark px-7 py-12 text-white sm:px-12 sm:py-14">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-white/70">
                  مهدکودک هدیه
                </p>

                <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-[1.6] sm:text-3xl">
                  دوست دارید بیشتر با فضای هدیه آشنا شوید؟
                </h2>
              </div>

              <Link
  to="/contact"
  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold transition-colors hover:bg-warm-white"
  style={{ color: '#2f2a26' }}
>
  با ما در تماس باشید
  <ArrowLeft size={17} />
</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;