import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, ArrowLeft, UserRound, Users, ClipboardList } from 'lucide-react';
import api from '../lib/axios';

document.title = 'ثبت‌نام آنلاین - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'ثبت‌نام آنلاین کودک در مهدکودک هدیه - فرم ثبت‌نام ساده و سریع'
  );

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
  'w-full min-h-11 border border-border bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-subtle focus:border-brand focus:ring-4 focus:ring-brand-light';

const labelClass = 'mb-2 block text-sm font-semibold text-ink';

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
              ثبت‌نام با موفقیت ارسال شد
            </h1>

            <p className="mt-5 text-base leading-8 text-muted">
              اطلاعات شما با موفقیت دریافت شد و کارشناسان مهدکودک برای ادامه
              مراحل با شما تماس خواهند گرفت.
            </p>

            <div className="mt-7 border border-border bg-cream px-6 py-5">
              <p className="text-sm text-muted">کد پیگیری درخواست</p>
              <p className="mt-2 text-2xl font-bold tracking-wider text-brand">
                {registrationId}
              </p>
            </div>

            <p className="mt-6 text-sm leading-7 text-muted">
              برای پیگیری می‌توانید با شماره ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید.
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
          <p className="mb-4 text-sm font-bold text-brand">ثبت‌نام</p>

          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
            شروع یک
            <span className="text-brand"> مسیر تازه.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            اطلاعات کودک و والد را وارد کنید تا درخواست شما برای مهدکودک هدیه
            ارسال شود.
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
              {/* Child */}
              <section>
                <div className="flex items-start gap-4 border-b border-border pb-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                    <UserRound size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-ink">
                      اطلاعات کودک
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      اطلاعات اولیه کودک را وارد کنید.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>نام</label>
                    <input
                      type="text"
                      {...register('child_first_name')}
                      className={inputClass}
                    />
                    {errors.child_first_name && (
                      <p className="mt-1 text-xs text-error">
                        {errors.child_first_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>نام خانوادگی</label>
                    <input
                      type="text"
                      {...register('child_last_name')}
                      className={inputClass}
                    />
                    {errors.child_last_name && (
                      <p className="mt-1 text-xs text-error">
                        {errors.child_last_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>تاریخ تولد</label>
                    <input
                      type="date"
                      {...register('child_birth_date')}
                      className={inputClass}
                    />
                    {errors.child_birth_date && (
                      <p className="mt-1 text-xs text-error">
                        {errors.child_birth_date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>جنسیت</label>
                    <select {...register('child_gender')} className={inputClass}>
                      <option value="">انتخاب کنید</option>
                      <option value="male">پسر</option>
                      <option value="female">دختر</option>
                    </select>
                    {errors.child_gender && (
                      <p className="mt-1 text-xs text-error">
                        {errors.child_gender.message}
                      </p>
                    )}
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
                    {errors.age_group && (
                      <p className="mt-1 text-xs text-error">
                        {errors.age_group.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>توضیحات کودک (اختیاری)</label>
                    <textarea
                      {...register('child_notes')}
                      rows={3}
                      className={`${inputClass} py-3`}
                    />
                  </div>
                </div>
              </section>

              {/* Parent */}
              <section className="mt-12">
                <div className="flex items-start gap-4 border-b border-border pb-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-light text-brand">
                    <Users size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-ink">
                      اطلاعات والد یا سرپرست
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      اطلاعات تماس والد یا سرپرست را وارد کنید.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>نام</label>
                    <input
                      type="text"
                      {...register('parent_first_name')}
                      className={inputClass}
                    />
                    {errors.parent_first_name && (
                      <p className="mt-1 text-xs text-error">
                        {errors.parent_first_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>نام خانوادگی</label>
                    <input
                      type="text"
                      {...register('parent_last_name')}
                      className={inputClass}
                    />
                    {errors.parent_last_name && (
                      <p className="mt-1 text-xs text-error">
                        {errors.parent_last_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>نسبت با کودک</label>
                    <select {...register('parent_relation')} className={inputClass}>
                      <option value="">انتخاب کنید</option>
                      <option value="father">پدر</option>
                      <option value="mother">مادر</option>
                      <option value="guardian">سرپرست</option>
                    </select>
                    {errors.parent_relation && (
                      <p className="mt-1 text-xs text-error">
                        {errors.parent_relation.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>شماره تماس</label>
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
                    <label className={labelClass}>
                      شماره تماس دوم (اختیاری)
                    </label>
                    <input
                      type="tel"
                      {...register('phone_secondary')}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>ایمیل (اختیاری)</label>
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
              </section>

              {/* Registration */}
              <section className="mt-12">
                <div className="flex items-start gap-4 border-b border-border pb-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                    <ClipboardList size={21} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-ink">
                      اطلاعات ثبت‌نام
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      برنامه و زمان مورد نظر خود را مشخص کنید.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>برنامه مورد نظر</label>
                    <select
                      {...register('preferred_program')}
                      className={inputClass}
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="full_day">تمام روز</option>
                      <option value="half_day_morning">نیم روز (صبح)</option>
                      <option value="half_day_afternoon">نیم روز (عصر)</option>
                    </select>
                    {errors.preferred_program && (
                      <p className="mt-1 text-xs text-error">
                        {errors.preferred_program.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>
                      زمان ترجیحی (اختیاری)
                    </label>
                    <input
                      type="text"
                      {...register('preferred_time')}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      توضیحات اضافی (اختیاری)
                    </label>
                    <textarea
                      {...register('notes')}
                      rows={4}
                      className={`${inputClass} py-3`}
                    />
                  </div>
                </div>
              </section>

              {/* Confirm */}
              <div className="mt-10 border-t border-border pt-7">
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
                  {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست ثبت‌نام'}
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

export default Registration;