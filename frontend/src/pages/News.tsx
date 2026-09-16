import { useEffect, useState } from 'react';
import { ArrowLeft, CalendarDays, Newspaper } from 'lucide-react';
import api from '../lib/axios';
import { News as NewsType } from '../types';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getStorageUrl = (path?: string | null) => {
  if (!path) return '';

  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');

  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

document.title = 'اخبار و اطلاعیه‌ها - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'آخرین اخبار و اطلاعیه‌های مهدکودک هدیه'
  );

const News = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-cream">
        <div className="container-hedieh py-16 sm:py-20">
          <p className="mb-4 text-sm font-bold text-brand">
            اخبار و اطلاعیه‌ها
          </p>

          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
            آنچه در
             هدیه
            می‌گذرد.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            خبرها، اطلاعیه‌ها و اتفاقات مهم مهدکودک را از اینجا دنبال کنید.
          </p>
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-light border-t-brand" />
            </div>
          ) : news.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center border border-dashed border-border text-center">
              <Newspaper size={34} className="mb-4 text-subtle" />
              <p className="text-sm text-muted">
                هنوز خبری منتشر نشده است.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item, index) => (
                <article key={item.id} className="group">
                  <div className="relative overflow-hidden bg-sage-light">
                    {item.image_path ? (
                      <img
                        src={getStorageUrl(item.image_path)}
                        alt={item.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center">
                        <Newspaper className="text-brand" size={36} />
                      </div>
                    )}

                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-brand">
                      ۰{index + 1}
                    </span>
                  </div>

                  <div className="pt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-subtle">
                      <CalendarDays size={14} />

                      {new Date(item.publish_date).toLocaleDateString(
                        'fa-IR'
                      )}
                    </div>

                    <h2 className="mt-3 text-xl font-bold leading-8 text-ink">
                      {item.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">
                      {item.content}
                    </p>

                    <button
                      type="button"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand"
                    >
                      ادامه مطلب
                      <ArrowLeft size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default News;