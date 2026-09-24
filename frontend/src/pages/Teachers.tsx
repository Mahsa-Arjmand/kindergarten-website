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

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'تیم آموزشی - مهدکودک هدیه';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'آشنایی با تیم آموزشی و مربیان متخصص مهدکودک هدیه');

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
    <main className="bg-cream">
      {/* Header */}
      <section className="border-b border-border-light bg-cream">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">تیم آموزشی</p>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
            <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
             افرادی که
              <span className="text-brand-dark"> کنار کودک شما هستند.</span>
            </h1>
            <p className="max-w-[520px] text-[15px] leading-8 text-muted">
              مربیان بخش مهمی از تجربه کودک در مهدکودک هستند. تیم ما تلاش می‌کند با دانش، توجه و همراهی، محیطی قابل اعتماد برای کودکان ایجاد کند.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-warm-white py-8 lg:py-10">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light border-t-brand-dark" />
            </div>
          ) : teachers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {teachers.map((teacher) => (
                <article
                  key={teacher.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative overflow-hidden">
                    {teacher.image_path ? (
                      <img
                        src={getStorageUrl(teacher.image_path)}
                        alt={teacher.name}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-sage-light">
                        <UserRound className="text-brand-dark" size={32} aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-[16px] font-extrabold leading-6 text-ink">{teacher.name}</h2>
                        <p className="mt-1 text-[13px] font-bold text-brand-dark">{teacher.position}</p>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                        <Heart size={14} fill="currentColor" aria-hidden="true" />
                      </span>
                    </div>

                    {teacher.education && (
                      <div className="mt-3 flex items-start gap-1.5 rounded-xl bg-cream px-3 py-2 text-[12.5px] leading-6 text-muted">
                        <GraduationCap size={14} className="mt-0.5 shrink-0 text-brand-dark" aria-hidden="true" />
                        <span>{teacher.education}</span>
                      </div>
                    )}

                    {teacher.specialization && (
                      <p className="mt-3 text-[13px] leading-6 text-muted">
                        <span className="font-bold text-ink">تخصص:</span> {teacher.specialization}
                      </p>
                    )}

                    {teacher.bio && (
                      <p className="mt-3 line-clamp-3 text-[13.5px] leading-7 text-muted">{teacher.bio}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-white px-4 py-10 text-center text-[13.5px] text-muted">
              هنوز اطلاعاتی از تیم آموزشی ثبت نشده است.
            </div>
          )}
        </div>
      </section>

      {/* CTA - compact */}
      <section className="bg-sage-light/40 py-6">
        <div className="container-hedieh">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="section-kicker mb-1">آشنایی بیشتر</p>
              <h2 className="text-[17px] font-black leading-7 text-ink sm:text-[18px]">می‌خواهید با مهدکودک هدیه بیشتر آشنا شوید؟</h2>
              <p className="mt-1 max-w-[520px] text-[13px] leading-6 text-muted">
                می‌توانید درباره خدمات، فعالیت‌ها و نحوه ثبت‌نام اطلاعات بیشتری دریافت کنید.
              </p>
            </div>
            <Link
              to="/registration"
              style={{ color: '#000' }}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 text-[14px] font-bold !text-ink shadow-sm transition hover:bg-warm-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light"
            >
              ثبت‌نام
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Teachers;
