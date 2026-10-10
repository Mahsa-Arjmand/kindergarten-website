import { useState } from 'react';
import { Sparkles } from 'lucide-react';

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  src: string;
  pos?: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'هدیه در دست‌های کوچک — آثار رنگارنگ', category: 'activities', src: '/gallery/photo_30321495691_x.jpg' },
  { id: 2, title: 'پروانه‌های دست‌ساز — خلاقیت با سازه', category: 'activities', src: '/gallery/photo_24470815067_y.jpg', pos: 'center 22%' },
  { id: 3, title: 'هم‌بازی و سازه‌های بلند', category: 'activities', src: '/gallery/photo_24282518452_y.jpg' },
  { id: 4, title: 'کاردستی‌های رخت و ماشین لباسشویی', category: 'classes', src: '/gallery/photo_24493646207_y.jpg' },
  { id: 5, title: 'بازی حسی — شن و آب', category: 'activities', src: '/gallery/photo_24066637599_y.jpg' },
  { id: 6, title: 'خلبان‌های کوچک — نقش‌آفرینی', category: 'celebrations', src: '/gallery/photo_24470815638_y.jpg', pos: 'center 22%' },
  { id: 7, title: 'پلیس کوچولوی هدیه', category: 'celebrations', src: '/gallery/photo_30321510530_x.jpg' },
  { id: 8, title: 'پزشکان آینده — بازی نقش', category: 'activities', src: '/gallery/photo_23862252696_y.jpg', pos: 'center 22%' },
  { id: 9, title: 'دعای کودکانه', category: 'celebrations', src: '/gallery/photo_23691628869_y.jpg' },
];

const categories = [
  { value: 'all', label: 'همه' },
  { value: 'activities', label: 'فعالیت‌ها' },
  { value: 'classes', label: 'کلاس‌ها' },
  { value: 'celebrations', label: 'جشن‌ها' },
  { value: 'environment', label: 'محیط مهدکودک' },
];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(g => g.category === filter);

  return (
    <main className="bg-[#fff7fb]">
      <section className="bg-white">
        <div className="container-hedieh py-10 lg:py-12">
          <span className="section-kicker">لحظه‌های هدیه</span>
          <h1 className="max-w-[560px] text-balance text-[30px] font-extrabold leading-[1.35] tracking-tight text-ink sm:text-[38px] lg:text-[42px]">
            گوشه‌ای از <span className="text-brand">دنیای رنگارنگ ما.</span>
          </h1>
          <p className="mt-3 max-w-[520px] rounded-2xl border border-pink-100 bg-[#fff7fb] p-4 text-[14px] leading-7 text-muted">
            هر تصویر یک خاطره شاد از بازی، یادگیری و دوستی‌های کودکانه در هدیه است.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map(c=>(
              <button key={c.value} onClick={()=>setFilter(c.value)} className={`rounded-full border px-4 py-1.5 text-[13px] font-bold transition ${filter===c.value ? 'border-brand bg-brand text-white shadow-[0_8px_20px_rgba(236,42,134,0.25)]' : 'border-pink-100 bg-white text-muted hover:border-brand hover:text-brand'}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff7fb] py-8 lg:py-10">
        <div className="container-hedieh">
          {filtered.length===0 ? (
            <div className="mx-auto max-w-xl rounded-[1.75rem] border-2 border-dashed border-pink-100 bg-white px-6 py-12 text-center">
              <Sparkles className="mx-auto text-brand" size={24} /><p className="mt-3 text-[14px] text-muted">تصویری در این دسته یافت نشد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {filtered.map(item=>(
                <div key={item.id} className="group flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-white bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <div className="relative overflow-hidden aspect-[4/3] bg-[#fff7fb]">
                    <img src={item.src} alt={item.title} width={800} height={600} loading="lazy" decoding="async" style={{ objectPosition: item.pos || 'center' }} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-3">
                    <p className="text-[13px] font-bold leading-5 text-ink">{item.title}</p>
                    <p className="mt-1 text-[11px] font-medium text-subtle">{categories.find(c=>c.value===item.category)?.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 rounded-[1.75rem] border-2 border-white bg-white p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <p className="text-[13px] leading-6 text-muted">این تصاویر واقعی از روزهای شاد هدیه هستند — هر روز یک تجربه تازه.</p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Gallery;
