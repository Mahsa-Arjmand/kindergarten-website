import { ArrowLeft, CalendarDays, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import { Activity } from '../types';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getStorageUrl = (path?: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');
  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'کلاس‌ها و فعالیت‌ها - مهدکودک هدیه';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'کلاس‌ها و فعالیت‌های مهدکودک هدیه؛ تجربه‌های آموزشی، هنری و خلاقانه برای کودکان'
      );

    const fetchActivities = async () => {
      try {
        const response = await api.get('/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <main className="bg-cream">
      {/* Header - compact */}
      <section className="border-b border-border-light bg-white">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">روزهای کودکانه</p>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
            <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
              هر روز، فرصتی برای
              <span className="text-brand-dark"> کشف کردن.</span>
            </h1>
            <p className="max-w-[520px] text-[15px] leading-8 text-muted">
              در فعالیت‌های روزانه، کودکان از طریق بازی، هنر، حرکت و تجربه فرصت پیدا می‌کنند دنیای اطرافشان را بهتر بشناسند.
            </p>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-10 lg:py-12">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light border-t-brand-dark" />
            </div>
          ) : activities.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity, index) => (
                <article
                  key={activity.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative overflow-hidden">
                    {activity.image_path ? (
                      <img
                        src={getStorageUrl(activity.image_path)}
                        alt={activity.title}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-sage-light">
                        <Sparkles className="text-brand-dark" size={28} aria-hidden="true" />
                      </div>
                    )}
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[11px] font-bold text-brand-dark shadow-sm">
                      ۰{index + 1}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-[16px] font-extrabold leading-7 text-ink">
                        {activity.title}
                      </h2>
                      {activity.age_group && (
                        <span className="shrink-0 rounded-full border border-border bg-cream px-2.5 py-1 text-[11px] font-bold text-muted">
                          {activity.age_group}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-3 text-[13.5px] leading-7 text-muted">
                      {activity.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 border-t border-border-light pt-3 text-[12px] font-bold text-brand-dark">
                      <CalendarDays size={14} aria-hidden="true" />
                      تجربه‌ای متناسب با دنیای کودک
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-white px-4 py-10 text-center text-[13.5px] text-muted">
              هنوز فعالیتی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* CTA - tight */}
      <section className="border-t border-border-light bg-white">
        <div className="container-hedieh flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[14px] font-extrabold text-ink">می‌خواهید بیشتر بدانید؟</p>
            <p className="mt-1 text-[13px] text-muted">با ما درباره برنامه‌ها و فعالیت‌های مهدکودک صحبت کنید.</p>
          </div>
          <Link
            to="/contact"
            style={{ color: '#000' }}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-[14px] font-bold !text-ink shadow-sm transition hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
          >
            تماس با ما
            <ArrowLeft size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Activities;
