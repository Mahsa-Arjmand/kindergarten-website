import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Eye, Check, X, Search, Filter, Download } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
const getStorageUrl = (path?: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');
  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

interface JobApplication {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  education: string;
  field_of_study: string;
  work_experience: string;
  skills: string;
  notes: string;
  cv_path: string;
  status: 'new' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  created_at: string;
}

const AdminJobApplications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/admin/job-applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching job applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      console.log('Updating status for application', id, 'to', status);
      const response = await api.put(`/admin/job-applications/${id}`, { status });
      console.log('Status update response:', response.data);
      // Optimistic update
      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, status: status as any } : app
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('خطا در تغییر وضعیت');
      fetchApplications(); // Refresh on error
    }
  };

  const downloadCV = (cvPath: string) => {
    if (cvPath) {
      window.open(getStorageUrl(cvPath), '_blank');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-yellow-100 text-yellow-700';
      case 'interview': return 'bg-purple-100 text-purple-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جدید';
      case 'reviewing': return 'در حال بررسی';
      case 'interview': return 'مصاحبه';
      case 'accepted': return 'تایید شده';
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">مدیریت درخواست‌های همکاری</h1>
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
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full sm:w-auto"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="new">جدید</option>
            <option value="reviewing">در حال بررسی</option>
            <option value="interview">مصاحبه</option>
            <option value="accepted">تایید شده</option>
            <option value="rejected">رد شده</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Mobile: Card Layout */}
        <div className="md:hidden space-y-4 p-4">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              هیچ درخواستی یافت نشد
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800">{app.first_name} {app.last_name}</h3>
                    <p className="text-sm text-gray-500">{app.age} سال</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {getStatusText(app.status)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">تحصیلات:</span> {app.education} - {app.field_of_study}</p>
                  <p><span className="font-medium">تلفن:</span> {app.phone}</p>
                  <p><span className="font-medium">سابقه کار:</span> {app.work_experience}</p>
                  <p><span className="font-medium">مهارت‌ها:</span> {app.skills}</p>
                </div>
                <div className="flex gap-2 mt-4 justify-end flex-wrap">
                  <button
                    onClick={() => setSelectedApplication(app)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="مشاهده جزئیات"
                  >
                    <Eye size={16} />
                  </button>
                  {app.cv_path && (
                    <button
                      onClick={() => downloadCV(app.cv_path)}
                      className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                      title="دانلود رزومه"
                    >
                      <Download size={16} />
                    </button>
                  )}
                  <button
                    onClick={async () => await updateStatus(app.id, 'reviewing')}
                    className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                    title="شروع بررسی"
                  >
                    <Filter size={16} />
                  </button>
                  <button
                    onClick={async () => await updateStatus(app.id, 'interview')}
                    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                    title="دعوت به مصاحبه"
                  >
                    <Filter size={16} />
                  </button>
                  <button
                    onClick={async () => await updateStatus(app.id, 'accepted')}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    title="تایید"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={async () => await updateStatus(app.id, 'rejected')}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="رد"
                  >
                    <X size={16} />
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
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">نام و نام خانوادگی</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">سن</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تحصیلات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">تلفن</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">وضعیت</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    هیچ درخواستی یافت نشد
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {app.first_name} {app.last_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.age} سال</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.education} - {app.field_of_study}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {getStatusText(app.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="مشاهده جزئیات"
                        >
                          <Eye size={16} />
                        </button>
                        {app.cv_path && (
                          <button
                            onClick={() => downloadCV(app.cv_path)}
                            className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                            title="دانلود رزومه"
                          >
                            <Download size={16} />
                          </button>
                        )}
                        <button
                          onClick={async () => await updateStatus(app.id, 'reviewing')}
                          className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
                          title="شروع بررسی"
                        >
                          <Filter size={16} />
                        </button>
                        <button
                          onClick={async () => await updateStatus(app.id, 'interview')}
                          className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                          title="دعوت به مصاحبه"
                        >
                          <Filter size={16} />
                        </button>
                        <button
                          onClick={async () => await updateStatus(app.id, 'accepted')}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          title="تایید"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={async () => await updateStatus(app.id, 'rejected')}
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
      </div>

      {/* Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">جزئیات درخواست همکاری</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">نام و نام خانوادگی</label>
                    <p className="text-gray-800">{selectedApplication.first_name} {selectedApplication.last_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">سن</label>
                    <p className="text-gray-800">{selectedApplication.age} سال</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">تحصیلات</label>
                    <p className="text-gray-800">{selectedApplication.education}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">رشته تحصیلی</label>
                    <p className="text-gray-800">{selectedApplication.field_of_study}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">تلفن</label>
                  <p className="text-gray-800">{selectedApplication.phone}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">سواب کاری</label>
                  <p className="text-gray-600">{selectedApplication.work_experience || 'ثبت نشده'}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">مهارت‌ها</label>
                  <p className="text-gray-600">{selectedApplication.skills || 'ثبت نشده'}</p>
                </div>

                {selectedApplication.notes && (
                  <div className="border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">توضیحات اضافی</label>
                    <p className="text-gray-600">{selectedApplication.notes}</p>
                  </div>
                )}

                {selectedApplication.cv_path && (
                  <div className="border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">رزومه</label>
                    <button
                      onClick={() => downloadCV(selectedApplication.cv_path)}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      دانلود رزومه
                    </button>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">تغییر وضعیت</label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={async () => {
                        await updateStatus(selectedApplication.id, 'reviewing');
                        setSelectedApplication(null);
                      }}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      شروع بررسی
                    </button>
                    <button
                      onClick={async () => {
                        await updateStatus(selectedApplication.id, 'interview');
                        setSelectedApplication(null);
                      }}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      دعوت به مصاحبه
                    </button>
                    <button
                      onClick={async () => {
                        await updateStatus(selectedApplication.id, 'accepted');
                        setSelectedApplication(null);
                      }}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      تایید
                    </button>
                    <button
                      onClick={async () => {
                        await updateStatus(selectedApplication.id, 'rejected');
                        setSelectedApplication(null);
                      }}
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

export default AdminJobApplications;
