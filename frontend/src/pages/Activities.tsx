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

document.title = 'کلاس‌ها و فعالیت‌ها - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'کلاس‌ها و فعالیت‌های مهدکودک هدیه؛ تجربه‌های آموزشی، هنری و خلاقانه برای کودکان'
  );

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-border bg-white">
        <div className="container-hedieh py-16 sm:py-20">
          <p className="mb-4 text-sm font-bold text-brand">
            روزهای کودکانه
          </p>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h1 className="text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
              هر روز، فرصتی برای
              <span className="text-brand"> کشف کردن.</span>
            </h1>

            <p className="max-w-xl text-base leading-8 text-muted">
              در فعالیت‌های روزانه، کودکان از طریق بازی، هنر، حرکت و تجربه
              فرصت پیدا می‌کنند دنیای اطرافشان را بهتر بشناسند.
            </p>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="section-padding bg-cream">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-light border-t-brand" />
            </div>
          ) : activities.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity, index) => (
                <article
                  key={activity.id}
                  className="group overflow-hidden border border-border bg-white"
                >
                  <div className="relative overflow-hidden">
                    {activity.image_path ? (
                      <img
                        src={getStorageUrl(activity.image_path)}
                        alt={activity.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-sage-light">
                        <Sparkles className="text-brand" size={34} />
                      </div>
                    )}

                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-brand">
                      ۰{index + 1}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-xl font-bold text-ink">
                        {activity.title}
                      </h2>

                      {activity.age_group && (
                        <span className="shrink-0 border border-border bg-cream px-3 py-1.5 text-[11px] font-semibold text-muted">
                          {activity.age_group}
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-sm leading-7 text-muted">
                      {activity.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 border-t border-border-light pt-4 text-xs font-semibold text-brand">
                      <CalendarDays size={15} />
                      تجربه‌ای متناسب با دنیای کودک
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-16 text-center text-muted">
              هنوز فعالیتی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-white">
        <div className="container-hedieh flex flex-col gap-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-ink">
              می‌خواهید بیشتر بدانید؟
            </p>

            <p className="mt-1 text-sm text-muted">
              با ما درباره برنامه‌ها و فعالیت‌های مهدکودک صحبت کنید.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-bold text-white transition-all hover:bg-brand-dark"
          >
            تماس با ما
            <ArrowLeft size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Activities;