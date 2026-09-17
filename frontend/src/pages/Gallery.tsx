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

document.title = 'گالری تصاویر - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'گالری تصاویر مهدکودک هدیه؛ نگاهی به محیط، کلاس‌ها، فعالیت‌ها و لحظه‌های کودکان'
  );

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryType[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'همه' },
    { value: 'environment', label: 'محیط مهدکودک' },
    { value: 'classes', label: 'کلاس‌ها' },
    { value: 'activities', label: 'فعالیت‌ها' },
    { value: 'celebrations', label: 'جشن‌ها' },
    { value: 'trips', label: 'اردوها' },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);

      try {
        const response = await api.get('/gallery', {
          params: filter !== 'all' ? { category: filter } : {},
        });

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
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-border bg-cream">
        <div className="container-hedieh py-16 sm:py-20">
          <p className="mb-4 text-sm font-bold text-brand">گالری هدیه</p>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h1 className="text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
              گوشه‌ای از
              <span className="text-brand"> دنیای ما.</span>
            </h1>

            <p className="max-w-xl text-base leading-8 text-muted">
              از محیط مهدکودک تا فعالیت‌ها و جشن‌های کودکانه؛ اینجا می‌توانید
              بخشی از روزهای ما را ببینید.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-white">
        <div className="container-hedieh py-5">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const active = filter === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setFilter(category.value)}
                  className={[
                    'shrink-0 border px-5 py-2.5 text-sm font-semibold transition-all',
                    active
                      ? 'border-brand bg-brand text-white'
                      : 'border-border bg-white text-muted hover:border-brand hover:bg-brand-light hover:text-brand',
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
      <section className="section-padding bg-cream">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-light border-t-brand" />
            </div>
          ) : gallery.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center border border-dashed border-border text-center">
              <ImageIcon size={34} className="mb-4 text-subtle" />
              <p className="text-sm text-muted">
                تصویری در این دسته‌بندی وجود ندارد.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
              {gallery.map((item, index) => (
                <div
                  key={item.id}
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
                      'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
                      index === 0
                        ? 'min-h-[320px] md:min-h-[540px]'
                        : 'min-h-[160px] md:min-h-[260px]',
                    ].join(' ')}
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

                  <div className="absolute bottom-4 right-4 max-w-[80%] translate-y-2 bg-white/95 px-4 py-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h2 className="text-sm font-bold text-ink">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                        {item.description}
                      </p>
                    )}
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