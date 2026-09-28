import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Plus, Edit, Trash2, Search, X, Upload } from 'lucide-react';
import { toJalaali, toGregorian } from 'jalaali-js';

interface Child {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: 'male' | 'female';
  age_group: string;
  class_name: string;
  parent_name: string;
  parent_phone: string;
  enrollment_date: string;
  status: 'active' | 'graduated' | 'withdrawn';
  notes: string;
  photo_path: string;
  is_active: boolean;
  order: number;
}

const AdminChildren = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: 'male' as 'male' | 'female',
    age_group: '',
    class_name: '',
    parent_name: '',
    parent_phone: '',
    enrollment_date: '',
    status: 'active' as 'active' | 'graduated' | 'withdrawn',
    notes: '',
    photo: null as File | null,
    is_active: true,
    order: 0,
  });

  // Helper functions for date conversion
  const gregorianToJalali = (gregorianDate: string): string => {
    if (!gregorianDate) return '';
    try {
      const [year, month, day] = gregorianDate.split('-').map(Number);
      const jalaali = toJalaali(year, month, day);
      return `${jalaali.jy}/${String(jalaali.jm).padStart(2, '0')}/${String(jalaali.jd).padStart(2, '0')}`;
    } catch (error) {
      console.error('Error converting date:', error);
      return gregorianDate;
    }
  };

  const jalaliToGregorian = (jalaliDate: string): string => {
    if (!jalaliDate) return '';
    try {
      const [year, month, day] = jalaliDate.split('/').map(Number);
      const gregorian = toGregorian(year, month, day);
      return `${gregorian.gy}-${String(gregorian.gm).padStart(2, '0')}-${String(gregorian.gd).padStart(2, '0')}`;
    } catch (error) {
      console.error('Error converting date:', error);
      return jalaliDate;
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      console.log('Fetching children...');
      const response = await api.get('/admin/children');
      console.log('Children data received:', response.data);
      setChildren(response.data);
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('first_name', formData.first_name);
      data.append('last_name', formData.last_name);
      if (formData.birth_date) {
        data.append('birth_date', jalaliToGregorian(formData.birth_date));
      }
      if (formData.gender) {
        data.append('gender', formData.gender);
      }
      if (formData.age_group) {
        data.append('age_group', formData.age_group);
      }
      if (formData.class_name) {
        data.append('class_name', formData.class_name);
      }
      data.append('parent_name', formData.parent_name);
      if (formData.parent_phone) {
        data.append('parent_phone', formData.parent_phone);
      }
      if (formData.enrollment_date) {
        data.append('enrollment_date', jalaliToGregorian(formData.enrollment_date));
      }
      if (formData.status) {
        data.append('status', formData.status);
      }
      if (formData.notes) {
        data.append('notes', formData.notes);
      }
      data.append('is_active', formData.is_active ? '1' : '0');
      data.append('order', formData.order.toString());
      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      console.log('Submitting child:', editingChild ? 'UPDATE' : 'CREATE', editingChild?.id);

      if (editingChild) {
        if (formData.photo) {
          data.append('_method', 'PUT');
          const response = await api.post(`/admin/children/${editingChild.id}`, data);
          console.log('Update response:', response.data);
        } else {
          const response = await api.put(`/admin/children/${editingChild.id}`, {
            first_name: formData.first_name,
            last_name: formData.last_name,
            birth_date: formData.birth_date ? jalaliToGregorian(formData.birth_date) : null,
            gender: formData.gender || null,
            age_group: formData.age_group || null,
            class_name: formData.class_name || null,
            parent_name: formData.parent_name,
            parent_phone: formData.parent_phone || null,
            enrollment_date: formData.enrollment_date ? jalaliToGregorian(formData.enrollment_date) : null,
            status: formData.status || null,
            notes: formData.notes || null,
            is_active: formData.is_active ? 1 : 0,
            order: formData.order
          });
          console.log('Update response:', response.data);
        }
        
        closeModal();
        fetchChildren();
      } else {
        const response = await api.post('/admin/children', data);
        console.log('Create response:', response.data);
        
        closeModal();
        fetchChildren();
      }
    } catch (error: any) {
      console.error('Error saving child:', error);
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        alert('خطا در ذخیره کودک: ' + errorMessages.join(', '));
      } else if (error.response?.data?.message) {
        alert('خطا در ذخیره کودک: ' + error.response.data.message);
      } else {
        alert('خطا در ذخیره کودک: ' + error.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این کودک را حذف کنید؟')) {
      try {
        await api.delete(`/admin/children/${id}`);
        fetchChildren();
      } catch (error: any) {
        console.error('Error deleting child:', error);
        if (error.response?.data?.message) {
          alert('خطا در حذف کودک: ' + error.response.data.message);
        } else {
          alert('خطا در حذف کودک: ' + error.message);
        }
      }
    }
  };

  const openModal = (child?: Child) => {
    if (child) {
      setEditingChild(child);
      setFormData({
        first_name: child.first_name,
        last_name: child.last_name,
        birth_date: gregorianToJalali(child.birth_date),
        gender: child.gender,
        age_group: child.age_group,
        class_name: child.class_name,
        parent_name: child.parent_name,
        parent_phone: child.parent_phone,
        enrollment_date: child.enrollment_date ? gregorianToJalali(child.enrollment_date) : '',
        status: child.status,
        notes: child.notes,
        photo: null,
        is_active: child.is_active,
        order: child.order,
      });
    } else {
      setEditingChild(null);
      setFormData({
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: 'male',
        age_group: '',
        class_name: '',
        parent_name: '',
        parent_phone: '',
        enrollment_date: '',
        status: 'active',
        notes: '',
        photo: null,
        is_active: true,
        order: 0,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingChild(null);
    setFormData({
      first_name: '',
      last_name: '',
      birth_date: '',
      gender: 'male',
      age_group: '',
      class_name: '',
      parent_name: '',
      parent_phone: '',
      enrollment_date: '',
      status: 'active',
      notes: '',
      photo: null,
      is_active: true,
      order: 0,
    });
  };

  const filteredChildren = children.filter(child =>
    child.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parent_name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-800">مدیریت کودکان</h1>
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
            افزودن کودک
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تصویر</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">نام</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تاریخ تولد</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">کلاس</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">ولی</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredChildren.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  هیچ کودکی یافت نشد
                </td>
              </tr>
            ) : (
              filteredChildren.map((child) => (
                <tr key={child.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {child.photo_path ? (
                      <img
                        src={`http://localhost:8000/storage/${child.photo_path}`}
                        alt={`${child.first_name} ${child.last_name}`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xl">👶</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {child.first_name} {child.last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{gregorianToJalali(child.birth_date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{child.class_name || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{child.parent_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      child.status === 'active' ? 'bg-green-100 text-green-700' :
                      child.status === 'graduated' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {child.status === 'active' ? 'فعال' :
                       child.status === 'graduated' ? 'فارغ‌التحصیل' : 'خروج'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openModal(child)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="ویرایش"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(child.id)}
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
                  {editingChild ? 'ویرایش کودک' : 'افزودن کودک جدید'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">نام</label>
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">نام خانوادگی</label>
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">تاریخ تولد (شمسی)</label>
                    <input
                      type="text"
                      value={formData.birth_date}
                      onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                      placeholder="مثال: 1403/05/15"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">جنسیت</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="male">پسر</option>
                      <option value="female">دختر</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">گروه سنی</label>
                    <input
                      type="text"
                      value={formData.age_group}
                      onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="مثال: 2-4 سال"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">کلاس</label>
                    <input
                      type="text"
                      value={formData.class_name}
                      onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="مثال: کلاس پروانه"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">نام ولی</label>
                    <input
                      type="text"
                      value={formData.parent_name}
                      onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">شماره تماس ولی</label>
                    <input
                      type="text"
                      value={formData.parent_phone}
                      onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">تاریخ ثبت‌نام (شمسی)</label>
                    <input
                      type="text"
                      value={formData.enrollment_date}
                      onChange={(e) => setFormData({ ...formData, enrollment_date: e.target.value })}
                      placeholder="مثال: 1403/09/01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">وضعیت</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'graduated' | 'withdrawn' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="active">فعال</option>
                      <option value="graduated">فارغ‌التحصیل</option>
                      <option value="withdrawn">خروج</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">توضیحات</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">تصویر</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                      className="hidden"
                      id="child-photo"
                    />
                    <label
                      htmlFor="child-photo"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {formData.photo ? formData.photo.name : 'انتخاب تصویر'}
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
                    {editingChild ? 'ذخیره تغییرات' : 'افزودن'}
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

export default AdminChildren;
