
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Heart,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Service, Activity, Teacher, Gallery } from '../types';

document.title = 'کودکستان هدیه - آینده‌ای روشن برای کودکان شما';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'کودکستان هدیه - محیطی امن و شاد برای رشد و شکوفایی کودکان شما با مربیان متخصص و برنامه‌های آموزشی متنوع'
  );

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getStorageUrl = (path?: string | null) => {
  if (!path) return '';

  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');

  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          servicesRes,
          activitiesRes,
          teachersRes,
          galleryRes,
        ] = await Promise.all([
          api.get('/services'),
          api.get('/activities'),
          api.get('/teachers'),
          api.get('/gallery'),
        ]);

        setServices(servicesRes.data.slice(0, 3));
        setActivities(activitiesRes.data.slice(0, 4));
        setTeachers(teachersRes.data.slice(0, 3));
        setGallery(galleryRes.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching home page data:', error);

        setServices([]);
        setActivities([]);
        setTeachers([]);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const values = [
    {
      number: '۰۱',
      icon: ShieldCheck,
      title: 'امنیت و آرامش',
      description:
        'محیطی امن و آرام که کودک در آن احساس اعتماد و تعلق داشته باشد.',
    },
    {
      number: '۰۲',
      icon: Heart,
      title: 'رشد همه‌جانبه',
      description:
        'توجه همزمان به رشد عاطفی، اجتماعی، خلاقیت و مهارت‌های کودک.',
    },
    {
      number: '۰۳',
      icon: Users,
      title: 'توجه به هر کودک',
      description:
        'شناخت تفاوت‌های فردی و همراهی با مسیر رشد منحصر به فرد هر کودک.',
    },
    {
      number: '۰۴',
      icon: BookOpen,
      title: 'یادگیری خلاق',
      description:
        'یادگیری از طریق تجربه، بازی، هنر و فعالیت‌های متنوع روزانه.',
    },
  ];

  return (
    <main className="overflow-hidden">

      {/* Hero */}
      <section className="relative bg-cream">
        <div className="container-hedieh grid min-h-[calc(100vh-76px)] items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">

          <div className="order-2 lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
              <span className="h-2 w-2 rounded-full bg-brand" />
              کودکستان هدیه
            </div>

            <h1 className="max-w-2xl text-balance text-4xl font-bold leading-[1.35] tracking-tight text-ink sm:text-5xl lg:text-[4.2rem]">
              جایی برای
              <span className="relative mx-2 inline-block text-brand">
                کودکی کردن،
              </span>
              یاد گرفتن و شکوفا شدن.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
              در کودکستان هدیه، یادگیری با بازی، تجربه و ارتباط شکل می‌گیرد؛
              تا هر کودک بتواند با آرامش، اعتماد و شادی مسیر خودش را پیدا کند.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/registration"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-7 text-sm font-bold text-ink shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md"
              >
                ثبت‌نام آنلاین
                <ArrowLeft size={18} />
              </Link>

              <Link
                to="/about"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-7 text-sm font-bold text-ink transition-colors hover:bg-brand-light"
              >
                بیشتر درباره ما
                <ArrowLeft size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={17} className="text-brand" />
                محیط امن و آرام
              </span>

              <span className="inline-flex items-center gap-2">
                <Sparkles size={17} className="text-brand" />
                یادگیری خلاقانه
              </span>

              <span className="inline-flex items-center gap-2">
                <Heart size={17} className="text-brand" />
                همراهی با کودک
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-2xl">

              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-peach/50 sm:h-32 sm:w-32" />

              <div className="relative overflow-hidden rounded-[2rem] bg-sage-light">
                {gallery[0]?.image_path ? (
                  <img
                    src={getStorageUrl(gallery[0].image_path)}
                    alt={gallery[0].title || 'کودکستان هدیه'}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center text-muted">
                    تصویر کودکستان
                  </div>
                )}
              </div>

              <div className="absolute -bottom-5 -left-3 max-w-[230px] rounded-2xl border border-border bg-white p-4 shadow-[0_15px_45px_rgba(67,50,38,0.10)] sm:-left-8 sm:p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-brand">
                    <Heart size={18} fill="currentColor" />
                  </span>

                  <span className="text-sm font-bold text-ink">
                    کودکی، با احترام
                  </span>
                </div>

                <p className="text-xs leading-6 text-muted">
                  فضایی برای تجربه کردن، دوست داشتن و رشد کردن.
                </p>
              </div>

              <div className="absolute -bottom-7 right-8 hidden h-14 w-14 rounded-full bg-yellow sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-white">
        <div className="container-hedieh grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.number}
                className="flex gap-4 px-0 py-7 sm:px-6 lg:px-7"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                  <Icon size={19} />
                </div>

                <div>
                  <span className="text-xs font-bold text-subtle">
                    {value.number}
                  </span>

                  <h2 className="mt-1 text-sm font-bold text-ink">
                    {value.title}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-warm-white">
        <div className="container-hedieh grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem]">
              {gallery[1]?.image_path ? (
                <img
                  src={getStorageUrl(gallery[1].image_path)}
                  alt={gallery[1].title || 'محیط کودکستان هدیه'}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-sage-light text-muted">
                  تصویر محیط کودکستان
                </div>
              )}
            </div>

            <div className="absolute -bottom-6 -right-5 hidden w-40 rounded-2xl bg-sage-light p-5 sm:block">
              <Palette className="mb-3 text-brand" size={24} />

              <p className="text-sm font-bold leading-6 text-ink">
                یادگیری از مسیر تجربه و خلاقیت
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold text-brand">
              درباره کودکستان هدیه
            </p>

            <h2 className="max-w-xl text-balance text-3xl font-bold leading-[1.5] text-ink sm:text-4xl">
              ما باور داریم کودکی، فقط مقدمه‌ی آینده نیست؛
              <span className="text-brand"> خودش یک دوره‌ی ارزشمند است.</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-muted">
              کودکستان هدیه با بیش از ۱۰ سال تجربه در حوزه آموزش و پرورش
              کودکان، تلاش می‌کند محیطی امن، شاد و پویا برای رشد کودکان فراهم
              کند. در این مسیر، تفاوت‌های فردی هر کودک برای ما اهمیت دارد.
            </p>

            <p className="mt-4 text-base leading-8 text-muted">
              هدف ما این است که کودک در کنار یادگیری مهارت‌های جدید، فرصت
              تجربه کردن، پرسیدن، خلاق بودن و ساختن ارتباط‌های سالم را داشته
              باشد.
            </p>

            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark"
            >
              آشنایی بیشتر با هدیه
              <ArrowLeft size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-cream">
        <div className="container-hedieh">

          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold text-brand">
                آنچه ارائه می‌دهیم
              </p>

              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                برنامه‌هایی برای یک کودکی پربار
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand"
            >
              مشاهده همه خدمات
              <ArrowLeft size={17} />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center text-muted">
              در حال بارگذاری...
            </div>
          ) : services.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  className="group overflow-hidden border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(67,50,38,0.08)]"
                >
                  <div className="relative overflow-hidden">
                    {service.image_path ? (
                      <img
                        src={getStorageUrl(service.image_path)}
                        alt={service.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-sage-light text-muted">
                        تصویر خدمت
                      </div>
                    )}

                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-xs font-bold text-brand">
                      ۰{index +1}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ink">
                      {service.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">
                      {service.description}
                    </p>

                    <Link
                      to="/services"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand"
                    >
                      بیشتر بدانید
                      <ArrowLeft size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-14 text-center text-muted">
              هنوز خدماتی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* Activities */}
      <section className="section-padding bg-white">
        <div className="container-hedieh">

          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold text-brand">
                روزهای کودکانه
              </p>

              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                هر روز، فرصتی برای کشف کردن
              </h2>
            </div>

            <Link
              to="/activities"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand"
            >
              همه فعالیت‌ها
              <ArrowLeft size={17} />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center text-muted">
              در حال بارگذاری...
            </div>
          ) : activities.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {activities.map((activity) => (
                <article
                  key={activity.id}
                  className="group relative overflow-hidden bg-ink"
                >
                  {activity.image_path ? (
                    <img
                      src={getStorageUrl(activity.image_path)}
                      alt={activity.title}
                      className="aspect-[3/4] w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="aspect-[3/4] bg-sage-light" />
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-20 text-white">
                    <h3 className="text-lg font-bold">
                      {activity.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/80">
                      {activity.description}
                    </p>

                    {activity.age_group && (
                      <span className="mt-3 inline-block border border-white/30 px-3 py-1 text-[11px] text-white/90">
                        {activity.age_group}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-14 text-center text-muted">
              هنوز فعالیتی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* Why Hediyeh */}
      <section className="section-padding bg-sage-light">
        <div className="container-hedieh grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          <div>
            <p className="mb-4 text-sm font-bold text-brand">
              چرا هدیه؟
            </p>

            <h2 className="text-3xl font-bold leading-[1.5] text-ink sm:text-4xl">
              فضایی که در آن کودک
              <span className="text-brand"> دیده می‌شود.</span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-muted">
              از محیط و فعالیت‌ها تا ارتباط با خانواده، تلاش می‌کنیم تجربه‌ای
              هماهنگ و انسانی برای کودک و والدینش بسازیم.
            </p>

            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand"
            >
              درباره رویکرد ما
              <ArrowLeft size={17} />
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.number}
                  className="bg-warm-white p-7 sm:p-8"
                >
                  <Icon size={25} className="text-brand" />

                  <h3 className="mt-5 text-lg font-bold text-ink">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="section-padding bg-warm-white">
        <div className="container-hedieh">

          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold text-brand">
                تیم آموزشی
              </p>

              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                آدم‌هایی که کنار کودک هستند
              </h2>
            </div>

            <Link
              to="/teachers"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand"
            >
              آشنایی با تیم ما
              <ArrowLeft size={17} />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center text-muted">
              در حال بارگذاری...
            </div>
          ) : teachers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {teachers.map((teacher) => (
                <article
                  key={teacher.id}
                  className="group overflow-hidden border border-border bg-white"
                >
                  {teacher.image_path ? (
                    <img
                      src={getStorageUrl(teacher.image_path)}
                      alt={teacher.name}
                      className="aspect-[4/3] w-full object-cover grayscale-[10%] transition duration-500 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-sage-light text-muted">
                      تصویر مربی
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ink">
                      {teacher.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-brand">
                      {teacher.position}
                    </p>

                    {teacher.education && (
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {teacher.education}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-14 text-center text-muted">
              هنوز مربی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-cream">
        <div className="container-hedieh">

          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold text-brand">
                لحظه‌های هدیه
              </p>

              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                گوشه‌ای از دنیای ما
              </h2>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand"
            >
              مشاهده گالری
              <ArrowLeft size={17} />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center text-muted">
              در حال بارگذاری...
            </div>
          ) : gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
              {gallery.map((item, index) => (
                <Link
                  key={item.id}
                  to="/gallery"
                  className={[
                    'group relative overflow-hidden bg-sage-light',
                    index === 0
                      ? 'col-span-2 row-span-2'
                      : index === 3
                        ? 'col-span-2'
                        : '',
                  ].join(' ')}
                >
                  <img
                    src={getStorageUrl(item.image_path)}
                    alt={item.title}
                    className={[
                      'h-full w-full object-cover transition duration-500 group-hover:scale-105',
                      index === 0
                        ? 'min-h-[320px] md:min-h-[520px]'
                        : 'min-h-[160px] md:min-h-[250px]',
                    ].join(' ')}
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

                  <div className="absolute bottom-3 right-3 max-w-[80%] translate-y-2 bg-white/95 px-3 py-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs font-semibold text-ink">
                      {item.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-14 text-center text-muted">
              هنوز تصویری ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* Registration CTA */}
      <section className="section-padding bg-brand">
        <div className="container-hedieh">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-dark px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">

            <div className="absolute -left-10 -top-16 h-40 w-40 rounded-full border-[28px] border-white/10" />
            <div className="absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-white/5" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-4 text-sm font-semibold text-white/70">
                  قدم بعدی را با هم برداریم
                </p>

                <h2 className="max-w-2xl text-3xl font-bold leading-[1.5] sm:text-4xl">
                  آماده‌اید دنیای کودکستان هدیه را از نزدیک ببینید؟
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                  برای ثبت درخواست، کافی است فرم ثبت‌نام را تکمیل کنید.
                </p>
              </div>

              <Link
  to="/registration"
  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-7 text-sm font-bold transition-colors hover:bg-brand-light"
  style={{ color: '#2f2a26' }}
>
  شروع ثبت‌نام
  <ArrowLeft size={18} />
</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="section-padding bg-white">
        <div className="container-hedieh grid items-center gap-8 md:grid-cols-[1fr_auto]">

          <div>
            <p className="mb-3 text-sm font-bold text-brand">
              فرصت همکاری
            </p>

            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              دوست دارید بخشی از تیم هدیه باشید؟
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              اگر به کار با کودکان علاقه‌مند هستید و خودتان را فردی مسئول،
              خلاق و همراه می‌دانید، با ما در ارتباط باشید.
            </p>
          </div>

          <Link
            to="/careers"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-bold text-ink transition-colors hover:border-brand hover:bg-brand-light hover:text-brand"
          >
            فرصت‌های همکاری
            <ArrowLeft size={17} />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border bg-cream">
        <div className="container-hedieh flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-ink">
              سؤالی دارید؟
            </p>

            <p className="mt-1 text-sm text-muted">
              برای آشنایی بیشتر، می‌توانید با ما در تماس باشید.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand"
          >
            تماس با کودکستان هدیه
            <ArrowLeft size={17} />
          </Link>
        </div>
      </section>

    </main>
  );
};

export default Home;

