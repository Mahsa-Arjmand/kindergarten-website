import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Sparkles } from 'lucide-react';
import api from '../lib/axios';

const registrationSchema = z.object({
  child_first_name: z.string().min(2, 'نام کودک الزامی است'),
  child_last_name: z.string().min(2, 'نام خانوادگی الزامی است'),
  child_birth_date: z.string().min(1, 'تاریخ تولد الزامی است'),
  child_gender: z.enum(['male','female'], { required_error: 'جنسیت الزامی است' }),
  age_group: z.string().min(1, 'گروه سنی الزامی است'),
  child_notes: z.string().optional(),
  parent_first_name: z.string().min(2, 'نام والد الزامی است'),
  parent_last_name: z.string().min(2, 'نام خانوادگی والد الزامی است'),
  parent_relation: z.string().min(1, 'نسبت الزامی است'),
  phone: z.string().min(10, 'شماره معتبر نیست'),
  phone_secondary: z.string().optional(),
  email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
  preferred_program: z.string().min(1, 'برنامه الزامی است'),
  preferred_time: z.string().optional(),
  notes: z.string().optional(),
  confirm: z.literal(true, { errorMap: () => ({ message: 'تایید الزامی است' }) }),
});
type RegistrationFormData = z.infer<typeof registrationSchema>;

const inputClass = 'w-full min-h-11 rounded-full border border-pink-100 bg-white px-4 text-[14px] text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-light placeholder:text-subtle';
const labelClass = 'mb-1.5 block text-[13px] font-bold text-ink';
const cardClass = 'rounded-[1.75rem] border-2 border-white bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)]';

