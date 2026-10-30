import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { getStorageUrl } from '../../lib/media';
import { Plus, Trash2, Search, X, Edit, Image as ImageIcon, Video } from 'lucide-react';

type MediaType = 'image' | 'video';
type Category = 'classroom' | 'playground' | 'activities' | 'events' | 'food';
interface GalleryItem {
  id: number;
  image_path: string | null;
  video_path: string | null;
  is_hero: boolean;
  category: Category;
  caption: string;
  created_at: string;
}
interface FormDataState {
  mediaType: MediaType;
  image: File | null;
  video: File | null;
  category: Category;
  caption: string;
  isHero: boolean;
}
const emptyForm: FormDataState = { mediaType: 'image', image: null, video: null, category: 'classroom', caption: '', isHero: false };
const categories: { value: Category; label: string }[] = [
  { value: 'classroom', label: 'کلاس درس' }, { value: 'playground', label: 'محیط بازی' },
  { value: 'activities', label: 'فعالیت‌ها' }, { value: 'events', label: 'رویدادها' }, { value: 'food', label: 'غذا' },
];

const AdminGallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataState>(emptyForm);

  const fetchGallery = async () => {
    try {
      const { data } = await api.get('/admin/gallery');
      setGallery(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { void fetchGallery(); }, []);

  const openModal = (item?: GalleryItem) => {
    setEditingItem(item ?? null);
    setFormData(item ? {
      mediaType: item.video_path ? 'video' : 'image', image: null, video: null,
      category: item.category, caption: item.caption ?? '', isHero: item.is_hero,
    } : emptyForm);
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditingItem(null); setFormData(emptyForm); };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const data = new FormData();
    data.append('media_type', formData.mediaType);
    data.append('category', formData.category);
    data.append('caption', formData.caption);
    data.append('is_hero', String(formData.mediaType === 'video' && formData.isHero ? 1 : 0));
    if (formData.image) data.append('image', formData.image);
    if (formData.video) data.append('video', formData.video);

    try {
      if (editingItem) {
        data.append('_method', 'PUT');
        await api.post(`/admin/gallery/${editingItem.id}`, data);
      } else {
        await api.post('/admin/gallery', data);
      }
      closeModal();
      await fetchGallery();
    } catch (error: any) {
      const errors = error.response?.data?.errors;
      const message = errors ? Object.values(errors).flat().join(', ') : error.response?.data?.message || error.message;
      alert('خطا در ذخیره رسانه: ' + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!window.confirm('آیا مطمئن هستید که می‌خواهید این رسانه را حذف کنید؟')) return;
    try {
      await api.delete(`/admin/gallery/${item.id}`);
      setGallery((items) => items.filter(({ id }) => id !== item.id));
    } catch (error: any) {
      alert('خطا در حذف رسانه: ' + (error.response?.data?.message || error.message));
      void fetchGallery();
    }
  };

  const filteredGallery = gallery.filter((item) =>
    item.caption?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'all' || item.category === filterCategory)
  );

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500" /></div>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">مدیریت گالری</h1>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input aria-label="جستجوی گالری" placeholder="جستجو..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="rounded-lg border border-gray-300 py-2 pl-4 pr-10" />
          </div>
          <select aria-label="فیلتر دسته‌بندی" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2">
            <option value="all">همه دسته‌بندی‌ها</option>
            {categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
          </select>
          <button onClick={() => openModal()} className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600">
            <Plus size={16} /> افزودن تصویر یا ویدیو
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredGallery.length === 0 ? <div className="col-span-full rounded-xl border border-gray-100 bg-white py-12 text-center text-gray-500">رسانه‌ای یافت نشد</div> : filteredGallery.map((item) => (
          <article key={item.id} className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="relative aspect-square bg-gray-100">
              {item.video_path ? <video src={getStorageUrl(item.video_path)} controls preload="none" className="h-full w-full object-contain" aria-label={item.caption || 'ویدیوی گالری'} /> : item.image_path ? <img src={getStorageUrl(item.image_path)} alt={item.caption || ''} loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><ImageIcon size={48} className="text-gray-400" /></div>}
              <div className="absolute left-2 top-2 flex gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-gray-700">{item.video_path ? <Video size={14} /> : <ImageIcon size={14} />}{item.is_hero && <span>ویدیوی اول صفحه</span>}</div>
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => openModal(item)} aria-label="ویرایش" className="rounded-full bg-blue-500 p-3 text-white hover:bg-blue-600"><Edit size={20} /></button>
                <button onClick={() => void handleDelete(item)} aria-label="حذف" className="rounded-full bg-red-500 p-3 text-white hover:bg-red-600"><Trash2 size={20} /></button>
              </div>
            </div>
            <div className="p-3"><span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">{categories.find(({ value }) => value === item.category)?.label ?? item.category}</span>{item.caption && <p className="mt-2 truncate text-sm text-gray-600">{item.caption}</p>}</div>
          </article>
        ))}
      </div>

      {showModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-bold text-gray-800">{editingItem ? 'ویرایش رسانه' : 'افزودن رسانه'}</h2><button type="button" onClick={closeModal} aria-label="بستن" className="rounded-lg p-2 hover:bg-gray-100"><X size={20} /></button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label htmlFor="media-type" className="mb-1 block text-sm font-medium text-gray-600">نوع رسانه</label><select id="media-type" value={formData.mediaType} onChange={(e) => setFormData({ ...formData, mediaType: e.target.value as MediaType, isHero: e.target.value === 'video' && formData.isHero })} className="w-full rounded-lg border border-gray-300 px-4 py-2"><option value="image">تصویر</option><option value="video">ویدیو</option></select></div>
              <div><label htmlFor="media-file" className="mb-1 block text-sm font-medium text-gray-600">{formData.mediaType === 'image' ? 'فایل تصویر' : 'فایل ویدیو'}</label><div className="rounded-lg border-2 border-dashed border-gray-300 p-5 text-center"><input id="media-file" type="file" accept={formData.mediaType === 'image' ? 'image/jpeg,image/png,image/webp' : 'video/mp4,video/webm,video/ogg'} onChange={(e) => setFormData({ ...formData, image: formData.mediaType === 'image' ? e.target.files?.[0] ?? null : null, video: formData.mediaType === 'video' ? e.target.files?.[0] ?? null : null })} className="w-full text-sm" required={!editingItem || formData.mediaType !== (editingItem.video_path ? 'video' : 'image')} /><p className="mt-2 text-xs text-gray-500">{formData.mediaType === 'image' ? 'JPEG، PNG یا WebP (حداکثر ۲ مگابایت)' : 'MP4، WebM یا OGG (حداکثر ۵۰ مگابایت)'}</p></div></div>
              {formData.mediaType === 'video' && <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={formData.isHero} onChange={(e) => setFormData({ ...formData, isHero: e.target.checked })} /> نمایش این ویدیو در بخش اصلی صفحه اول</label>}
              <div><label htmlFor="gallery-category" className="mb-1 block text-sm font-medium text-gray-600">دسته‌بندی</label><select id="gallery-category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })} className="w-full rounded-lg border border-gray-300 px-4 py-2">{categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></div>
              <div><label htmlFor="gallery-caption" className="mb-1 block text-sm font-medium text-gray-600">توضیحات</label><input id="gallery-caption" type="text" value={formData.caption} onChange={(e) => setFormData({ ...formData, caption: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2" placeholder="توضیحات رسانه" /></div>
              <div className="flex justify-end gap-2 pt-4"><button type="button" onClick={closeModal} disabled={isSubmitting} className="rounded-lg bg-gray-100 px-6 py-2 text-gray-700 hover:bg-gray-200">انصراف</button><button type="submit" disabled={isSubmitting} className="rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 disabled:opacity-50">{isSubmitting ? 'در حال ذخیره...' : 'ذخیره'}</button></div>
            </form>
          </div>
        </div>
      </div>}
    </div>
  );
};
export default AdminGallery;
