import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Heart,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
  Star,
  Cloud,
  Sun,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/axios';
import type { Service, Activity, Teacher, Gallery } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
const getStorageUrl = (path?: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');
  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

type SectionState = { loading: boolean; error: boolean };
const initialSectionState: SectionState = { loading: true, error: false };

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [serviceState, setServiceState] = useState<SectionState>(initialSectionState);
  const [activityState, setActivityState] = useState<SectionState>(initialSectionState);
  const [teacherState, setTeacherState] = useState<SectionState>(initialSectionState);
  const [galleryState, setGalleryState] = useState<SectionState>(initialSectionState);

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      const requests = [
        { request: api.get('/services'), onSuccess: (data: unknown) => { if (!cancelled) { setServices(Array.isArray(data) ? (data as Service[]).slice(0, 3) : []); setServiceState({ loading: false, error: false }); } }, onError: () => { if (!cancelled) { setServices([]); setServiceState({ loading: false, error: true }); } } },
        { request: api.get('/activities'), onSuccess: (data: unknown) => { if (!cancelled) { setActivities(Array.isArray(data) ? (data as Activity[]).slice(0, 4) : []); setActivityState({ loading: false, error: false }); } }, onError: () => { if (!cancelled) { setActivities([]); setActivityState({ loading: false, error: true }); } } },
        { request: api.get('/teachers'), onSuccess: (data: unknown) => { if (!cancelled) { setTeachers(Array.isArray(data) ? (data as Teacher[]).slice(0, 3) : []); setTeacherState({ loading: false, error: false }); } }, onError: () => { if (!cancelled) { setTeachers([]); setTeacherState({ loading: false, error: true }); } } },
        { request: api.get('/gallery'), onSuccess: (data: unknown) => { if (!cancelled) { setGallery(Array.isArray(data) ? (data as Gallery[]).slice(0, 6) : []); setGalleryState({ loading: false, error: false }); } }, onError: () => { if (!cancelled) { setGallery([]); setGalleryState({ loading: false, error: true }); } } },
      ];
      await Promise.all(requests.map(async ({ request, onSuccess, onError }) => { try { const r = await request; onSuccess(r.data); } catch { onError(); } }));
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  const values = [
    { number: '۰۱', icon: ShieldCheck, title: 'امنیت و آرامش', description: 'محیطی امن که کودک احساس تعلق کند.', color: 'bg-brand-light text-brand border-pink-100' },
    { number: '۰۲', icon: Heart, title: 'رشد همه‌جانبه', description: 'توجه به قلب، ذهن و خلاقیت کودک.', color: 'bg-blue-light text-blue border-sky-100' },
    { number: '۰۳', icon: Users, title: 'توجه به هر کودک', description: 'هر کودک مسیر خودش را دارد.', color: 'bg-yellow-light text-amber-600 border-amber-100' },
    { number: '۰۴', icon: BookOpen, title: 'یادگیری خلاق', description: 'بازی، هنر و تجربه هر روز.', color: 'bg-sage-light text-green-700 border-green-100' },
  ];

  return (
    <>
      {/* Hero — KINDERGARTEN BUBBLY - longer, fits viewport before scroll */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-[#fff7fb]">
        {/* playful blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-brand-light/70 blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-blue-light/60 blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-yellow-light/40 blur-3xl" />

        <div className="container-hedieh relative grid items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-16">
          <div className="order-2 lg:order-1">
            <div className="mb-4 hidden items-center gap-2 rounded-full border border-pink-100 bg-white px-3 py-1.5 text-[12px] font-bold text-brand shadow-sm xl:inline-flex">
              <Star size={14} className="fill-brand text-brand" aria-hidden="true" />
              کودکستان و پیش‌دبستانی هدیه
              <span className="text-subtle font-medium">• از ۱۳۹۲</span>
            </div>

            <h1 id="hero-title" className="max-w-[560px] text-balance text-[32px] font-extrabold leading-[1.25] tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
              مکانی برای
              <span className="relative mx-1.5 inline-block">
                <span className="relative z-10 text-brand">یاد گرفتن</span>
                <span aria-hidden="true" className="absolute bottom-1 left-0 right-0 h-2 bg-yellow-light -rotate-1" />
              </span>
              و شکوفا شدن
            </h1>

            <p className="mt-4 max-w-[500px] text-[15px] leading-8 text-muted">
              جایی گرم و رنگارنگ که هر روزش پر از بازی، دوست، قصه و کشف‌های تازه است — با مربیانی که با عشق همراه کودک هستند.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/registration"
                style={{ color: '#fff' }}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand px-7 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(236,42,134,0.25)] transition hover:bg-brand-dark hover:shadow-[0_8px_24px_rgba(236,42,134,0.3)]"
              >
                شروع ثبت‌نام
                <ArrowLeft size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/about"
                style={{ color: '#2e2230' }}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-ink bg-white px-7 text-[14px] font-bold !text-ink transition hover:bg-ink hover:!text-white"
              >
                بیشتر درباره ما
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                { icon: ShieldCheck, text: 'محیط امن', bg: 'bg-brand-soft border-pink-100' },
                { icon: Palette, text: 'خلاق', bg: 'bg-blue-soft border-sky-100' },
                { icon: Users, text: 'همراه خانواده', bg: 'bg-yellow-soft border-amber-100' },
              ].map((b) => (
                <span key={b.text} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-bold text-ink ${b.bg}`}>
                  <b.icon size={14} aria-hidden="true" /> {b.text}
                </span>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[520px]">
              {/* cloud shape behind */}
              <div aria-hidden="true" className="absolute -right-4 -top-4 hidden h-20 w-20 items-center justify-center rounded-[2rem] bg-blue-light text-blue sm:flex">
                <Cloud size={28} aria-hidden="true" />
              </div>
              <div className="relative overflow-hidden rounded-[2.5rem] border-[8px] border-white bg-white shadow-[0_20px_60px_rgba(236,42,134,0.12)]">
                <img
                  src="/logo-hediyeh.jpg"
                  alt="مهدکودک هدیه - کودکستان و پیش‌دبستانی"
                  width={800}
                  height={800}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-square w-full object-contain"
                />
              </div>
              {/* floating happy card */}
              <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-pink-100 bg-white px-4 py-3 shadow-[0_12px_32px_rgba(236,42,134,0.15)] sm:-left-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
                  <Heart size={18} fill="white" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-ink">هر کودک، یک ستاره</span>
                  <span className="block text-[11px] font-medium text-muted">با عشق و توجه</span>
                </span>
              </div>
              <div aria-hidden="true" className="absolute -bottom-6 right-6 hidden h-10 w-10 items-center justify-center rounded-full bg-yellow text-amber-900 shadow-sm sm:flex">
                <Sun size={18} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        {/* wavy divider */}
        <div aria-hidden="true" className="h-6 w-full bg-white" style={{ maskImage: 'radial-gradient(circle at 10px -5px, transparent 12px, black 13px)', WebkitMaskImage: 'radial-gradient(circle at 10px -5px, transparent 12px, black 13px)', maskSize: '20px 20px', WebkitMaskSize: '20px 20px' }} />
      </section>

      {/* Values — bubbly pastel strip */}
      <section aria-label="ارزش‌ها" className="bg-white py-6">
        <div className="container-hedieh grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.number} className={`rounded-[1.5rem] border-2 bg-white p-5 text-center shadow-sm ${v.color.split(' ')[2]}`}>
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white ${v.color}`}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span className="mt-2 block text-[11px] font-bold tracking-widest text-subtle">{v.number}</span>
                <h2 className="mt-1 text-[15px] font-bold text-ink">{v.title}</h2>
                <p className="mt-1 text-[12.5px] leading-6 text-muted">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About — pastel blue */}
      <section aria-labelledby="about-title" className="bg-blue-soft py-10 lg:py-12">
        <div className="container-hedieh grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-white bg-white shadow-[0_12px_32px_rgba(30,167,255,0.15)]">
              {gallery[1]?.image_path ? (
                <img src={getStorageUrl(gallery[1].image_path)} alt={gallery[1].title || 'محیط هدیه'} width={1200} height={900} loading="lazy" decoding="async" className="aspect-[4/3.1] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/3.1] items-center justify-center bg-blue-light text-sm text-muted">محیط شاد هدیه</div>
              )}
            </div>
            <div className="absolute -bottom-4 -right-2 rotate-2 rounded-2xl border-2 border-white bg-yellow px-4 py-3 shadow-sm">
              <Palette size={18} className="text-amber-900" aria-hidden="true" />
              <p className="mt-1 text-[12px] font-bold leading-4 text-ink">یادگیری با<br />بازی و خلاقیت</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-widest text-blue border border-sky-100">
              <Sparkles size={12} aria-hidden="true" /> درباره هدیه
            </span>
            <h2 id="about-title" className="mt-3 max-w-[520px] text-balance text-[26px] font-extrabold leading-[1.4] text-ink sm:text-[30px]">
              کودکی فقط مقدمه نیست؛
              <span className="text-blue"> خودش یک دنیای ارزشمند است.</span>
            </h2>
            <p className="mt-4 max-w-[520px] rounded-2xl bg-white p-4 text-[14px] leading-7 text-muted shadow-sm border border-sky-100">
              با بیش از ۱۰ سال تجربه، خانه‌ای امن و رنگارنگ ساخته‌ایم که هر کودک با آرامش، بازی و دوستی رشد کند و تفاوت‌های قشنگش دیده شود.
            </p>
            <Link to="/about" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-[13px] font-bold text-white transition hover:bg-black">
              بیشتر بدانید <ArrowLeft size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services — happy pastel cards with top color bar */}
      <section aria-labelledby="services-title" className="bg-[#fff7fb] py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-kicker mx-auto">● آنچه ارائه می‌دهیم</span>
            <h2 id="services-title" className="mx-auto text-[26px] font-extrabold tracking-tight text-ink sm:text-[30px]">برنامه‌هایی برای یک کودکی پربار</h2>
            <p className="mx-auto mt-2 max-w-[520px] text-[14px] leading-7 text-muted">هر روز با قصه، هنر، موسیقی و بازی — متناسب با دنیای کودک</p>
          </div>

          {serviceState.loading ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="overflow-hidden rounded-[1.5rem] border-2 border-white bg-white shadow-sm">
                  <div className="aspect-[4/3] animate-pulse bg-brand-light" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 w-2/3 animate-pulse rounded-full bg-pink-100" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {services.map((service, index) => {
                const topColors = ['bg-brand', 'bg-blue', 'bg-yellow'];
                const topColor = topColors[index % topColors.length];
                return (
                  <article key={service.id} className="group overflow-hidden rounded-[1.75rem] border-2 border-white bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(236,42,134,0.12)]">
                    <div className={`h-1.5 w-full ${topColor}`} />
                    <div className="relative overflow-hidden">
                      {service.image_path ? (
                        <img src={getStorageUrl(service.image_path)} alt={service.title} width={800} height={600} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex aspect-[4/3] items-center justify-center bg-brand-soft text-sm text-muted">تصویر خدمت</div>
                      )}
                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-ink shadow-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[16px] font-bold text-ink">{service.title}</h3>
                      <p className="mt-2 line-clamp-3 text-[13.5px] leading-7 text-muted">{service.description}</p>
                      <Link to="/services" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-[12px] font-bold text-white transition hover:bg-black">
                        بیشتر <ArrowLeft size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto mt-8 max-w-xl rounded-[1.5rem] border-2 border-dashed border-pink-100 bg-white px-6 py-10 text-center shadow-sm">
              <p className="text-[13.5px] text-muted">{serviceState.error ? 'امکان دریافت اطلاعات وجود نداشت.' : 'هنوز خدماتی ثبت نشده است.'}</p>
            </div>
          )}
          <div className="mt-6 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border-2 border-brand bg-white px-6 py-2.5 text-[14px] font-bold text-brand transition hover:bg-brand hover:text-white">
              مشاهده همه خدمات <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Activities — playful dark cards with rounded */}
      <section aria-labelledby="activities-title" className="bg-white py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">روزهای کودکانه</span>
              <h2 id="activities-title" className="text-[24px] font-extrabold text-ink sm:text-[28px]">هر روز، فرصتی برای کشف کردن</h2>
            </div>
            <Link to="/activities" className="inline-flex items-center gap-1.5 rounded-full bg-yellow px-5 py-2 text-[13px] font-bold text-ink shadow-sm hover:bg-yellow-400">
              همه فعالیت‌ها <ArrowLeft size={14} aria-hidden="true" />
            </Link>
          </div>

          {activityState.loading ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-[1.5rem] bg-pink-50" />
              ))}
            </div>
          ) : activities.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {activities.map((activity) => (
                <article key={activity.id} className="group relative overflow-hidden rounded-[1.75rem] bg-ink shadow-sm">
                  {activity.image_path ? (
                    <img src={getStorageUrl(activity.image_path)} alt={activity.title} width={750} height={1000} loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                  ) : (
                    <div className="aspect-[3/4] bg-pink-100" />
                  )}
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3 shadow-sm">
                    <h3 className="text-[14px] font-bold leading-5 text-ink">{activity.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-muted">{activity.description}</p>
                    {activity.age_group && <span className="mt-2 inline-block rounded-full bg-brand-light px-2.5 py-1 text-[11px] font-bold text-brand">{activity.age_group}</span>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.5rem] border-2 border-dashed border-pink-100 bg-white px-6 py-10 text-center">
              <p className="text-[13.5px] text-muted">{activityState.error ? 'امکان دریافت اطلاعات وجود نداشت.' : 'هنوز فعالیتی ثبت نشده است.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Why — 4 colorful bubbly */}
      <section aria-labelledby="why-title" className="bg-yellow-soft py-10 lg:py-12">
        <div className="container-hedieh grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-amber-700 border border-amber-100">
              <Star size={12} fill="currentColor" aria-hidden="true" /> چرا هدیه؟
            </span>
            <h2 id="why-title" className="mt-3 max-w-[400px] text-[26px] font-extrabold leading-[1.4] text-ink sm:text-[30px]">
              فضایی که در آن کودک
              <span className="text-brand"> دیده می‌شود.</span>
            </h2>
            <p className="mt-3 max-w-[440px] text-[14px] leading-7 text-muted">محیطی شاد و امن که هر کودک با ریتم خودش رشد می‌کند — با مربیانی مهربان و همراه خانواده.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((v, idx) => {
              const Icon = v.icon;
              const bgColors = ['bg-white', 'bg-brand-soft', 'bg-blue-soft', 'bg-white'];
              const bg = bgColors[idx % bgColors.length];
              return (
                <div key={v.number} className={`rounded-[1.5rem] border-2 border-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ${bg}`}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-sm ${v.color}`}>
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-[15px] font-bold text-ink">{v.title}</h3>
                  <p className="mt-1 text-[13px] leading-6 text-muted">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teachers — bubbly avatars */}
      <section aria-labelledby="teachers-title" className="bg-white py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">تیم مهربان</span>
              <h2 id="teachers-title" className="text-[24px] font-extrabold text-ink sm:text-[28px]">آدم‌هایی که کنار کودک هستند</h2>
            </div>
            <Link to="/teachers" className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-5 py-2 text-[13px] font-bold text-ink hover:bg-ink hover:text-white">
              آشنایی با تیم <ArrowLeft size={14} aria-hidden="true" />
            </Link>
          </div>

          {teacherState.loading ? (
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="overflow-hidden rounded-[1.5rem] border-2 border-white bg-cream">
                  <div className="aspect-[4/3] animate-pulse bg-pink-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 w-1/2 animate-pulse rounded-full bg-pink-100" />
                    <div className="h-4 w-1/3 animate-pulse rounded-full bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : teachers.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {teachers.map((teacher) => (
                <article key={teacher.id} className="overflow-hidden rounded-[1.75rem] border-2 border-white bg-cream shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)]">
                  {teacher.image_path ? (
                    <img src={getStorageUrl(teacher.image_path)} alt={teacher.name} width={800} height={600} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-brand-soft text-sm text-muted">تصویر مربی</div>
                  )}
                  <div className="bg-white p-5">
                    <h3 className="text-[16px] font-bold text-ink">{teacher.name}</h3>
                    <p className="mt-1 inline-flex rounded-full bg-brand-light px-2.5 py-1 text-[12px] font-bold text-brand">{teacher.position}</p>
                    {teacher.education && <p className="mt-2 text-[13px] leading-6 text-muted">{teacher.education}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.5rem] border-2 border-dashed border-pink-100 bg-white px-6 py-10 text-center">
              <p className="text-[13.5px] text-muted">{teacherState.error ? 'امکان دریافت اطلاعات مربیان وجود نداشت.' : 'هنوز مربی ثبت نشده است.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery — playful */}
      <section aria-labelledby="gallery-title" className="bg-cream py-10 lg:py-12">
        <div className="container-hedieh">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="section-kicker">لحظه‌های هدیه</span>
              <h2 id="gallery-title" className="text-[24px] font-extrabold text-ink sm:text-[28px]">گوشه‌ای از دنیای رنگارنگ ما</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-1.5 rounded-full bg-blue px-5 py-2 text-[13px] font-bold text-white hover:bg-blue-600">
              مشاهده گالری <ArrowLeft size={14} aria-hidden="true" />
            </Link>
          </div>

          {galleryState.loading ? (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={['animate-pulse rounded-[1.5rem] bg-pink-100', i === 1 ? 'col-span-2 row-span-2 min-h-[300px] md:min-h-[480px]' : 'min-h-[150px] md:min-h-[232px]'].join(' ')} />
              ))}
            </div>
          ) : gallery.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {gallery.map((item, index) => (
                <Link key={item.id} to="/gallery" aria-label={`مشاهده گالری: ${item.title}`} className={['group relative overflow-hidden rounded-[1.5rem] border-4 border-white bg-white shadow-sm', index === 0 ? 'col-span-2 row-span-2' : index === 3 ? 'col-span-2' : ''].join(' ')}>
                  <img src={getStorageUrl(item.image_path)} alt={item.title} width={1000} height={700} loading="lazy" decoding="async" className={['h-full w-full object-cover transition duration-500 group-hover:scale-105', index === 0 ? 'min-h-[300px] md:min-h-[480px]' : 'min-h-[150px] md:min-h-[232px]'].join(' ')} />
                  <div className="absolute bottom-2 right-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-bold text-ink shadow-sm opacity-0 transition group-hover:opacity-100">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.5rem] border-2 border-dashed border-pink-100 bg-white px-6 py-10 text-center">
              <p className="text-[13.5px] text-muted">{galleryState.error ? 'امکان دریافت تصاویر گالری وجود نداشت.' : 'هنوز تصویری ثبت نشده است.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Registration CTA — bubbly pink */}
      <section aria-labelledby="registration-title" className="bg-white py-8">
        <div className="container-hedieh">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
            <div aria-hidden="true" className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
            <div aria-hidden="true" className="absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-white/10" />
            <div aria-hidden="true" className="absolute left-1/2 top-4 h-3 w-3 rounded-full bg-yellow" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[12px] font-bold tracking-wide text-white">
                  <Star size={12} fill="white" aria-hidden="true" /> قدم بعدی
                </p>
                <h2 id="registration-title" className="mt-3 max-w-xl text-[24px] font-extrabold leading-[1.35] sm:text-[28px]">آماده‌اید دنیای هدیه را از نزدیک ببینید؟</h2>
                <p className="mt-2 max-w-xl text-[14px] leading-7 text-white/90">فرم ثبت‌نام را پر کنید — همین هفته با شما تماس می‌گیریم.</p>
              </div>
              <Link to="/registration" style={{ color: '#ec2a86' }} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 text-[15px] font-bold !text-brand shadow-sm transition hover:bg-yellow hover:!text-ink">
                شروع ثبت‌نام <ArrowLeft size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom — two bubbly cards */}
      <section className="bg-[#fff7fb] py-6">
        <div className="container-hedieh grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.75rem] border-2 border-white bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <span className="inline-flex rounded-full bg-yellow-light px-2.5 py-1 text-[11px] font-bold text-amber-700">فرصت همکاری</span>
            <h2 className="mt-2 text-[17px] font-bold leading-7 text-ink">دوست دارید بخشی از تیم هدیه باشید؟</h2>
            <p className="mt-1 text-[13px] leading-6 text-muted">اگر عاشق دنیای کودکان هستید و همراهی بلدید، منتظرتان هستیم.</p>
            <Link to="/careers" style={{ color: '#2e2230' }} className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2 text-[13px] font-bold !text-ink transition hover:bg-ink hover:!text-white">
              فرصت‌های همکاری <ArrowLeft size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-[1.75rem] border-2 border-white bg-blue-soft p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <span className="inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-blue border border-sky-100">پشتیبانی</span>
            <h2 className="mt-2 text-[17px] font-bold leading-7 text-ink">سؤالی دارید؟</h2>
            <p className="mt-1 text-[13px] leading-6 text-muted">با ما تماس بگیرید — با حوصله جواب می‌دهیم.</p>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-[13px] font-bold text-white transition hover:bg-black">
              تماس با هدیه <ArrowLeft size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
