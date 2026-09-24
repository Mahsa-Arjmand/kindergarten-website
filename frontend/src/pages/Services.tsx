import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import { Service } from '../types';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getStorageUrl = (path?: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');
  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'خدمات - مهدکودک هدیه';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'خدمات و برنامه‌های آموزشی مهدکودک هدیه برای رشد، یادگیری و شکوفایی کودکان'
      );

    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <main className="bg-cream">
      {/* Header - compact like Home */}
      <section className="border-b border-border-light bg-white">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">برنامه‌های مهدکودک</p>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
            <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
              برنامه‌هایی برای
              <span className="text-brand-dark"> رشد و تجربه کردن.</span>
            </h1>
            <p className="max-w-[520px] text-[15px] leading-8 text-muted">
              خدمات و برنامه‌های مهدکودک هدیه با هدف ایجاد تجربه‌ای متنوع، امن و متناسب با نیازهای کودکان طراحی شده‌اند.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-warm-white py-8 lg:py-10">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light border-t-brand-dark" />
            </div>
          ) : services.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative overflow-hidden">
                    {service.image_path ? (
                      <img
                        src={getStorageUrl(service.image_path)}
                        alt={service.title}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-sage-light">
                        <Sparkles className="text-brand-dark" size={28} aria-hidden="true" />
                      </div>
                    )}
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[11px] font-bold text-brand-dark shadow-sm">
                      ۰{index + 1}
                    </span>
                  </div>

                  <div className="p-5">
                    <h2 className="text-[16px] font-extrabold leading-7 text-ink">
                      {service.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-[13.5px] leading-7 text-muted">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-[12px] font-bold text-brand-dark">
                      <Check size={14} aria-hidden="true" />
                      مناسب برای مسیر رشد کودک
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-white px-4 py-10 text-center text-[13.5px] text-muted">
              هنوز خدمتی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* CTA - tight */}
      <section className="border-t border-border-light bg-white">
        <div className="container-hedieh flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[14px] font-extrabold text-ink">درباره برنامه‌های ما سؤال دارید؟</p>
            <p className="mt-1 text-[13px] text-muted">برای دریافت اطلاعات بیشتر با مهدکودک هدیه در ارتباط باشید.</p>
          </div>
          <Link
            to="/contact"
            style={{ color: '#000' }}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-[14px] font-bold !text-ink shadow-sm transition hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
          >
            تماس با ما
            <ArrowLeft size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
