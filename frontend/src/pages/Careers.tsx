import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  GraduationCap,
  Upload,
} from 'lucide-react';
import api from '../lib/axios';

document.title = 'همکاری با ما - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'فرصت همکاری با مهدکودک هدیه؛ ارسال درخواست همکاری و رزومه'
  );

const careerSchema = z.object({
  first_name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  last_name: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().min(10, 'شماره تماس معتبر نیست'),
  age: z
    .number()
    .min(18, 'سن باید حداقل ۱۸ سال باشد')
    .max(70, 'سن باید حداکثر ۷۰ سال باشد'),
  education: z.string().min(1, 'تحصیلات را انتخاب کنید'),
  field_of_study: z.string().min(1, 'رشته تحصیلی را وارد کنید'),
  work_experience: z.string().optional(),
  skills: z.string().optional(),
  notes: z.string().optional(),
  cv: z.any().optional(),
  confirm: z.literal(true, {
    errorMap: () => ({ message: 'تایید اطلاعات الزامی است' }),
  }),
});

type CareerFormData = z.infer<typeof careerSchema>;

const inputClass =
  'w-full min-h-11 border border-border bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-4 focus:ring-brand-light';

const Careers = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
  });

  const onSubmit = async (data: CareerFormData) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === 'cv' && data.cv instanceof File) {
          formData.append('cv', data.cv);
        } else if (key !== 'cv' && key !== 'confirm') {
          formData.append(
            key,
            data[key as keyof CareerFormData] as string
          );
        }
      });

      await api.post('/job-applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSubmitted(true);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ثبت اطلاعات');
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
              درخواست شما ثبت شد
            </p>

            <h1 className="mt-3 text-3xl font-bold text-ink">
              درخواست همکاری با موفقیت ارسال شد
            </h1>

            <p className="mt-5 text-base leading-8 text-muted">
              پس از بررسی اطلاعات و رزومه شما، در صورت نیاز با شما تماس
              خواهیم گرفت.
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
            فرصت همکاری
          </p>

          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
            بخشی از
              تیم هدیه

            شوید. 
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            اگر به کار با کودکان علاقه‌مند هستید و خودتان را فردی مسئول،
            خلاق و همراه می‌دانید، خوشحال می‌شویم با شما آشنا شویم.
          </p>
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-hedieh">
          <div className="mx-auto max-w-4xl border border-border bg-white">
            {error && (
              <div className="m-6 border border-error bg-red-50 px-4 py-3 text-sm text-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10">
              <section>
                <div className="flex items-start gap-4 border-b border-border pb-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-ink">
                      اطلاعات شخصی
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      اطلاعات اولیه خود را وارد کنید.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-ink">
                      نام
                    </label>
                    <input
                      type="text"
                      {...register('first_name')}
                      className={inputClass}
                    />
                    {errors.first_name && (
                      <p className="mt-1 text-xs text-error">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-ink">
                      نام خانوادگی
                    </label>
                    <input
                      type="text"
                      {...register('last_name')}
                      className={inputClass}
                    />
                    {errors.last_name && (
                      <p className="mt-1 text-xs text-error">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>

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
                      سن
                    </label>
                    <input
                      type="number"
                      {...register('age', { valueAsNumber: true })}
                      className={inputClass}
                    />
                    {errors.age && (
                      <p className="mt-1 text-xs text-error">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="mt-12">
                <div className="flex items-start gap-4 border-b border-border pb-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-light text-brand">
                    <GraduationCap size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-ink">
                      تحصیلات
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      سوابق تحصیلی خود را وارد کنید.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-ink">
                      آخرین مدرک تحصیلی
                    </label>

                    <select
                      {...register('education')}
                      className={inputClass}
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="diploma">دیپلم</option>
                      <option value="associate">فوق دیپلم</option>
                      <option value="bachelor">لیسانس</option>
                      <option value="master">فوق لیسانس</option>
                      <option value="phd">دکترا</option>
                    </select>

                    {errors.education && (
                      <p className="mt-1 text-xs text-error">
                        {errors.education.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-ink">
                      رشته تحصیلی
                    </label>

                    <input
                      type="text"
                      {...register('field_of_study')}
                      className={inputClass}
                    />

                    {errors.field_of_study && (
                      <p className="mt-1 text-xs text-error">
                        {errors.field_of_study.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="mt-12">
                <h2 className="border-b border-border pb-5 text-xl font-bold text-ink">
                  تجربه و مهارت‌ها
                </h2>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-ink">
                      سابقه کار (اختیاری)
                    </label>
                    <textarea
                      {...register('work_experience')}
                      rows={4}
                      className={`${inputClass} py-3`}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-ink">
                      مهارت‌ها (اختیاری)
                    </label>
                    <textarea
                      {...register('skills')}
                      rows={4}
                      className={`${inputClass} py-3`}
                    />
                  </div>
                </div>
              </section>

              <section className="mt-12">
                <h2 className="border-b border-border pb-5 text-xl font-bold text-ink">
                  رزومه
                </h2>

                <div className="mt-6 border border-dashed border-border bg-cream p-7 text-center">
                  <Upload className="mx-auto text-brand" size={30} />

                  <p className="mt-3 text-sm font-semibold text-ink">
                    رزومه خود را انتخاب کنید
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    PDF, DOC, DOCX — حداکثر ۵MB
                  </p>

                  <input
                    type="file"
                    {...register('cv')}
                    accept=".pdf,.doc,.docx"
                    className="mt-5 w-full text-sm text-muted"
                  />
                </div>
              </section>

              <section className="mt-8">
                <label className="mb-2 block text-sm font-semibold text-ink">
                  توضیحات اضافی (اختیاری)
                </label>

                <textarea
                  {...register('notes')}
                  rows={4}
                  className={`${inputClass} py-3`}
                />
              </section>

              <div className="mt-8 border-t border-border pt-7">
                <label className="flex items-start gap-3 text-sm text-muted">
                  <input
                    type="checkbox"
                    {...register('confirm')}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-brand"
                  />

                  <span>اطلاعات وارد شده را تایید می‌کنم.</span>
                </label>

                {errors.confirm && (
                  <p className="mt-2 text-xs text-error">
                    {errors.confirm.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand px-7 text-sm font-bold text-white transition-all hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست'}
                  {!isSubmitting && <ArrowLeft size={18} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;