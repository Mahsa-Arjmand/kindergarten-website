import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, ArrowLeft, UserRound, Users, ClipboardList } from 'lucide-react';
import api from '../lib/axios';

const registrationSchema = z.object({
  child_first_name: z.string().min(2, 'نام کودک باید حداقل ۲ کاراکتر باشد'),
  child_last_name: z.string().min(2, 'نام خانوادگی کودک باید حداقل ۲ کاراکتر باشد'),
  child_birth_date: z.string().min(1, 'تاریخ تولد الزامی است'),
  child_gender: z.enum(['male', 'female'], {
    required_error: 'جنسیت را انتخاب کنید',
  }),
  age_group: z.string().min(1, 'گروه سنی را انتخاب کنید'),
  child_notes: z.string().optional(),
  parent_first_name: z.string().min(2, 'نام والد باید حداقل ۲ کاراکتر باشد'),
  parent_last_name: z.string().min(2, 'نام خانوادگی والد باید حداقل ۲ کاراکتر باشد'),
  parent_relation: z.string().min(1, 'نسبت با کودک را مشخص کنید'),
  phone: z.string().min(10, 'شماره تماس معتبر نیست'),
  phone_secondary: z.string().optional(),
  email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
  preferred_program: z.string().min(1, 'برنامه مورد نظر را انتخاب کنید'),
  preferred_time: z.string().optional(),
  notes: z.string().optional(),
  confirm: z.literal(true, {
    errorMap: () => ({ message: 'تایید اطلاعات الزامی است' }),
  }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const inputClass =
  'w-full min-h-11 rounded-xl border border-border bg-white px-4 text-[14px] text-ink outline-none transition focus:border-brand-dark focus:ring-4 focus:ring-brand-light placeholder:text-subtle';

const labelClass = 'mb-1.5 block text-[13px] font-bold text-ink';

const Registration = () => {
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  useEffect(() => {
    document.title = 'ثبت‌نام آنلاین - مهدکودک هدیه';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'ثبت‌نام آنلاین کودک در مهدکودک هدیه - فرم ثبت‌نام ساده و سریع');
  }, []);

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const response = await api.post('/registrations', data);
      setRegistrationId(response.data.registration_id);
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
            <h1 className="mt-2 text-[22px] font-black leading-8 text-ink sm:text-[26px]">ثبت‌نام با موفقیت ارسال شد</h1>
            <p className="mt-3 text-[14px] leading-7 text-muted">
              اطلاعات شما با موفقیت دریافت شد و کارشناسان مهدکودک برای ادامه مراحل با شما تماس خواهند گرفت.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-cream px-5 py-4">
              <p className="text-[13px] font-medium text-muted">کد پیگیری درخواست</p>
              <p className="mt-1 text-[22px] font-black tracking-wider text-brand-dark">{registrationId}</p>
            </div>
            <p className="mt-4 text-[13px] leading-6 text-muted">برای پیگیری می‌توانید با شماره ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream">
      <section className="border-b border-border-light bg-cream">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">ثبت‌نام</p>
          <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
            شروع یک
            <span className="text-brand-dark"> مسیر تازه.</span>
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-muted">
            اطلاعات کودک و والد را وارد کنید تا درخواست شما برای مهدکودک هدیه ارسال شود.
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
              {/* Child */}
              <section>
                <div className="flex items-start gap-3 border-b border-border-light pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                    <UserRound size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-extrabold text-ink">اطلاعات کودک</h2>
                    <p className="mt-1 text-[13px] text-muted">اطلاعات اولیه کودک را وارد کنید.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>نام</label>
                    <input type="text" {...register('child_first_name')} className={inputClass} />
                    {errors.child_first_name && <p className="mt-1.5 text-xs font-medium text-error">{errors.child_first_name.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>نام خانوادگی</label>
                    <input type="text" {...register('child_last_name')} className={inputClass} />
                    {errors.child_last_name && <p className="mt-1.5 text-xs font-medium text-error">{errors.child_last_name.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>تاریخ تولد</label>
                    <input type="date" {...register('child_birth_date')} className={inputClass} />
                    {errors.child_birth_date && <p className="mt-1.5 text-xs font-medium text-error">{errors.child_birth_date.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>جنسیت</label>
                    <select {...register('child_gender')} className={inputClass}>
                      <option value="">انتخاب کنید</option>
                      <option value="male">پسر</option>
                      <option value="female">دختر</option>
                    </select>
                    {errors.child_gender && <p className="mt-1.5 text-xs font-medium text-error">{errors.child_gender.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>گروه سنی</label>
                    <select {...register('age_group')} className={inputClass}>
                      <option value="">انتخاب کنید</option>
                      <option value="2-3">۲ تا ۳ سال</option>
                      <option value="3-4">۳ تا ۴ سال</option>
                      <option value="4-5">۴ تا ۵ سال</option>
                      <option value="5-6">۵ تا ۶ سال</option>
                    </select>
                    {errors.age_group && <p className="mt-1.5 text-xs font-medium text-error">{errors.age_group.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>توضیحات کودک (اختیاری)</label>
                    <textarea {...register('child_notes')} rows={3} className={`${inputClass} py-3`} />
                  </div>
                </div>
              </section>

              {/* Parent */}
              <section className="mt-8">
                <div className="flex items-start gap-3 border-b border-border-light pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-light text-brand-dark">
                    <Users size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-extrabold text-ink">اطلاعات والد یا سرپرست</h2>
                    <p className="mt-1 text-[13px] text-muted">اطلاعات تماس والد یا سرپرست را وارد کنید.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>نام</label>
                    <input type="text" {...register('parent_first_name')} className={inputClass} />
                    {errors.parent_first_name && <p className="mt-1.5 text-xs font-medium text-error">{errors.parent_first_name.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>نام خانوادگی</label>
                    <input type="text" {...register('parent_last_name')} className={inputClass} />
                    {errors.parent_last_name && <p className="mt-1.5 text-xs font-medium text-error">{errors.parent_last_name.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>نسبت با کودک</label>
                    <select {...register('parent_relation')} className={inputClass}>
                      <option value="">انتخاب کنید</option>
                      <option value="father">پدر</option>
                      <option value="mother">مادر</option>
                      <option value="guardian">سرپرست</option>
                    </select>
                    {errors.parent_relation && <p className="mt-1.5 text-xs font-medium text-error">{errors.parent_relation.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>شماره تماس</label>
                    <input type="tel" {...register('phone')} className={inputClass} />
                    {errors.phone && <p className="mt-1.5 text-xs font-medium text-error">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>شماره تماس دوم (اختیاری)</label>
                    <input type="tel" {...register('phone_secondary')} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>ایمیل (اختیاری)</label>
                    <input type="email" {...register('email')} className={inputClass} />
                    {errors.email && <p className="mt-1.5 text-xs font-medium text-error">{errors.email.message}</p>}
                  </div>
                </div>
              </section>

              {/* Registration */}
              <section className="mt-8">
                <div className="flex items-start gap-3 border-b border-border-light pb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                    <ClipboardList size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-extrabold text-ink">اطلاعات ثبت‌نام</h2>
                    <p className="mt-1 text-[13px] text-muted">برنامه و زمان مورد نظر خود را مشخص کنید.</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>برنامه مورد نظر</label>
                    <select {...register('preferred_program')} className={inputClass}>
                      <option value="">انتخاب کنید</option>
                      <option value="full_day">تمام روز</option>
                      <option value="half_day_morning">نیم روز (صبح)</option>
                      <option value="half_day_afternoon">نیم روز (عصر)</option>
                    </select>
                    {errors.preferred_program && <p className="mt-1.5 text-xs font-medium text-error">{errors.preferred_program.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>زمان ترجیحی (اختیاری)</label>
                    <input type="text" {...register('preferred_time')} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>توضیحات اضافی (اختیاری)</label>
                    <textarea {...register('notes')} rows={4} className={`${inputClass} py-3`} />
                  </div>
                </div>
              </section>

              {/* Confirm */}
              <div className="mt-8 border-t border-border-light pt-6">
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
                  {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست ثبت‌نام'}
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

export default Registration;
