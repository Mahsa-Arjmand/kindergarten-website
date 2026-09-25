import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Plus, Edit, Trash2, Search, X, Upload } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  education: string;
  specialization: string;
  experience: string;
  bio: string;
  image_path: string;
  is_active: boolean;
  order: number;
}

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    specialization: '',
    experience: '',
    bio: '',
    image: null as File | null,
    is_active: true,
    order: 0,
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      console.log('Fetching teachers...');
      const response = await api.get('/admin/teachers');
      console.log('Teachers data received:', response.data);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('education', formData.education);
      data.append('specialization', formData.specialization);
      data.append('experience', formData.experience);
      data.append('bio', formData.bio);
      data.append('is_active', formData.is_active ? '1' : '0');
      data.append('order', formData.order.toString());
      if (formData.image) {
        data.append('image', formData.image);
      }

      console.log('Submitting teacher:', editingTeacher ? 'UPDATE' : 'CREATE', editingTeacher?.id);

      if (editingTeacher) {
        if (formData.image) {
          data.append('_method', 'PUT');
          const response = await api.post(`/admin/teachers/${editingTeacher.id}`, data);
          console.log('Update response:', response.data);
        } else {
          const response = await api.put(`/admin/teachers/${editingTeacher.id}`, {
            name: formData.name,
            education: formData.education,
            specialization: formData.specialization,
            experience: formData.experience,
            bio: formData.bio,
            is_active: formData.is_active ? 1 : 0,
            order: formData.order
          });
          console.log('Update response:', response.data);
        }
        
        closeModal();
        fetchTeachers();
      } else {
        const response = await api.post('/admin/teachers', data);
        console.log('Create response:', response.data);
        
        closeModal();
        fetchTeachers();
      }
    } catch (error: any) {
      console.error('Error saving teacher:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        alert('خطا در ذخیره مربی: ' + errorMessages.join(', '));
      } else if (error.response?.data?.message) {
        alert('خطا در ذخیره مربی: ' + error.response.data.message);
      } else {
        alert('خطا در ذخیره مربی: ' + error.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این مربی را حذف کنید؟')) {
      try {
        await api.delete(`/admin/teachers/${id}`);
        fetchTeachers();
      } catch (error: any) {
        console.error('Error deleting teacher:', error);
        if (error.response?.data?.message) {
          alert('خطا در حذف مربی: ' + error.response.data.message);
        } else {
          alert('خطا در حذف مربی: ' + error.message);
        }
      }
    }
  };

  const openModal = (teacher?: Teacher) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        name: teacher.name,
        education: teacher.education,
        specialization: teacher.specialization,
        experience: teacher.experience,
        bio: teacher.bio,
        image: null,
        is_active: teacher.is_active,
        order: teacher.order,
      });
    } else {
      setEditingTeacher(null);
      setFormData({
        name: '',
        education: '',
        specialization: '',
        experience: '',
        bio: '',
        image: null,
        is_active: true,
        order: 0,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTeacher(null);
    setFormData({
      name: '',
      education: '',
      specialization: '',
      experience: '',
      bio: '',
      image: null,
      is_active: true,
      order: 0,
    });
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">مدیریت مربیان</h1>
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
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={16} />
            افزودن مربی
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تصویر</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">نام</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تحصیلات</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تخصص</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">سابقه</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  هیچ مربی یافت نشد
                </td>
              </tr>
            ) : (
              filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {teacher.image_path ? (
                      <img
                        src={`http://localhost:8000/storage/${teacher.image_path}`}
                        alt={teacher.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xl">👤</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{teacher.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.education}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.specialization}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.experience}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${teacher.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {teacher.is_active ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openModal(teacher)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="ویرایش"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id)}
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
                  {editingTeacher ? 'ویرایش مربی' : 'افزودن مربی جدید'}
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
                  <label className="block text-sm font-medium text-gray-600 mb-1">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">تحصیلات</label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">تخصص</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">سابقه کاری</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">بیوگرافی</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
                      id="teacher-image"
                    />
                    <label
                      htmlFor="teacher-image"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {formData.image ? formData.image.name : 'انتخاب تصویر'}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="is_active" className="text-sm text-gray-600">فعال</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">ترتیب نمایش</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
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
                    {editingTeacher ? 'ذخیره تغییرات' : 'افزودن'}
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

export default AdminTeachers;
