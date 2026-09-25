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
import type { Service, Activity, Teacher, Gallery } from '../types';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getStorageUrl = (path?: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');
  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

type SectionState = {
  loading: boolean;
  error: boolean;
};

const initialSectionState: SectionState = {
  loading: true,
  error: false,
};

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);

  const [serviceState, setServiceState] =
    useState<SectionState>(initialSectionState);
  const [activityState, setActivityState] =
    useState<SectionState>(initialSectionState);
  const [teacherState, setTeacherState] =
    useState<SectionState>(initialSectionState);
  const [galleryState, setGalleryState] =
    useState<SectionState>(initialSectionState);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const requests = [
        {
          request: api.get('/services'),
          onSuccess: (data: unknown) => {
            if (!cancelled) {
              setServices(
                Array.isArray(data) ? (data as Service[]).slice(0, 3) : []
              );
              setServiceState({ loading: false, error: false });
            }
          },
          onError: () => {
            if (!cancelled) {
              setServices([]);
              setServiceState({ loading: false, error: true });
            }
          },
        },
        {
          request: api.get('/activities'),
          onSuccess: (data: unknown) => {
            if (!cancelled) {
              setActivities(
                Array.isArray(data) ? (data as Activity[]).slice(0, 4) : []
              );
              setActivityState({ loading: false, error: false });
            }
          },
          onError: () => {
            if (!cancelled) {
              setActivities([]);
              setActivityState({ loading: false, error: true });
            }
          },
        },
        {
          request: api.get('/teachers'),
          onSuccess: (data: unknown) => {
            if (!cancelled) {
              setTeachers(
                Array.isArray(data) ? (data as Teacher[]).slice(0, 3) : []
              );
              setTeacherState({ loading: false, error: false });
            }
          },
          onError: () => {
            if (!cancelled) {
              setTeachers([]);
              setTeacherState({ loading: false, error: true });
            }
          },
        },
        {
          request: api.get('/gallery'),
          onSuccess: (data: unknown) => {
            if (!cancelled) {
              setGallery(
                Array.isArray(data) ? (data as Gallery[]).slice(0, 6) : []
              );
              setGalleryState({ loading: false, error: false });
            }
          },
          onError: () => {
            if (!cancelled) {
              setGallery([]);
              setGalleryState({ loading: false, error: true });
            }
          },
        },
      ];

      await Promise.all(
        requests.map(async ({ request, onSuccess, onError }) => {
          try {
            const response = await request;
            onSuccess(response.data);
          } catch {
            onError();
          }
        })
      );
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  const values = [
    {
      number: '۰۱',
      icon: ShieldCheck,
      title: 'امنیت و آرامش',
      description: 'محیطی امن و آرام که کودک در آن احساس اعتماد و تعلق داشته باشد.',
    },
    {
      number: '۰۲',
      icon: Heart,
      title: 'رشد همه‌جانبه',
      description: 'توجه همزمان به رشد عاطفی، اجتماعی، خلاقیت و مهارت‌های کودک.',
    },
    {
      number: '۰۳',
      icon: Users,
      title: 'توجه به هر کودک',
      description: 'شناخت تفاوت‌های فردی و همراهی با مسیر رشد منحصر به فرد هر کودک.',
    },
    {
      number: '۰۴',
      icon: BookOpen,
      title: 'یادگیری خلاق',
      description: 'یادگیری از طریق تجربه، بازی، هنر و فعالیت‌های متنوع روزانه.',
    },
  ];

  return (
    <>
      {/* Hero - unified spacing */}
      <section aria-labelledby="hero-title" className="bg-cream">
        <div className="container-hedieh grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-12">
          <div className="order-2 lg:order-1">
            <h1
              id="hero-title"
              className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]"
            ><span>مکانی برای </span>
               
              <span className="mr-1.5 text-brand-dark">یاد گرفتن و شکوفا شدن </span>
            </h1>

            <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-muted sm:text-[16px] sm:leading-8">
              در هدیه، یادگیری با بازی و تجربه شکل می‌گیرد؛ تا هر کودک با آرامش،
              اعتماد و شادی مسیر خودش را پیدا کند.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/registration"
                style={{ color: '#000' }}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 text-[14px] font-bold !text-ink shadow-sm transition hover:border-ink/15 hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
              >
                ثبت‌نام آنلاین
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>

              <Link
                to="/about"
                style={{ color: '#000' }}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 text-[14px] font-bold !text-ink transition hover:border-brand/30 hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
              >
                بیشتر درباره ما
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border-light pt-5 text-[13px] font-medium text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-brand-dark" aria-hidden="true" />
                محیط امن و آرام
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles size={16} className="text-brand-dark" aria-hidden="true" />
                یادگیری خلاقانه
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart size={16} className="text-brand-dark" aria-hidden="true" />
                همراهی با کودک
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mx-auto max-w-[560px]">
              <div className="overflow-hidden rounded-[1.6rem] border border-border bg-white shadow-[0_16px_40px_rgba(31,26,23,0.07)]">
                {gallery[0]?.image_path ? (
                  <img
                    src={getStorageUrl(gallery[0].image_path)}
                    alt={gallery[0].title || 'محیط مهدکودک هدیه'}
                    width={1200}
                    height={900}
                    fetchPriority="high"
                    decoding="async"
                    className="aspect-[4/3.2] w-full object-cover"
                  />
                ) : galleryState.loading ? (
                  <div
                    className="aspect-[4/3.2] animate-pulse bg-border-light"
                    role="status"
                    aria-label="در حال بارگذاری تصویر اصلی"
                  />
                ) : (
                  <div className="flex aspect-[4/3.2] items-center justify-center bg-sage-light text-sm text-muted">
                    {galleryState.error
                      ? 'تصویر در حال حاضر در دسترس نیست.'
                      : 'تصویر مهدکودک'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-label="ارزش‌های مهدکودک هدیه" className="border-y border-border-light bg-white">
        <div className="container-hedieh grid divide-y divide-border-light sm:grid-cols-2 sm:divide-x sm:divide-x-reverse sm:divide-y-0 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.number} className="flex gap-3.5 px-0 py-5 sm:px-5 lg:px-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-warm-white text-brand-dark">
                  <Icon size={17} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-wide text-subtle">{value.number}</span>
                  <h2 className="mt-0.5 text-[14px] font-extrabold text-ink">{value.title}</h2>
                  <p className="mt-1 hidden text-[12.5px] leading-6 text-muted lg:block">{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About - unified spacing */}
      <section aria-labelledby="about-title" className="bg-warm-white py-10 lg:py-12">
        <div className="container-hedieh grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-sm">
              {gallery[1]?.image_path ? (
                <img
                  src={getStorageUrl(gallery[1].image_path)}
                  alt={gallery[1].title || 'محیط مهدکودک هدیه'}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3.1] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3.1] items-center justify-center bg-sage-light text-sm text-muted">
                  تصویر محیط مهدکودک
                </div>
              )}
            </div>
            <div className="absolute -bottom-5 -right-4 hidden w-[170px] rounded-2xl border border-border bg-white p-4 shadow-sm sm:block">
              <Palette className="mb-2 text-brand-dark" size={20} aria-hidden="true" />
              <p className="text-[13px] font-bold leading-6 text-ink">یادگیری از مسیر تجربه و خلاقیت</p>
            </div>
          </div>

          <div>
            <p className="section-kicker">درباره مهدکودک هدیه</p>
            <h2 id="about-title" className="max-w-[520px] text-balance text-[26px] font-black leading-[1.45] tracking-tight text-ink sm:text-[30px]">
              کودکی، فقط مقدمه‌ی آینده نیست؛
              <span className="text-brand-dark"> خودش یک دوره‌ی ارزشمند است.</span>
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-8 text-muted">
              با بیش از ۱۰ سال تجربه، محیطی امن، شاد و پویا برای رشد کودکان فراهم کرده‌ایم. تفاوت‌های فردی هر
              کودک را جدی می‌گیریم و مسیر رشد منحصر به فرد او را همراهی می‌کنیم.
            </p>
            <p className="mt-3 max-w-[560px] text-[15px] leading-8 text-muted">
              هدف ما این است که کودک در کنار مهارت‌های جدید، فرصت تجربه کردن، پرسیدن و ساختن ارتباط‌های سالم را
              داشته باشد.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex min-h-10 items-center gap-2 text-[14px] font-bold text-brand-dark transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              آشنایی بیشتر با هدیه
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services - unified spacing */}
      <section aria-labelledby="services-title" className="bg-cream py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">آنچه ارائه می‌دهیم</p>
              <h2 id="services-title" className="section-title">
                برنامه‌هایی برای یک کودکی پربار
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex min-h-9 items-center gap-1.5 text-[14px] font-bold text-brand-dark hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              مشاهده همه خدمات
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>

          {serviceState.loading ? (
            <div className="grid gap-5 md:grid-cols-3" role="status" aria-label="در حال بارگذاری خدمات">
              {[1, 2, 3].map((item) => (
                <div key={item} className="overflow-hidden rounded-2xl border border-border bg-white">
                  <div className="aspect-[4/3] animate-pulse bg-border-light" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-border-light" />
                    <div className="h-4 w-full animate-pulse rounded bg-border-light" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-border-light" />
                  </div>
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative overflow-hidden">
                    {service.image_path ? (
                      <img
                        src={getStorageUrl(service.image_path)}
                        alt={service.title}
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-sage-light text-sm text-muted">
                        تصویر خدمت
                      </div>
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[11px] font-bold text-brand-dark shadow-sm"
                    >
                      ۰{index + 1}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[17px] font-extrabold leading-7 text-ink">{service.title}</h3>
                    <p className="mt-2 line-clamp-3 text-[13.5px] leading-7 text-muted">{service.description}</p>
                    <Link
                      to="/services"
                      className="mt-4 inline-flex min-h-8 items-center gap-1.5 text-[13px] font-bold text-brand-dark hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      بیشتر بدانید
                      <ArrowLeft size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white px-6 py-6 text-center shadow-sm" role="status">
              <p className="text-[13.5px] font-medium leading-7 text-muted">
                {serviceState.error ? 'امکان دریافت اطلاعات خدمات وجود نداشت.' : 'هنوز خدماتی ثبت نشده است.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Activities - unified spacing */}
      <section aria-labelledby="activities-title" className="bg-white py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">روزهای کودکانه</p>
              <h2 id="activities-title" className="section-title">
                هر روز، فرصتی برای کشف کردن
              </h2>
            </div>
            <Link
              to="/activities"
              className="inline-flex min-h-9 items-center gap-1.5 text-[14px] font-bold text-brand-dark hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              همه فعالیت‌ها
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>

          {activityState.loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="status" aria-label="در حال بارگذاری فعالیت‌ها">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-[3/4] animate-pulse rounded-2xl bg-border-light" />
              ))}
            </div>
          ) : activities.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {activities.map((activity) => (
                <article
                  key={activity.id}
                  className="group relative overflow-hidden rounded-2xl bg-ink shadow-sm"
                >
                  {activity.image_path ? (
                    <img
                      src={getStorageUrl(activity.image_path)}
                      alt={activity.title}
                      width={750}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/4] w-full object-cover opacity-[0.92] transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                  ) : (
                    <div className="aspect-[3/4] bg-sage-light" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 pt-14 text-white">
                    <h3 className="text-[15px] font-bold leading-6">{activity.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-6 text-white/80">{activity.description}</p>
                    {activity.age_group && (
                      <span className="mt-2.5 inline-block rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                        {activity.age_group}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white px-6 py-6 text-center shadow-sm" role="status">
              <p className="text-[13.5px] font-medium leading-7 text-muted">
                {activityState.error ? 'امکان دریافت اطلاعات فعالیت‌ها وجود نداشت.' : 'هنوز فعالیتی ثبت نشده است.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Hediyeh - unified spacing */}
      <section aria-labelledby="why-title" className="bg-sage-light/60 py-10 lg:py-12">
        <div className="container-hedieh grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="lg:sticky lg:top-24">
            <p className="section-kicker">چرا هدیه؟</p>
            <h2 id="why-title" className="text-[26px] font-black leading-[1.45] tracking-tight text-ink sm:text-[30px]">
              فضایی که در آن کودک
              <span className="text-brand-dark"> دیده می‌شود.</span>
            </h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-8 text-muted">
              از محیط و فعالیت‌ها تا ارتباط با خانواده، تلاش می‌کنیم تجربه‌ای هماهنگ و انسانی برای کودک و والدینش
              بسازیم.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex min-h-9 items-center gap-1.5 text-[14px] font-bold text-brand-dark hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              درباره رویکرد ما
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.number} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <Icon size={22} className="text-brand-dark" aria-hidden="true" />
                  <h3 className="mt-4 text-[15px] font-extrabold text-ink">{value.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-7 text-muted">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teachers - unified, no extra gap */}
      <section aria-labelledby="teachers-title" className="bg-warm-white py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">تیم آموزشی</p>
              <h2 id="teachers-title" className="section-title">
                افرادی که همراه کودک شما هستند
              </h2>
            </div>
            <Link
              to="/teachers"
              className="inline-flex min-h-9 items-center gap-1.5 text-[14px] font-bold text-brand-dark hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              آشنایی با تیم ما
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>

          {teacherState.loading ? (
            <div className="grid gap-5 md:grid-cols-3" role="status" aria-label="در حال بارگذاری مربیان">
              {[1, 2, 3].map((item) => (
                <div key={item} className="overflow-hidden rounded-2xl border border-border bg-white">
                  <div className="aspect-[4/3] animate-pulse bg-border-light" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-1/2 animate-pulse rounded bg-border-light" />
                    <div className="h-4 w-1/3 animate-pulse rounded bg-border-light" />
                  </div>
                </div>
              ))}
            </div>
          ) : teachers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-3">
              {teachers.map((teacher) => (
                <article
                  key={teacher.id}
                  className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md"
                >
                  {teacher.image_path ? (
                    <img
                      src={getStorageUrl(teacher.image_path)}
                      alt={teacher.name}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-sage-light text-sm text-muted">
                      تصویر مربی
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-[17px] font-extrabold text-ink">{teacher.name}</h3>
                    <p className="mt-1 text-[13px] font-bold text-brand-dark">{teacher.position}</p>
                    {teacher.education && (
                      <p className="mt-2 text-[13px] leading-6 text-muted">{teacher.education}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white px-6 py-6 text-center shadow-sm" role="status">
              <p className="text-[13.5px] font-medium leading-7 text-muted">
                {teacherState.error ? 'امکان دریافت اطلاعات مربیان وجود نداشت.' : 'هنوز مربی ثبت نشده است.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery - unified, tight */}
      <section aria-labelledby="gallery-title" className="bg-cream py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">لحظه‌های هدیه</p>
              <h2 id="gallery-title" className="section-title">
                گوشه‌ای از دنیای ما
              </h2>
            </div>
            <Link
              to="/gallery"
              className="inline-flex min-h-9 items-center gap-1.5 text-[14px] font-bold text-brand-dark hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
            >
              مشاهده گالری
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>

          {galleryState.loading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4" role="status" aria-label="در حال بارگذاری گالری">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className={[
                    'animate-pulse rounded-2xl bg-border-light',
                    item === 1 ? 'col-span-2 row-span-2 min-h-[300px] md:min-h-[480px]' : 'min-h-[150px] md:min-h-[232px]',
                  ].join(' ')}
                />
              ))}
            </div>
          ) : gallery.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
              {gallery.map((item, index) => (
                <Link
                  key={item.id}
                  to="/gallery"
                  aria-label={`مشاهده گالری: ${item.title}`}
                  className={[
                    'group relative overflow-hidden rounded-2xl bg-sage-light focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light',
                    index === 0 ? 'col-span-2 row-span-2' : index === 3 ? 'col-span-2' : '',
                  ].join(' ')}
                >
                  <img
                    src={getStorageUrl(item.image_path)}
                    alt={item.title}
                    width={1000}
                    height={700}
                    loading="lazy"
                    decoding="async"
                    className={[
                      'h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]',
                      index === 0 ? 'min-h-[300px] md:min-h-[480px]' : 'min-h-[150px] md:min-h-[232px]',
                    ].join(' ')}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
                  <div className="absolute bottom-2.5 right-2.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-ink opacity-0 shadow-sm transition group-hover:opacity-100">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white px-6 py-6 text-center shadow-sm" role="status">
              <p className="text-[13.5px] font-medium leading-7 text-muted">
                {galleryState.error ? 'امکان دریافت تصاویر گالری وجود نداشت.' : 'هنوز تصویری ثبت نشده است.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Registration CTA - unified */}
      <section aria-labelledby="registration-title" className="bg-white py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-dark px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-12">
            <div aria-hidden="true" className="absolute -left-10 -top-14 h-40 w-40 rounded-full border-[24px] border-white/[0.07]" />
            <div aria-hidden="true" className="absolute -bottom-16 right-10 h-44 w-44 rounded-full bg-white/[0.06]" />
            <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-2 text-[13px] font-bold tracking-wide text-white/70">قدم بعدی را با هم برداریم</p>
                <h2 id="registration-title" className="max-w-2xl text-balance text-[22px] font-black leading-[1.45] sm:text-[26px]">
                  آماده‌اید دنیای هدیه را از نزدیک ببینید؟
                </h2>
                <p className="mt-2 max-w-xl text-[13.5px] leading-7 text-white/75">
                  برای ثبت درخواست، کافی است فرم ثبت‌نام را تکمیل کنید. همکاران ما خیلی زود با شما تماس می‌گیرند.
                </p>
              </div>
              <Link
                to="/registration"
                style={{ color: '#000' }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-7 text-[14px] font-extrabold !text-ink shadow-sm transition hover:bg-cream focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              >
                شروع ثبت‌نام
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Careers + Contact - unified like Teachers page, no gaps */}
      <section className="bg-cream py-6">
        <div className="container-hedieh space-y-4">
          {/* Careers card */}
          <div
            aria-labelledby="careers-title"
            className="flex flex-col gap-4 rounded-2xl border border-border bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7"
          >
            <div>
              <p className="section-kicker mb-1">فرصت همکاری</p>
              <h2 id="careers-title" className="text-[17px] font-black leading-7 text-ink sm:text-[18px]">
                دوست دارید بخشی از تیم هدیه باشید؟
              </h2>
              <p className="mt-1 max-w-2xl text-[13px] leading-6 text-muted">
                اگر به کار با کودکان علاقه‌مند هستید و خودتان را فردی مسئول و همراه می‌دانید، با ما در ارتباط باشید.
              </p>
            </div>
            <Link
              to="/careers"
              style={{ color: '#000' }}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-[14px] font-bold !text-ink shadow-sm transition hover:border-brand/20 hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
            >
              فرصت‌های همکاری
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Contact card - same style, no gap */}
          <div
            aria-labelledby="contact-title"
            className="flex flex-col gap-3 rounded-2xl border border-border bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7"
          >
            <div>
              <p id="contact-title" className="text-[14px] font-extrabold text-ink">
                سؤالی دارید؟
              </p>
              <p className="mt-1 text-[13px] leading-6 text-muted">
                برای آشنایی بیشتر، می‌توانید با ما در تماس باشید.
              </p>
            </div>
            <Link
              to="/contact"
              style={{ color: '#000' }}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-[14px] font-bold !text-ink shadow-sm transition hover:border-brand/20 hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
            >
              تماس با مهدکودک هدیه
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
