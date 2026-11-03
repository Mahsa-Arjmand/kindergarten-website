import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CheckCircle,
  MapPin,
  Navigation,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import api from '../lib/axios';
import MapLocation, { HEDIYEH_LOCATION } from '../components/MapLocation';

const contactSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().min(10, 'شماره تماس معتبر نیست'),
  email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
  subject: z.string().min(1, 'موضوع را انتخاب کنید'),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass =
  'w-full min-h-11 rounded-xl border border-border bg-white px-4 text-[14px] text-ink outline-none transition focus:border-brand-dark focus:ring-4 focus:ring-brand-light placeholder:text-subtle';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    document.title = 'تماس با مهدکودک هدیه | آدرس و شماره تماس در منظریه زنجان | ثبت‌نام حضوری';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'تماس با مهدکودک هدیه در منظریه زنجان: آدرس دقیق، شماره تلفن و ساعات کاری. برای ثبت‌نام حضوری یا سوالات می‌توانید با ما تماس بگیرید یا به مهدکودک مراجعه کنید.'
      );
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await api.post('/contact-messages', data);
      setSubmitted(true);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ارسال پیام');
    }
  };

  if (submitted) {
    return (
      <main className="bg-cream">
        <div className="container-hedieh flex min-h-[60vh] items-center justify-center py-12">
          <div className="w-full max-w-[560px] rounded-2xl border border-border bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-brand-dark">
              <CheckCircle size={32} aria-hidden="true" />
            </div>
            <p className="mt-5 text-[13px] font-extrabold tracking-wide text-brand-dark">پیام شما دریافت شد</p>
            <h1 className="mt-2 text-[20px] font-black text-ink sm:text-[24px]">پیام با موفقیت ارسال شد</h1>
            <p className="mt-3 text-[14px] leading-7 text-muted">
              از اینکه با مهدکودک هدیه در ارتباط هستید متشکریم. به‌زودی با شما تماس خواهیم گرفت.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream">
      <section className="border-b border-border-light bg-cream">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">در ارتباط باشیم</p>
          <h1 className="max-w-[560px] text-balance text-[24px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[28px] lg:text-[32px]">
            با مهدکودک هدیه
            <span className="text-brand-dark"> در تماس باشید.</span>
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-muted">
            اگر درباره ثبت‌نام، برنامه‌ها یا شرایط مهدکودک سؤالی دارید، خوشحال می‌شویم با شما صحبت کنیم.
          </p>
        </div>
      </section>

      <section className="bg-warm-white py-8 lg:py-10">
        <div className="container-hedieh grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          {/* Contact info + Map */}
          <div className="rounded-2xl bg-sage-light p-6 sm:p-7">
            <p className="text-[13px] font-extrabold tracking-wide text-brand-dark">اطلاعات تماس</p>
            <h2 className="mt-2 text-[20px] font-black leading-7 text-ink">راه‌های ارتباط با ما</h2>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-dark shadow-sm">
                  <Phone size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[13px] font-extrabold text-ink">تلفن</h3>
                  <a href="tel:02433784937" dir="ltr" className="mt-1 block w-fit text-[13.5px] leading-6 text-muted transition hover:text-ink">
                    024-33784937
                  </a>
                  <a href="tel:09127402532" dir="ltr" className="block w-fit text-[13.5px] leading-6 text-muted transition hover:text-ink">
                    0912-7402532
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-dark shadow-sm">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[13px] font-extrabold text-ink">آدرس</h3>
                  <a
                    href={HEDIYEH_LOCATION.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[13.5px] leading-6 text-muted transition hover:text-brand"
                  >
                    {HEDIYEH_LOCATION.fullAddress}
                  </a>
                </div>
              </div>

              <div className="rounded-xl bg-white/70 px-4 py-4">
                <h3 className="text-[13px] font-extrabold text-ink">ساعات کاری</h3>
                <p className="mt-1.5 text-[13.5px] leading-7 text-muted">
                  شنبه تا پنجشنبه: ۷ صبح تا ۶ عصر
                  <br />
                  جمعه و تعطیلات رسمی: تعطیل
                </p>
              </div>

              {/* Embedded Google Map + Direct Navigation Button */}
              <div className="space-y-3 pt-1">
                <MapLocation height="220px" width="100%" />
                <a
                  href={HEDIYEH_LOCATION.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#fff' }}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[13.5px] font-bold text-white shadow-sm transition hover:bg-brand-dark"
                >
                  <Navigation size={16} aria-hidden="true" />
                  مسیریابی مستقیم در گوگل مپ
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7">
            <p className="text-[13px] font-extrabold tracking-wide text-brand-dark">پیام شما</p>
            <h2 className="mt-2 text-[20px] font-black text-ink">چطور می‌توانیم کمک کنیم؟</h2>

            {error && (
              <div className="mt-5 rounded-xl border border-error/20 bg-red-50 px-4 py-3 text-[13.5px] text-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-[13px] font-bold text-ink">نام و نام خانوادگی</label>
                <input type="text" {...register('name')} className={inputClass} />
                {errors.name && <p className="mt-1.5 text-xs font-medium text-error">{errors.name.message}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[13px] font-bold text-ink">شماره تماس</label>
                  <input type="tel" {...register('phone')} className={inputClass} />
                  {errors.phone && <p className="mt-1.5 text-xs font-medium text-error">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-bold text-ink">ایمیل (اختیاری)</label>
                  <input type="email" {...register('email')} className={inputClass} />
                  {errors.email && <p className="mt-1.5 text-xs font-medium text-error">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-bold text-ink">موضوع</label>
                <select {...register('subject')} className={inputClass}>
                  <option value="">انتخاب کنید</option>
                  <option value="registration">ثبت‌نام</option>
                  <option value="programs">برنامه‌ها</option>
                  <option value="employment">استخدام</option>
                  <option value="general">سایر موارد</option>
                </select>
                {errors.subject && <p className="mt-1.5 text-xs font-medium text-error">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-bold text-ink">پیام</label>
                <textarea {...register('message')} rows={5} className={`${inputClass} py-3`} />
                {errors.message && <p className="mt-1.5 text-xs font-medium text-error">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ color: '#fff' }}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-[14px] font-bold text-white shadow-sm transition hover:bg-brand-dark disabled:opacity-50"
              >
                {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                {!isSubmitting && <ArrowLeft size={17} aria-hidden="true" />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
