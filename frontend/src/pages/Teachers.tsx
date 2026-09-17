import { ArrowLeft, GraduationCap, Heart, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import { Teacher } from '../types';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getStorageUrl = (path?: string | null) => {
  if (!path) return '';

  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');

  return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
};

document.title = 'تیم آموزشی - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'آشنایی با تیم آموزشی و مربیان متخصص مهدکودک هدیه'
  );

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="border-b border-border bg-cream">
        <div className="container-hedieh py-16 sm:py-20">
          <p className="mb-4 text-sm font-bold text-brand">
            تیم آموزشی
          </p>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <h1 className="text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
              آدم‌هایی که
              <span className="text-brand"> کنار کودک هستند.</span>
            </h1>

            <p className="max-w-xl text-base leading-8 text-muted">
              مربیان بخش مهمی از تجربه کودک در مهدکودک هستند. تیم ما تلاش
              می‌کند با دانش، توجه و همراهی، محیطی قابل اعتماد برای کودکان
              ایجاد کند.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-warm-white">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-light border-t-brand" />
            </div>
          ) : teachers.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teachers.map((teacher) => (
                <article key={teacher.id} className="group">
                  <div className="relative overflow-hidden bg-sage-light">
                    {teacher.image_path ? (
                      <img
                        src={getStorageUrl(teacher.image_path)}
                        alt={teacher.name}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center">
                        <UserRound className="text-brand" size={42} />
                      </div>
                    )}
                  </div>

                  <div className="border-b border-border py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-ink">
                          {teacher.name}
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-brand">
                          {teacher.position}
                        </p>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                        <Heart size={17} />
                      </div>
                    </div>

                    {teacher.education && (
                      <div className="mt-5 flex gap-2 text-sm text-muted">
                        <GraduationCap
                          size={17}
                          className="mt-0.5 shrink-0 text-brand"
                        />
                        <span>{teacher.education}</span>
                      </div>
                    )}

                    {teacher.specialization && (
                      <p className="mt-3 text-sm leading-6 text-muted">
                        <span className="font-semibold text-ink">
                          تخصص:
                        </span>{' '}
                        {teacher.specialization}
                      </p>
                    )}

                    {teacher.bio && (
                      <p className="mt-4 text-sm leading-7 text-muted">
                        {teacher.bio}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-16 text-center text-muted">
              هنوز اطلاعاتی از تیم آموزشی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-sage-light">
        <div className="container-hedieh">
          <div className="grid gap-7 border-y border-border py-12 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold text-brand">
                آشنایی بیشتر
              </p>

              <h2 className="mt-3 text-2xl font-bold text-ink">
                می‌خواهید با مهدکودک هدیه بیشتر آشنا شوید؟
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                می‌توانید درباره خدمات، فعالیت‌ها و نحوه ثبت‌نام اطلاعات
                بیشتری دریافت کنید.
              </p>
            </div>

            <Link
              to="/registration"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-bold text-white transition-all hover:bg-brand-dark"
            >
              ثبت‌نام
              <ArrowLeft size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Teachers;