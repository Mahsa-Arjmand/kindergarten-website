import { useState, useEffect } from 'react';
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
  'w-full min-h-11 rounded-xl border border-border bg-white px-4 text-[14px] text-ink outline-none transition focus:border-brand-dark focus:ring-4 focus:ring-brand-light placeholder:text-subtle';

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

  useEffect(() => {
    document.title = 'همکاری با ما - مهدکودک هدیه';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'فرصت همکاری با مهدکودک هدیه؛ ارسال درخواست همکاری و رزومه'
      );
  }, []);

  const onSubmit = async (data: CareerFormData) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'cv' && data.cv instanceof File) {
          formData.append('cv', data.cv);
        } else if (key !== 'cv' && key !== 'confirm') {
          formData.append(key, data[key as keyof CareerFormData] as string);
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
      <main className="bg-cream">
        <div className="container-hedieh flex min-h-[60vh] items-center justify-center py-12">
          <div className="w-full max-w-[560px] rounded-2xl border border-border bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-brand-dark">
              <CheckCircle size={32} aria-hidden="true" />
            </div>
            <p className="mt-5 text-[13px] font-extrabold tracking-wide text-brand-dark">درخواست شما ثبت شد</p>
            <h1 className="mt-2 text-[22px] font-black leading-8 text-ink sm:text-[26px]">
              درخواست همکاری با موفقیت ارسال شد
            </h1>
            <p className="mt-3 text-[14px] leading-7 text-muted">
              پس از بررسی اطلاعات و رزومه شما، در صورت نیاز با شما تماس خواهیم گرفت.
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
          <p className="section-kicker">فرصت همکاری</p>
          <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
            بخشی از
            <span className="text-brand-dark"> تیم هدیه</span> شوید.
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-muted">
            اگر به کار با کودکان علاقه‌مند هستید و خودتان را فردی مسئول، خلاق و همراه می‌دانید، خوشحال می‌شویم با شما آشنا شویم.
          </p>
        </div>
      </section>

      <section className="bg-warm-white py-8 lg:py-10">
        <div className="container-hedieh">
          <div className="mx-auto max-w-[760px] overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            {error && (
              <div className="m-5 rounded-xl border border-error/20 bg-red-50 px-4 py-3 text-[13.5px] text-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
              <section>
                <div className="flex items-start gap-3 border-b border-border-light pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                    <FileText size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-extrabold text-ink">اطلاعات شخصی</h2>
                    <p className="mt-1 text-[13px] text-muted">اطلاعات اولیه خود را وارد کنید.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">نام</label>
                    <input type="text" {...register('first_name')} className={inputClass} />
                    {errors.first_name && <p className="mt-1.5 text-xs font-medium text-error">{errors.first_name.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">نام خانوادگی</label>
                    <input type="text" {...register('last_name')} className={inputClass} />
                    {errors.last_name && <p className="mt-1.5 text-xs font-medium text-error">{errors.last_name.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">شماره تماس</label>
                    <input type="tel" {...register('phone')} className={inputClass} />
                    {errors.phone && <p className="mt-1.5 text-xs font-medium text-error">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">سن</label>
                    <input type="number" {...register('age', { valueAsNumber: true })} className={inputClass} />
                    {errors.age && <p className="mt-1.5 text-xs font-medium text-error">{errors.age.message}</p>}
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <div className="flex items-start gap-3 border-b border-border-light pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-light text-brand-dark">
                    <GraduationCap size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-extrabold text-ink">تحصیلات</h2>
                    <p className="mt-1 text-[13px] text-muted">سوابق تحصیلی خود را وارد کنید.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">آخرین مدرک تحصیلی</label>
                    <select {...register('education')} className={inputClass}>
                      <option value="">انتخاب کنید</option>
                      <option value="diploma">دیپلم</option>
                      <option value="associate">فوق دیپلم</option>
                      <option value="bachelor">لیسانس</option>
                      <option value="master">فوق لیسانس</option>
                      <option value="phd">دکترا</option>
                    </select>
                    {errors.education && <p className="mt-1.5 text-xs font-medium text-error">{errors.education.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">رشته تحصیلی</label>
                    <input type="text" {...register('field_of_study')} className={inputClass} />
                    {errors.field_of_study && <p className="mt-1.5 text-xs font-medium text-error">{errors.field_of_study.message}</p>}
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="border-b border-border-light pb-4 text-[15px] font-extrabold text-ink">تجربه و مهارت‌ها</h2>
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">سابقه کار (اختیاری)</label>
                    <textarea {...register('work_experience')} rows={3} className={`${inputClass} py-3`} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink">مهارت‌ها (اختیاری)</label>
                    <textarea {...register('skills')} rows={3} className={`${inputClass} py-3`} />
                  </div>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="border-b border-border-light pb-4 text-[15px] font-extrabold text-ink">رزومه</h2>
                <div className="mt-5 rounded-xl border border-dashed border-border bg-cream p-6 text-center">
                  <Upload className="mx-auto text-brand-dark" size={24} aria-hidden="true" />
                  <p className="mt-2 text-[13px] font-bold text-ink">رزومه خود را انتخاب کنید</p>
                  <p className="mt-1 text-[12px] text-muted">PDF, DOC, DOCX — حداکثر ۵MB</p>
                  <input type="file" {...register('cv')} accept=".pdf,.doc,.docx" className="mt-4 w-full text-[13px] text-muted file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-[13px] file:font-bold file:text-ink file:shadow-sm" />
                </div>
              </section>

              <section className="mt-6">
                <label className="mb-1.5 block text-[13px] font-bold text-ink">توضیحات اضافی (اختیاری)</label>
                <textarea {...register('notes')} rows={3} className={`${inputClass} py-3`} />
              </section>

              <div className="mt-6 border-t border-border-light pt-6">
                <label className="flex items-start gap-2.5 text-[13px] leading-6 text-muted">
                  <input type="checkbox" {...register('confirm')} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-dark" />
                  <span>اطلاعات وارد شده را تایید می‌کنم.</span>
                </label>
                {errors.confirm && <p className="mt-2 text-xs font-medium text-error">{errors.confirm.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ color: '#fff' }}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-[14px] font-bold text-white shadow-sm transition hover:bg-brand-dark disabled:opacity-50"
                >
                  {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست'}
                  {!isSubmitting && <ArrowLeft size={17} aria-hidden="true" />}
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
