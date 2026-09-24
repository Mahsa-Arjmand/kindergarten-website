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

const News = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'اخبار و اطلاعیه‌ها - مهدکودک هدیه';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'آخرین اخبار و اطلاعیه‌های مهدکودک هدیه');

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
    <main className="bg-cream">
      <section className="border-b border-border-light bg-cream">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">اخبار و اطلاعیه‌ها</p>
          <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
            آنچه در
            <span className="text-brand-dark"> هدیه</span> می‌گذرد.
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-muted">
            خبرها، اطلاعیه‌ها و اتفاقات مهم مهدکودک را از اینجا دنبال کنید.
          </p>
        </div>
      </section>

      <section className="bg-warm-white py-8 lg:py-10">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light border-t-brand-dark" />
            </div>
          ) : news.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white px-4 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-subtle">
                <Newspaper size={20} aria-hidden="true" />
              </span>
              <p className="mt-3 text-[13.5px] font-medium text-muted">هنوز خبری منتشر نشده است.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {news.map((item, index) => (
                <article key={item.id} className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative overflow-hidden">
                    {item.image_path ? (
                      <img
                        src={getStorageUrl(item.image_path)}
                        alt={item.title}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-sage-light">
                        <Newspaper className="text-brand-dark" size={28} aria-hidden="true" />
                      </div>
                    )}
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[11px] font-bold text-brand-dark shadow-sm">
                      ۰{index + 1}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-subtle">
                      <CalendarDays size={13} aria-hidden="true" />
                      {new Date(item.publish_date).toLocaleDateString('fa-IR')}
                    </div>
                    <h2 className="mt-2 line-clamp-2 text-[16px] font-extrabold leading-7 text-ink">
                      {item.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-[13.5px] leading-7 text-muted">{item.content}</p>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-dark transition hover:text-brand"
                    >
                      ادامه مطلب
                      <ArrowLeft size={14} aria-hidden="true" />
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
