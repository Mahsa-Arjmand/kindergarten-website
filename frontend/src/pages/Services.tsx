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

document.title = 'خدمات - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'خدمات و برنامه‌های آموزشی مهدکودک هدیه برای رشد، یادگیری و شکوفایی کودکان'
  );

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-border bg-cream">
        <div className="container-hedieh py-16 sm:py-20">
          <p className="mb-4 text-sm font-bold text-brand">
            برنامه‌های مهدکودک
          </p>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h1 className="text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
              برنامه‌هایی برای
              <span className="text-brand"> رشد و تجربه کردن.</span>
            </h1>

            <p className="max-w-xl text-base leading-8 text-muted">
              خدمات و برنامه‌های مهدکودک هدیه با هدف ایجاد تجربه‌ای متنوع،
              امن و متناسب با نیازهای کودکان طراحی شده‌اند.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-warm-white">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-light border-t-brand" />
            </div>
          ) : services.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <article key={service.id} className="group">
                  <div className="relative overflow-hidden bg-sage-light">
                    {service.image_path ? (
                      <img
                        src={getStorageUrl(service.image_path)}
                        alt={service.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center">
                        <Sparkles className="text-brand" size={34} />
                      </div>
                    )}

                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-brand shadow-sm">
                      ۰{index + 1}
                    </span>
                  </div>

                  <div className="pt-5">
                    <h2 className="text-xl font-bold text-ink">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-muted">
                      {service.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-brand">
                      <Check size={15} />
                      مناسب برای مسیر رشد کودک
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-16 text-center text-muted">
              هنوز خدمتی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-white">
        <div className="container-hedieh flex flex-col gap-5 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-ink">
              درباره برنامه‌های ما سؤال دارید؟
            </p>

            <p className="mt-1 text-sm text-muted">
              برای دریافت اطلاعات بیشتر با مهدکودک هدیه در ارتباط باشید.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-bold text-white transition-all hover:bg-brand-dark"
          >
            تماس با ما
            <ArrowLeft size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;