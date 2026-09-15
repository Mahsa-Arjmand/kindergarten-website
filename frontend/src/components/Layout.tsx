import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'صفحه اصلی', path: '/' },
    { name: 'درباره ما', path: '/about' },
    { name: 'خدمات', path: '/services' },
    { name: 'فعالیت‌ها', path: '/activities' },
    { name: 'مربیان', path: '/teachers' },
    { name: 'گالری', path: '/gallery' },
    { name: 'اخبار', path: '/news' },
    { name: 'سوالات متداول', path: '/faq' },
    { name: 'تماس با ما', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">ه</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">کودکستان هدیه</h1>
                <p className="text-xs text-gray-600">محیطی شاد برای کودکان شما</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/registration"
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-pink-600 transition-all font-medium"
              >
                ثبت‌نام آنلاین
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="lg:hidden py-4 border-t">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/registration"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full text-center hover:from-orange-600 hover:to-pink-600 transition-all font-medium"
                >
                  ثبت‌نام آنلاین
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">کودکستان هدیه</h3>
              <p className="text-gray-300 mb-4">
                محیطی امن و شاد برای رشد و شکوفایی کودکان شما با بهترین مربیان و برنامه‌های آموزشی
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  <Phone size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">دسترسی سریع</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors">
                    خدمات
                  </Link>
                </li>
                <li>
                  <Link to="/registration" className="text-gray-300 hover:text-orange-400 transition-colors">
                    ثبت‌نام
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">اطلاعات تماس</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone size={18} className="text-orange-400" />
                  <span className="text-gray-300">۰۲۱-۱۲۳۴۵۶۷۸</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Mail size={18} className="text-orange-400" />
                  <span className="text-gray-300">info@hedieh-kindergarten.ir</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin size={18} className="text-orange-400" />
                  <span className="text-gray-300">تهران، خیابان اصلی</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© ۱۴۰۵ کودکستان هدیه. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
