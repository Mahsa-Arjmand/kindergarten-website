import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import api from '../lib/axios';

document.title = 'تماس با ما - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'اطلاعات تماس و فرم ارتباط با مهدکودک هدیه'
  );

const contactSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().min(10, 'شماره تماس معتبر نیست'),
  email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
  subject: z.string().min(1, 'موضوع را انتخاب کنید'),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass =
  'w-full min-h-11 border border-border bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-4 focus:ring-brand-light';

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
      <main className="min-h-screen bg-cream">
        <div className="container-hedieh flex min-h-[calc(100vh-76px)] items-center justify-center py-16">
          <div className="w-full max-w-2xl border border-border bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage-light text-brand">
              <CheckCircle size={40} />
            </div>

            <p className="mt-7 text-sm font-bold text-brand">
              پیام شما دریافت شد
            </p>

            <h1 className="mt-3 text-3xl font-bold text-ink">
              پیام با موفقیت ارسال شد
            </h1>

            <p className="mt-5 text-base leading-8 text-muted">
              از اینکه با مهدکودک هدیه در ارتباط هستید متشکریم. به‌زودی با شما
              تماس خواهیم گرفت.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-cream">
        <div className="container-hedieh py-16 sm:py-20">
          <p className="mb-4 text-sm font-bold text-brand">
            در ارتباط باشیم
          </p>

          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
            با مهدکودک هدیه
            <span className="text-brand"> در تماس باشید.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            اگر درباره ثبت‌نام، برنامه‌ها یا شرایط مهدکودک سؤالی دارید،
            خوشحال می‌شویم با شما صحبت کنیم.
          </p>
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-hedieh grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact info */}
          <div className="bg-sage-light p-7 sm:p-9">
            <p className="text-sm font-bold text-brand">
              اطلاعات تماس
            </p>

            <h2 className="mt-3 text-2xl font-bold text-ink">
              راه‌های ارتباط با ما
            </h2>

            <div className="mt-8 space-y-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                  <Phone size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-ink">تلفن</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </p>
                  <p className="text-sm leading-6 text-muted">
                    ۰۹۱۲-۱۲۳۴۵۶۷
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                  <Mail size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-ink">ایمیل</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    info@hedieh-kindergarten.ir
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                  <MapPin size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-ink">آدرس</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    تهران، خیابان اصلی، کوچه آموزش
                  </p>
                </div>
              </div>

              <div className="border-t border-black/10 pt-6">
                <h3 className="text-sm font-bold text-ink">
                  ساعات کاری
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted">
                  شنبه تا پنجشنبه: ۷ صبح تا ۶ عصر
                  <br />
                  جمعه: تعطیل
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border border-border bg-white p-7 sm:p-9">
            <p className="text-sm font-bold text-brand">پیام شما</p>

            <h2 className="mt-3 text-2xl font-bold text-ink">
              چطور می‌توانیم کمک کنیم؟
            </h2>

            {error && (
              <div className="mt-6 border border-error bg-red-50 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">
                  نام و نام خانوادگی
                </label>

                <input
                  type="text"
                  {...register('name')}
                  className={inputClass}
                />

                {errors.name && (
                  <p className="mt-1 text-xs text-error">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink">
                    شماره تماس
                  </label>

                  <input
                    type="tel"
                    {...register('phone')}
                    className={inputClass}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-error">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink">
                    ایمیل (اختیاری)
                  </label>

                  <input
                    type="email"
                    {...register('email')}
                    className={inputClass}
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-error">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">
                  موضوع
                </label>

                <select {...register('subject')} className={inputClass}>
                  <option value="">انتخاب کنید</option>
                  <option value="registration">ثبت‌نام</option>
                  <option value="programs">برنامه‌ها</option>
                  <option value="employment">استخدام</option>
                  <option value="general">سایر موارد</option>
                </select>

                {errors.subject && (
                  <p className="mt-1 text-xs text-error">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">
                  پیام
                </label>

                <textarea
                  {...register('message')}
                  rows={6}
                  className={`${inputClass} py-3`}
                />

                {errors.message && (
                  <p className="mt-1 text-xs text-error">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand px-7 text-sm font-bold text-white transition-all hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                {!isSubmitting && <ArrowLeft size={18} />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;