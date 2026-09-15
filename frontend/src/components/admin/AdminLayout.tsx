import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, MessageSquare, User, Palette, Activity, Image, Newspaper, HelpCircle, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'داشبورد', path: '/admin', icon: LayoutDashboard },
    { name: 'ثبت‌نام‌ها', path: '/admin/registrations', icon: Users },
    { name: 'درخواست‌های همکاری', path: '/admin/job-applications', icon: Briefcase },
    { name: 'پیام‌ها', path: '/admin/messages', icon: MessageSquare },
    { name: 'مربیان', path: '/admin/teachers', icon: User },
    { name: 'خدمات', path: '/admin/services', icon: Palette },
    { name: 'فعالیت‌ها', path: '/admin/activities', icon: Activity },
    { name: 'گالری', path: '/admin/gallery', icon: Image },
    { name: 'اخبار', path: '/admin/news', icon: Newspaper },
    { name: 'سوالات متداول', path: '/admin/faqs', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 right-0 z-40 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">پنل مدیریت</h1>
          <p className="text-sm text-gray-600">کودکستان هدیه</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>خروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
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