const Registration = () => {
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationFormData>({ resolver: zodResolver(registrationSchema) });

  useEffect(() => { document.title = 'ثبت‌نام آنلاین - مهدکودک هدیه'; }, []);

  const onSubmit = async (data: RegistrationFormData) => {
    setError('');
    try { const r = await api.post('/registrations', data); setRegistrationId(r.data?.id || ''); setSubmitted(true); } catch (e:any) { setError(e?.response?.data?.message || 'ارسال با خطا مواجه شد.'); }
  };

  if (submitted) {
    return (
      <main className="bg-[#fff7fb] py-12">
        <div className="container-hedieh">
          <div className="mx-auto max-w-[560px] rounded-[1.75rem] border-2 border-white bg-white p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-green-700"><CheckCircle size={32} /></div>
            <h2 className="mt-4 text-[18px] font-extrabold text-ink">درخواست شما ثبت شد</h2>
            <p className="mt-2 text-[14px] leading-7 text-muted">کد پیگیری: <span className="font-bold text-ink" dir="ltr">{registrationId || '—'}</span></p>
            <p className="mt-1 text-[13px] text-muted">به زودی با شما تماس می‌گیریم.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#fff7fb]">
      <section className="bg-white">
        <div className="container-hedieh py-10 lg:py-12">
          <span className="section-kicker">ثبت‌نام آنلاین</span>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="max-w-[560px] text-balance text-[30px] font-extrabold leading-[1.35] tracking-tight text-ink sm:text-[38px] lg:text-[42px]">
              قدم اول برای <span className="text-brand">شروع یک تجربه شیرین.</span>
            </h1>
            <p className="max-w-[520px] rounded-2xl border border-pink-100 bg-[#fff7fb] p-4 text-[14px] leading-7 text-muted">فرم را پر کنید — همین هفته با شما تماس می‌گیریم تا بازدید و گفت‌وگو را هماهنگ کنیم.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fff7fb] py-8 lg:py-10">
        <div className="container-hedieh">
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[860px] space-y-6">
            {error && <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</div>}

            <div className={cardClass}>
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-ink"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white text-[12px] font-bold">۱</span> اطلاعات کودک</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div><label className={labelClass}>نام کودک *</label><input {...register('child_first_name')} className={inputClass} placeholder="مثلاً سارا" /><p className="mt-1 text-[12px] text-red-600">{errors.child_first_name?.message}</p></div>
                <div><label className={labelClass}>نام خانوادگی *</label><input {...register('child_last_name')} className={inputClass} /><p className="mt-1 text-[12px] text-red-600">{errors.child_last_name?.message}</p></div>
                <div><label className={labelClass}>تاریخ تولد *</label><input type="date" {...register('child_birth_date')} className={inputClass} /><p className="mt-1 text-[12px] text-red-600">{errors.child_birth_date?.message}</p></div>
                <div><label className={labelClass}>جنسیت *</label><select {...register('child_gender')} className={inputClass}><option value="">انتخاب</option><option value="female">دختر</option><option value="male">پسر</option></select><p className="mt-1 text-[12px] text-red-600">{errors.child_gender?.message}</p></div>
                <div><label className={labelClass}>گروه سنی *</label><select {...register('age_group')} className={inputClass}><option value="">انتخاب</option><option value="toddler">۱-۲ سال</option><option value="preschool">۳-۴ سال</option><option value="pre-primary">۵-۶ سال</option></select><p className="mt-1 text-[12px] text-red-600">{errors.age_group?.message}</p></div>
                <div className="sm:col-span-2"><label className={labelClass}>توضیحات کودک (اختیاری)</label><textarea {...register('child_notes')} className="w-full min-h-[80px] rounded-[1.5rem] border border-pink-100 bg-white px-4 py-3 text-[14px] outline-none focus:border-brand focus:ring-4 focus:ring-brand-light" placeholder="حساسیت، علاقه‌مندی‌ها..." /></div>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-ink"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue text-white text-[12px] font-bold">۲</span> اطلاعات والد</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div><label className={labelClass}>نام والد *</label><input {...register('parent_first_name')} className={inputClass} /><p className="mt-1 text-[12px] text-red-600">{errors.parent_first_name?.message}</p></div>
                <div><label className={labelClass}>نام خانوادگی والد *</label><input {...register('parent_last_name')} className={inputClass} /><p className="mt-1 text-[12px] text-red-600">{errors.parent_last_name?.message}</p></div>
                <div><label className={labelClass}>نسبت *</label><select {...register('parent_relation')} className={inputClass}><option value="">انتخاب</option><option value="mother">مادر</option><option value="father">پدر</option><option value="guardian">سرپرست</option></select><p className="mt-1 text-[12px] text-red-600">{errors.parent_relation?.message}</p></div>
                <div><label className={labelClass}>موبایل *</label><input {...register('phone')} className={inputClass} dir="ltr" placeholder="09..." /><p className="mt-1 text-[12px] text-red-600">{errors.phone?.message}</p></div>
                <div><label className={labelClass}>موبایل دوم</label><input {...register('phone_secondary')} className={inputClass} dir="ltr" placeholder="اختیاری" /></div>
                <div><label className={labelClass}>ایمیل</label><input {...register('email')} className={inputClass} dir="ltr" placeholder="اختیاری" /></div>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-ink"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow text-amber-900 text-[12px] font-bold">۳</span> برنامه و زمان</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div><label className={labelClass}>برنامه *</label><select {...register('preferred_program')} className={inputClass}><option value="">انتخاب</option><option value="full">تمام‌وقت</option><option value="half">نیمه‌وقت</option><option value="after-school">بعد از مدرسه</option></select><p className="mt-1 text-[12px] text-red-600">{errors.preferred_program?.message}</p></div>
                <div><label className={labelClass}>زمان ترجیحی</label><select {...register('preferred_time')} className={inputClass}><option value="">انتخاب</option><option value="morning">صبح</option><option value="afternoon">عصر</option></select></div>
                <div className="sm:col-span-2"><label className={labelClass}>توضیحات</label><textarea {...register('notes')} className="w-full min-h-[90px] rounded-[1.5rem] border border-pink-100 bg-white px-4 py-3 text-[14px] outline-none focus:border-brand focus:ring-4 focus:ring-brand-light" placeholder="نکته‌ای هست؟" /></div>
                <div className="sm:col-span-2 flex items-start gap-2 rounded-[1.5rem] border border-pink-100 bg-[#fff7fb] px-4 py-3">
                  <input type="checkbox" {...register('confirm')} className="mt-1 accent-brand" />
                  <span className="text-[13px] leading-6 text-muted">اطلاعات را با دقت وارد کرده‌ام و با تماس هدیه موافقم.</span>
                </div>
                <p className="sm:col-span-2 text-[12px] text-red-600">{errors.confirm?.message}</p>
              </div>
              <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-6 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(236,42,134,0.25)] hover:bg-brand-dark disabled:opacity-50">
                {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست ثبت‌نام'}
              </button>
              <p className="mt-3 text-center text-[12px] text-subtle"><Sparkles size={12} className="inline text-brand" /> پاسخ در ۱-۲ روز کاری</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
export default Registration;
