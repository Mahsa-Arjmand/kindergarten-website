import { useEffect, useState } from 'react';
import { Image as ImageIcon, Video as VideoIcon, X } from 'lucide-react';
import api from '../lib/axios';
import { getStorageUrl } from '../lib/media';
import type { Gallery as GalleryType } from '../types';

type GalleryCategory = 'all' | GalleryType['category'];
const categories: { value: GalleryCategory; label: string }[] = [
  { value: 'all', label: 'همه' }, { value: 'classroom', label: 'کلاس درس' },
  { value: 'playground', label: 'محیط بازی' }, { value: 'activities', label: 'فعالیت‌ها' },
  { value: 'events', label: 'رویدادها' }, { value: 'food', label: 'غذا' },
];

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryType[]>([]);
  const [filter, setFilter] = useState<GalleryCategory>('all');
  const [loading, setLoading] = useState(true);
  const [previewItem, setPreviewItem] = useState<GalleryType | null>(null);

  useEffect(() => {
    document.title = 'گالری تصاویر و ویدیوها - مهدکودک هدیه';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = 'گالری تصاویر و ویدیوهای محیط، کلاس‌ها، فعالیت‌ها و لحظه‌های کودکان در مهدکودک هدیه.';
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.get('/gallery', { params: filter !== 'all' ? { category: filter } : {} })
      .then(({ data }) => { if (active) setGallery(Array.isArray(data) ? data : []); })
      .catch((error) => { console.error('Error fetching gallery:', error); if (active) setGallery([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [filter]);

  const images = gallery.filter((item) => item.image_path);
  const videos = gallery.filter((item) => item.video_path);

  const openPreview = (item: GalleryType) => { setPreviewItem(item); };
  const closePreview = () => { setPreviewItem(null); };

  return (
    <main className="bg-white">
      <section className="border-b border-border-light bg-white">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">گالری هدیه</p>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
            <h1 className="max-w-[560px] text-balance text-[24px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[28px] lg:text-[32px]">گوشه‌ای از <span className="text-brand-dark">دنیای ما.</span></h1>
            <p className="max-w-[520px] text-[15px] leading-8 text-muted">از محیط مهدکودک تا فعالیت‌ها و جشن‌های کودکانه؛ اینجا می‌توانید بخشی از روزهای ما را ببینید.</p>
          </div>
        </div>
      </section>

      <section aria-label="فیلتر دسته‌بندی" className="border-b border-border-light bg-white">
        <div className="container-hedieh py-4"><div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => <button key={category.value} type="button" onClick={() => setFilter(category.value)} className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-bold transition ${filter === category.value ? 'bg-ink text-white shadow-sm' : 'border border-border bg-white text-muted hover:text-ink'}`}>{category.label}</button>)}
        </div></div>
      </section>

      {loading ? <div className="container-hedieh flex min-h-[280px] items-center justify-center"><div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light border-t-brand-dark" /></div> : <div className="container-hedieh space-y-12 py-8 lg:py-10">
        <section aria-labelledby="gallery-photos-title">
          <div className="mb-4 flex items-center gap-2"><ImageIcon size={19} className="text-brand" /><h2 id="gallery-photos-title" className="text-xl font-extrabold text-ink">تصاویر</h2></div>
          {images.length === 0 ? <EmptyGallery label="تصویری در این دسته‌بندی وجود ندارد." icon="image" /> : <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {images.map((item) => <figure key={item.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer" onClick={() => openPreview(item)}>
              <img src={getStorageUrl(item.image_path)} alt={item.caption || 'تصویر مهدکودک هدیه'} width={600} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              {item.caption && <figcaption className="absolute inset-x-2 bottom-2 rounded-xl bg-white/95 px-3 py-2 text-[12px] font-bold text-ink opacity-0 shadow-sm transition group-hover:opacity-100">{item.caption}</figcaption>}
            </figure>)}
          </div>}
        </section>

        <section aria-labelledby="gallery-videos-title">
          <div className="mb-4 flex items-center gap-2"><VideoIcon size={19} className="text-brand" /><h2 id="gallery-videos-title" className="text-xl font-extrabold text-ink">ویدیوها</h2></div>
          {videos.length === 0 ? <EmptyGallery label="هنوز ویدیویی برای نمایش وجود ندارد." icon="video" /> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm">
              <video src={getStorageUrl(item.video_path)} controls playsInline preload="metadata" aria-label={item.caption || 'ویدیوی مهدکودک هدیه'} className="aspect-video w-full bg-gray-100 object-cover" />
              {item.caption && <p className="px-4 py-3 text-sm font-semibold text-ink">{item.caption}</p>}
            </article>)}
          </div>}
        </section>
      </div>}

      {previewItem && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closePreview}>
        <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
          <button onClick={closePreview} className="absolute -right-12 top-0 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"><X size={24} /></button>
          {previewItem.video_path ? <video src={getStorageUrl(previewItem.video_path)} controls autoPlay className="max-h-[90vh] max-w-[90vw]" /> : previewItem.image_path ? <img src={getStorageUrl(previewItem.image_path)} alt={previewItem.caption || ''} className="max-h-[90vh] max-w-[90vw] object-contain" /> : null}
          {previewItem.caption && <p className="mt-4 text-center text-white">{previewItem.caption}</p>}
        </div>
      </div>}
    </main>
  );
};

const EmptyGallery = ({ label, icon }: { label: string; icon: 'image' | 'video' }) => (
  <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white px-4 py-8 text-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-subtle">{icon === 'video' ? <VideoIcon size={20} /> : <ImageIcon size={20} />}</span>
    <p className="mt-3 text-[13.5px] font-medium text-muted">{label}</p>
  </div>
);
export default Gallery;
