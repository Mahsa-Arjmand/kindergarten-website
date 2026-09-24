import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { DashboardStats } from '../../types';
import { Users, Briefcase, MessageSquare, User as UserIcon, Palette, Activity, Image } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data);
      } catch (error: any) {
        console.error('Error fetching stats:', error);
        if (error.response?.data?.message) {
          console.error('API Error:', error.response.data.message);
        } else if (error.message) {
          console.error('Network Error:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 mb-2">خطا در بارگذاری اطلاعات داشبورد</p>
        <p className="text-red-500 text-sm">لطفاً بررسی کنید که به اینترنت متصل هستید و دوباره تلاش کنید</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: 'ثبت‌نام‌ها',
      value: stats.registrations.total,
      new: stats.registrations.new,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'درخواست‌های همکاری',
      value: stats.job_applications.total,
      new: stats.job_applications.new,
      icon: Briefcase,
      color: 'bg-green-500',
    },
    {
      title: 'پیام‌های تماس',
      value: stats.contact_messages.total,
      new: stats.contact_messages.unread,
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
    {
      title: 'مربیان',
      value: stats.teachers,
      icon: UserIcon,
      color: 'bg-orange-500',
    },
    {
      title: 'خدمات',
      value: stats.services,
      icon: Palette,
      color: 'bg-pink-500',
    },
    {
      title: 'فعالیت‌ها',
      value: stats.activities,
      icon: Activity,
      color: 'bg-indigo-500',
    },
    {
      title: 'گالری',
      value: stats.gallery,
      icon: Image,
      color: 'bg-teal-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">داشبورد</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                {card.new && card.new > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                    {card.new} جدید
                  </span>
                )}
              </div>
              <h3 className="text-gray-600 text-xs mb-1">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">وضعیت ثبت‌نام‌ها</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-gray-600 text-sm">جدید</span>
              <span className="font-bold text-blue-600 text-sm">{stats.registrations.new}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
              <span className="text-gray-600 text-sm">در حال بررسی</span>
              <span className="font-bold text-yellow-600 text-sm">{stats.registrations.reviewing}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-gray-600 text-sm">تایید شده</span>
              <span className="font-bold text-green-600 text-sm">{stats.registrations.approved}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
              <span className="text-gray-600 text-sm">رد شده</span>
              <span className="font-bold text-red-600 text-sm">{stats.registrations.rejected}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">وضعیت درخواست‌های همکاری</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-gray-600 text-sm">جدید</span>
              <span className="font-bold text-blue-600 text-sm">{stats.job_applications.new}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
              <span className="text-gray-600 text-sm">در حال بررسی</span>
              <span className="font-bold text-yellow-600 text-sm">{stats.job_applications.reviewing}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
              <span className="text-gray-600 text-sm">مصاحبه</span>
              <span className="font-bold text-purple-600 text-sm">{stats.job_applications.interview}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-gray-600 text-sm">تایید شده</span>
              <span className="font-bold text-green-600 text-sm">{stats.job_applications.accepted}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
              <span className="text-gray-600 text-sm">رد شده</span>
              <span className="font-bold text-red-600 text-sm">{stats.job_applications.rejected}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
