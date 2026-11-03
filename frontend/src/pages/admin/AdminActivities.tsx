import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Plus, Edit, Trash2, Search, X, Upload } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
const getStorageUrl = (path?: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');
  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

interface Activity {
  id: number;
  title: string;
  description: string;
  image_path: string;
  age_group: string;
  created_at: string;
}

const AdminActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    age_group: '',
    image: null as File | null,
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get('/admin/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('age_group', formData.age_group);
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingActivity) {
        data.append('_method', 'PUT');
        await api.post(`/admin/activities/${editingActivity.id}`, data);
      } else {
        await api.post('/admin/activities', data);
      }

      closeModal();
      fetchActivities();
    } catch (error: any) {
      console.error('Error saving activity:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        alert('خطا در ذخیره فعالیت: ' + errorMessages.join(', '));
      } else if (error.response?.data?.message) {
        alert('خطا در ذخیره فعالیت: ' + error.response.data.message);
      } else {
        alert('خطا در ذخیره فعالیت: ' + error.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این فعالیت را حذف کنید؟')) {
      try {
        await api.delete(`/admin/activities/${id}`);
        fetchActivities();
      } catch (error: any) {
        console.error('Error deleting activity:', error);
        if (error.response?.data?.message) {
          alert('خطا در حذف فعالیت: ' + error.response.data.message);
        } else {
          alert('خطا در حذف فعالیت: ' + error.message);
        }
      }
    }
  };

  const openModal = (activity?: Activity) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        title: activity.title,
        description: activity.description,
        age_group: activity.age_group,
        image: null,
      });
    } else {
      setEditingActivity(null);
      setFormData({
        title: '',
        description: '',
        age_group: '',
        image: null,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingActivity(null);
    setFormData({
      title: '',
      description: '',
      age_group: '',
      image: null,
    });
  };

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">مدیریت فعالیت‌ها</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full sm:w-auto"
            />
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={16} />
            افزودن فعالیت
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Mobile: Card Layout */}
        <div className="md:hidden space-y-4 p-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              هیچ فعالیتی یافت نشد
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4 mb-3">
                  {activity.image_path ? (
                    <img
                      src={getStorageUrl(activity.image_path)}
                      alt={activity.title}
                      className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-2xl">📷</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.age_group}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{activity.description}</p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => openModal(activity)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="ویرایش"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="حذف"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تصویر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عنوان</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">گروه سنی</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">توضیحات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    هیچ فعالیتی یافت نشد
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {activity.image_path ? (
                        <img
                          src={getStorageUrl(activity.image_path)}
                          alt={activity.title}
                          className="w-16 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xl">📷</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{activity.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{activity.age_group}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{activity.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => openModal(activity)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="ویرایش"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  {editingActivity ? 'ویرایش فعالیت' : 'افزودن فعالیت جدید'}
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
                  <label className="block text-sm font-medium text-gray-600 mb-1">گروه سنی</label>
                  <input
                    type="text"
                    value={formData.age_group}
                    onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="مثال: ۳-۵ سال"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">توضیحات</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">تصویر</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                      className="hidden"
                      id="activity-image"
                    />
                    <label
                      htmlFor="activity-image"
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
                    {editingActivity ? 'ذخیره تغییرات' : 'افزودن'}
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

export default AdminActivities;
