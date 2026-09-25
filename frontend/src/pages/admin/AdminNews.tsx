import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Plus, Edit, Trash2, Search, X, Upload } from 'lucide-react';

interface News {
  id: number;
  title: string;
  content: string;
  image_path: string;
  publish_date: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
}

const AdminNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null as File | null,
    publish_date: '',
    status: 'draft' as const,
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get('/admin/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('publish_date', formData.publish_date);
      data.append('status', formData.status);
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingNews) {
        data.append('_method', 'PUT');
        await api.post(`/admin/news/${editingNews.id}`, data);
      } else {
        await api.post('/admin/news', data);
      }

      closeModal();
      fetchNews();
    } catch (error: any) {
      console.error('Error saving news:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        alert('خطا در ذخیره خبر: ' + errorMessages.join(', '));
      } else if (error.response?.data?.message) {
        alert('خطا در ذخیره خبر: ' + error.response.data.message);
      } else {
        alert('خطا در ذخیره خبر: ' + error.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این خبر را حذف کنید؟')) {
      try {
        await api.delete(`/admin/news/${id}`);
        fetchNews();
      } catch (error: any) {
        console.error('Error deleting news:', error);
        if (error.response?.data?.message) {
          alert('خطا در حذف خبر: ' + error.response.data.message);
        } else {
          alert('خطا در حذف خبر: ' + error.message);
        }
      }
    }
  };

  const openModal = (newsItem?: News) => {
    if (newsItem) {
      setEditingNews(newsItem);
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        image: null,
        publish_date: newsItem.publish_date,
        status: newsItem.status,
      });
    } else {
      setEditingNews(null);
      setFormData({
        title: '',
        content: '',
        image: null,
        publish_date: new Date().toISOString().split('T')[0],
        status: 'draft',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setFormData({
      title: '',
      content: '',
      image: null,
      publish_date: '',
      status: 'draft',
    });
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'archived': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'پیش‌نویس';
      case 'published': return 'منتشر شده';
      case 'archived': return 'بایگانی شده';
      default: return status;
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
        <h1 className="text-2xl font-bold text-gray-800">مدیریت اخبار</h1>
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
            <option value="archived">بایگانی شده</option>
          </select>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={16} />
            افزودن خبر
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تصویر</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عنوان</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تاریخ انتشار</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  هیچ خبری یافت نشد
                </td>
              </tr>
            ) : (
              filteredNews.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {item.image_path ? (
                      <img
                        src={`http://localhost:8000/storage/${item.image_path}`}
                        alt={item.title}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xl">📷</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.publish_date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="ویرایش"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingNews ? 'ویرایش خبر' : 'افزودن خبر جدید'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">عنوان</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">محتوا</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-48"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">تاریخ انتشار</label>
                  <input
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">وضعیت</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="draft">پیش‌نویس</option>
                    <option value="published">منتشر شده</option>
                    <option value="archived">بایگانی شده</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">تصویر</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                      className="hidden"
                      id="news-image"
                    />
                    <label
                      htmlFor="news-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {formData.image ? formData.image.name : 'انتخاب تصویر'}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    {editingNews ? 'ذخیره تغییرات' : 'افزودن'}
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

export default AdminNews;
