import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Heart, BookOpen, Music, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Service, Activity, Teacher, Gallery } from '../types';

// SEO metadata for Home page
document.title = 'کودکستان هدیه - آینده‌ای روشن برای کودکان شما';
document.querySelector('meta[name="description"]')?.setAttribute('content', 'کودکستان هدیه - محیطی امن و شاد برای رشد و شکوفایی کودکان شما با بهترین مربیان و برنامه‌های آموزشی');

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [gallery, setGallery] = useState<Gallery[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, activitiesRes, teachersRes, galleryRes] = await Promise.all([
          api.get('/services'),
          api.get('/activities'),
          api.get('/teachers'),
          api.get('/gallery'),
        ]);
        setServices(servicesRes.data.slice(0, 3));
        setActivities(activitiesRes.data.slice(0, 4));
        setTeachers(teachersRes.data.slice(0, 3));
        setGallery(galleryRes.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const features = [
    { icon: Heart, title: 'محیط امن و شاد', description: 'فضایی گرم و امن برای رشد کودکان' },
    { icon: Users, title: 'مربیان باتجربه', description: 'تیم آموزشی متخصص و دلسوز' },
    { icon: BookOpen, title: 'آموزش خلاقانه', description: 'روش‌های نوین آموزشی' },
    { icon: Music, title: 'فعالیت‌های متنوع', description: 'برنامه‌های هنری و ورزشی' },
    { icon: Palette, title: 'توجه فردی', description: 'نظر به رشد شخصی هر کودک' },
    { icon: Star, title: 'ارتباط با والدین', description: 'گزارش‌دهی مستمر و تعامل موثر' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              کودکستان هدیه
              <br />
              <span className="text-3xl lg:text-4xl">آینده‌ای روشن برای کودکان شما</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              محیطی امن، شاد و آموزشی برای رشد و شکوفایی کودکان دلبند شما
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/registration"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all text-center"
              >
                ثبت‌نام آنلاین
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all text-center"
              >
                آشنایی با ما
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-50 to-transparent" />
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              درباره کودکستان هدیه
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              کودکستان هدیه با بیش از ۱۰ سال تجربه در حوزه آموزش و پرورش کودکان، با بهره‌گیری از
              مربیان متخصص و محیطی امن و شاد، تلاش می‌کند تا بهترین تجربه آموزشی را برای کودکان شما
              فراهم کند. رویکرد ما بر پایه احترام به فردیت هر کودک و توجه به نیازهای خاص او استوار است.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
            چرا کودکستان هدیه؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">خدمات ما</h2>
            <Link
              to="/services"
              className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              مشاهده همه
              <ArrowRight className="mr-2" size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {service.image_path && (
                  <img
                    src={`http://localhost:8000/storage/${service.image_path}`}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">فعالیت‌ها</h2>
            <Link
              to="/activities"
              className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              مشاهده همه
              <ArrowRight className="mr-2" size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {activity.image_path && (
                  <img
                    src={`http://localhost:8000/storage/${activity.image_path}`}
                    alt={activity.title}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{activity.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                  <span className="inline-block mt-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {activity.age_group}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">تیم آموزشی</h2>
            <Link
              to="/teachers"
              className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              مشاهده همه
              <ArrowRight className="mr-2" size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {teacher.image_path && (
                  <img
                    src={`http://localhost:8000/storage/${teacher.image_path}`}
                    alt={teacher.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{teacher.name}</h3>
                  <p className="text-orange-600 font-medium mb-2">{teacher.position}</p>
                  <p className="text-sm text-gray-600">{teacher.education}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">گالری تصاویر</h2>
            <Link
              to="/gallery"
              className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              مشاهده همه
              <ArrowRight className="mr-2" size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gallery.map((item) => (
              <div key={item.id} className="relative group overflow-hidden rounded-xl">
                <img
                  src={`http://localhost:8000/storage/${item.image_path}`}
                  alt={item.title}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            آماده‌اید کودک خود را ثبت‌نام کنید؟
          </h2>
          <p className="text-xl mb-8 text-white/90">
            همین الان درخواست ثبت‌نام آنلاین خود را ارسال کنید
          </p>
          <Link
            to="/registration"
            className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all inline-block"
          >
            ثبت‌نام آنلاین
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
