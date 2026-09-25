import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';
import { Plus, Trash2, Search, X, Upload, Edit, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: number;
  image_path: string;
  category: 'classroom' | 'playground' | 'activities' | 'events' | 'food';
  caption: string;
  created_at: string;
}

const AdminGallery = () => {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    image: null as File | null,
    category: 'classroom' as const,
    caption: '',
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      console.log('Fetching gallery...');
      const response = await api.get('/admin/gallery');
      console.log('Gallery data received:', response.data);
      setGallery(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      console.log('Already submitting, ignoring duplicate request');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append('category', formData.category);
      data.append('caption', formData.caption);
      if (formData.image) {
        data.append('image', formData.image);
      }

      console.log('Submitting gallery item:', editingItem ? 'UPDATE' : 'CREATE', editingItem?.id);
      console.log('Editing item:', editingItem);
      console.log('FormData keys:', Array.from(data.keys()));
      console.log('FormData values:', Array.from(data.entries()));
      console.log('FormData:', { category: formData.category, caption: formData.caption, hasImage: !!formData.image });

      if (editingItem) {
        console.log('=== UPDATE MODE ===');
        console.log('Editing item ID:', editingItem.id);
        
        if (formData.image) {
          // If there's a new image, use POST with _method=PUT
          data.append('_method', 'PUT');
          console.log('Sending FormData POST+PUT update to:', `/admin/gallery/${editingItem.id}`);
          const response = await api.post(`/admin/gallery/${editingItem.id}`, data);
          console.log('Update response:', response.data);
        } else {
          // If no new image, use JSON
          console.log('Sending JSON update to:', `/admin/gallery/${editingItem.id}`);
          const response = await api.put(`/admin/gallery/${editingItem.id}`, {
            category: formData.category,
            caption: formData.caption
          });
          console.log('Update response:', response.data);
        }
        
        closeModal();
        fetchGallery();
      } else {
        console.log('=== CREATE MODE ===');
        console.log('Sending POST to:', '/admin/gallery');
        const response = await api.post('/admin/gallery', data);
        console.log('Create response:', response.data);
        
        closeModal();
        fetchGallery();
      }
    } catch (error: any) {
      console.error('Error adding gallery item:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        alert('خطا در ذخیره تصویر: ' + errorMessages.join(', '));
      } else if (error.response?.data?.message) {
        alert('خطا در ذخیره تصویر: ' + error.response.data.message);
      } else {
        alert('خطا در ذخیره تصویر: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این تصویر را حذف کنید؟')) {
      try {
        console.log('Deleting gallery item:', id);
        const response = await api.delete(`/admin/gallery/${id}`);
        console.log('Delete response:', response.data);
        
        // Optimistic update - remove from UI immediately
        setGallery(prev => prev.filter(item => item.id !== id));
      } catch (error: any) {
        console.error('Error deleting gallery item:', error);
        if (error.response?.data?.message) {
          alert('خطا در حذف تصویر: ' + error.response.data.message);
        } else {
          alert('خطا در حذف تصویر: ' + error.message);
        }
        // Revert optimistic update on error
        fetchGallery();
      }
    }
  };

  const openModal = (item?: GalleryItem) => {
    console.log('Opening modal with item:', item);
    if (item) {
      setEditingItem(item);
      setFormData({
        image: null,
        category: item.category,
        caption: item.caption,
      });
    } else {
      setEditingItem(null);
      setFormData({
        image: null,
        category: 'classroom',
        caption: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      image: null,
      category: 'classroom',
      caption: '',
    });
  };

  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.caption.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'classroom': return 'کلاس درس';
      case 'playground': return 'محیط بازی';
      case 'activities': return 'فعالیت‌ها';
      case 'events': return 'رویدادها';
      case 'food': return 'غذا';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'classroom': return 'bg-blue-100 text-blue-700';
      case 'playground': return 'bg-green-100 text-green-700';
      case 'activities': return 'bg-purple-100 text-purple-700';
      case 'events': return 'bg-pink-100 text-pink-700';
      case 'food': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">مدیریت گالری</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">همه دسته‌بندی‌ها</option>
            <option value="classroom">کلاس درس</option>
            <option value="playground">محیط بازی</option>
            <option value="activities">فعالیت‌ها</option>
            <option value="events">رویدادها</option>
            <option value="food">غذا</option>
          </select>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={16} />
            افزودن تصویر
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredGallery.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
            هیچ تصویری یافت نشد
          </div>
        ) : (
          filteredGallery.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative aspect-square">
                {item.image_path ? (
                  <img
                    src={`http://localhost:8000/storage/${item.image_path}`}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => openModal(item)}
                    className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    title="ویرایش"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="حذف"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {getCategoryText(item.category)}
                </span>
                {item.caption && (
                  <p className="text-sm text-gray-600 mt-2 truncate">{item.caption}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingItem ? 'ویرایش تصویر' : 'افزودن تصویر جدید'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" key={editingItem?.id || 'new'}>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">تصویر</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                      className="hidden"
                      id="gallery-image"
                      required={!editingItem}
                    />
                    <label
                      htmlFor="gallery-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload size={40} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {formData.image ? formData.image.name : (editingItem ? 'تغییر تصویر (اختیاری)' : 'انتخاب تصویر')}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">دسته‌بندی</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="classroom">کلاس درس</option>
                    <option value="playground">محیط بازی</option>
                    <option value="activities">فعالیت‌ها</option>
                    <option value="events">رویدادها</option>
                    <option value="food">غذا</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">توضیحات</label>
                  <input
                    type="text"
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="توضیحات تصویر"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'در حال ذخیره...' : (editingItem ? 'ذخیره تغییرات' : 'افزودن')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
