import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Eye, Check, X, Search, Filter } from 'lucide-react';

interface Registration {
  id: number;
  registration_id: string;
  child_first_name: string;
  child_last_name: string;
  child_birth_date: string;
  child_gender: 'male' | 'female';
  age_group: string;
  parent_first_name: string;
  parent_last_name: string;
  parent_relation: string;
  phone: string;
  email: string;
  preferred_program: string;
  preferred_time: string;
  notes: string;
  status: 'new' | 'reviewing' | 'approved' | 'rejected';
  created_at: string;
}

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await api.get('/admin/registrations');
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/admin/registrations/${id}`, { status });
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('خطا در تغییر وضعیت');
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.child_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.child_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.parent_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.registration_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || reg.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جدید';
      case 'reviewing': return 'در حال بررسی';
      case 'approved': return 'تایید شده';
      case 'rejected': return 'رد شده';
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
        <h1 className="text-2xl font-bold text-gray-800">مدیریت ثبت‌نام‌ها</h1>
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
            <option value="new">جدید</option>
            <option value="reviewing">در حال بررسی</option>
            <option value="approved">تایید شده</option>
            <option value="rejected">رد شده</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">کد ثبت‌نام</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">نام کودک</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">سن</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">نام والد</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">برنامه</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  هیچ ثبت‌نامی یافت نشد
                </td>
              </tr>
            ) : (
              filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{reg.registration_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {reg.child_first_name} {reg.child_last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{reg.age_group}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {reg.parent_first_name} {reg.parent_last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{reg.preferred_program}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
                      {getStatusText(reg.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setSelectedRegistration(reg)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="مشاهده جزئیات"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => updateStatus(reg.id, 'reviewing')}
                        className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                        title="شروع بررسی"
                      >
                        <Filter size={16} />
                      </button>
                      <button
                        onClick={() => updateStatus(reg.id, 'approved')}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        title="تایید"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => updateStatus(reg.id, 'rejected')}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="رد"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">جزئیات ثبت‌نام</h2>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">کد ثبت‌نام</label>
                    <p className="text-gray-800">{selectedRegistration.registration_id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">وضعیت</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRegistration.status)}`}>
                      {getStatusText(selectedRegistration.status)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-bold text-gray-800 mb-3">اطلاعات کودک</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">نام</label>
                      <p className="text-gray-800">{selectedRegistration.child_first_name} {selectedRegistration.child_last_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">جنسیت</label>
                      <p className="text-gray-800">{selectedRegistration.child_gender === 'male' ? 'پسر' : 'دختر'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">تاریخ تولد</label>
                      <p className="text-gray-800">{selectedRegistration.child_birth_date}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">گروه سنی</label>
                      <p className="text-gray-800">{selectedRegistration.age_group}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-bold text-gray-800 mb-3">اطلاعات والد</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">نام</label>
                      <p className="text-gray-800">{selectedRegistration.parent_first_name} {selectedRegistration.parent_last_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">نسبت</label>
                      <p className="text-gray-800">{selectedRegistration.parent_relation}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">تلفن</label>
                      <p className="text-gray-800">{selectedRegistration.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">ایمیل</label>
                      <p className="text-gray-800">{selectedRegistration.email}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-bold text-gray-800 mb-3">اطلاعات ثبت‌نام</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">برنامه مورد نظر</label>
                      <p className="text-gray-800">{selectedRegistration.preferred_program}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">زمان ترجیحی</label>
                      <p className="text-gray-800">{selectedRegistration.preferred_time || 'ثبت نشده'}</p>
                    </div>
                  </div>
                </div>

                {selectedRegistration.notes && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-bold text-gray-800 mb-3">توضیحات اضافی</h3>
                    <p className="text-gray-600">{selectedRegistration.notes}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">تغییر وضعیت</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {updateStatus(selectedRegistration.id, 'reviewing'); setSelectedRegistration(null);}}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      شروع بررسی
                    </button>
                    <button
                      onClick={() => {updateStatus(selectedRegistration.id, 'approved'); setSelectedRegistration(null);}}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      تایید
                    </button>
                    <button
                      onClick={() => {updateStatus(selectedRegistration.id, 'rejected'); setSelectedRegistration(null);}}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      رد
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRegistrations;
