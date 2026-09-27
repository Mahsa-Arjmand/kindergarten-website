import { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import api from '../lib/axios';
import { Gallery as GalleryType } from '../types';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getStorageUrl = (path?: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');
  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryType[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'همه' },
    { value: 'classroom', label: 'کلاس درس' },
    { value: 'playground', label: 'محیط بازی' },
    { value: 'activities', label: 'فعالیت‌ها' },
    { value: 'events', label: 'رویدادها' },
    { value: 'food', label: 'غذا' },
  ];

  useEffect(() => {
    document.title = 'گالری تصاویر - مهدکودک هدیه';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'گالری تصاویر مهدکودک هدیه؛ نگاهی به محیط، کلاس‌ها، فعالیت‌ها و لحظه‌های کودکان'
      );
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const response = await api.get('/gallery', {
          params: filter !== 'all' ? { category: filter } : {},
        });
        console.log('Gallery data received:', response.data);
        setGallery(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [filter]);

  return (
    <main className="bg-cream">
      {/* Header */}
      <section className="border-b border-border-light bg-cream">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">گالری هدیه</p>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
            <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
              گوشه‌ای از
              <span className="text-brand-dark"> دنیای ما.</span>
            </h1>
            <p className="max-w-[520px] text-[15px] leading-8 text-muted">
              از محیط مهدکودک تا فعالیت‌ها و جشن‌های کودکانه؛ اینجا می‌توانید بخشی از روزهای ما را ببینید.
            </p>
          </div>
        </div>
      </section>

      {/* Filters - pill style */}
      <section className="border-b border-border-light bg-white">
        <div className="container-hedieh py-4">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const active = filter === category.value;
              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFilter(category.value)}
                  className={[
                    'shrink-0 rounded-full px-4 py-1.5 text-[13px] font-bold transition',
                    active
                      ? 'bg-ink text-white shadow-sm'
                      : 'border border-border bg-white text-muted hover:border-ink/15 hover:bg-warm-white hover:text-ink',
                  ].join(' ')}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 lg:py-10">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light border-t-brand-dark" />
            </div>
          ) : gallery.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white px-4 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-subtle">
                <ImageIcon size={20} aria-hidden="true" />
              </span>
              <p className="mt-3 text-[13.5px] font-medium text-muted">تصویری در این دسته‌بندی وجود ندارد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-sage-light shadow-sm aspect-square"
                >
                  <img
                    src={getStorageUrl(item.image_path)}
                    alt={item.caption}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
                  <div className="absolute bottom-2.5 right-2.5 max-w-[85%] translate-y-1 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold text-ink opacity-0 shadow-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Gallery;
