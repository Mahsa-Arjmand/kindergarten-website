import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, MessageSquare, User, Palette, Activity, Image, Newspaper, HelpCircle, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'داشبورد', path: '/admin', icon: LayoutDashboard },
    { name: 'ثبت‌نام‌ها', path: '/admin/registrations', icon: Users },
    { name: 'درخواست‌های همکاری', path: '/admin/job-applications', icon: Briefcase },
    { name: 'مربیان', path: '/admin/teachers', icon: User },
    { name: 'خدمات', path: '/admin/services', icon: Palette },
    { name: 'فعالیت‌ها', path: '/admin/activities', icon: Activity },
    { name: 'گالری', path: '/admin/gallery', icon: Image },
    { name: 'اخبار', path: '/admin/news', icon: Newspaper },
    { name: 'سوالات متداول', path: '/admin/faqs', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-40 w-64 bg-white shadow-sm border-l border-gray-200 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">ه</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">پنل مدیریت</h1>
              <p className="text-xs text-gray-500">کودکستان هدیه</p>
              {(() => {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                  const user = JSON.parse(userStr);
                  return <p className="text-xs text-orange-600 mt-1">مدیر: {user.name}</p>;
                }
                return null;
              })()}
            </div>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 space-x-reverse px-4 py-2.5 rounded-lg transition-colors text-sm ${
                      isActive
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 space-x-reverse w-full px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
          >
            <LogOut size={18} />
            <span>خروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        <Outlet />
      </main>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
