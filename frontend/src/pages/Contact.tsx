import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import api from '../lib/axios';

const contactSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().min(10, 'شماره تماس معتبر نیست'),
  email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
  subject: z.string().min(1, 'موضوع را انتخاب کنید'),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد'),
});
type ContactFormData = z.infer<typeof contactSchema>;

const inputClass = 'w-full min-h-11 rounded-full border border-pink-100 bg-white px-4 text-[14px] text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-light placeholder:text-subtle';
const textareaClass = 'w-full min-h-[120px] rounded-[1.5rem] border border-pink-100 bg-white px-4 py-3 text-[14px] text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-light placeholder:text-subtle';
const labelClass = 'mb-1.5 block text-[13px] font-bold text-ink';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    document.title = 'تماس با ما - مهدکودک هدیه';
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setError('');
    try { await api.post('/contacts', data); setSubmitted(true); } catch (e:any) { setError(e?.response?.data?.message || 'ارسال پیام با خطا مواجه شد.'); }
  };

  if (submitted) {
    return (
      <main className="bg-[#fff7fb] py-12">
        <div className="container-hedieh">
          <div className="mx-auto max-w-[560px] rounded-[1.75rem] border-2 border-white bg-white p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-green-700"><CheckCircle size={32} /></div>
            <h2 className="mt-4 text-[18px] font-extrabold text-ink">پیام شما دریافت شد</h2>
            <p className="mt-2 text-[14px] leading-7 text-muted">به زودی با شما تماس می‌گیریم.</p>
            <button onClick={()=>setSubmitted(false)} className="mt-6 inline-flex rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark">ارسال پیام دیگر</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#fff7fb]">
      <section className="bg-white">
        <div className="container-hedieh py-10 lg:py-12">
          <span className="section-kicker">ارتباط با هدیه</span>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="max-w-[560px] text-balance text-[30px] font-extrabold leading-[1.35] tracking-tight text-ink sm:text-[38px] lg:text-[42px]">
              سؤالی دارید؟ <span className="text-brand">با ما حرف بزنید.</span>
            </h1>
            <p className="max-w-[520px] rounded-2xl border border-pink-100 bg-[#fff7fb] p-4 text-[14px] leading-7 text-muted">خوشحال می‌شویم صدای شما را بشنویم — با حوصله جواب می‌دهیم.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fff7fb] py-8 lg:py-10">
        <div className="container-hedieh grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-3">
            <div className="rounded-[1.75rem] border-2 border-white bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <h3 className="text-[11px] font-bold tracking-widest text-subtle">تماس مستقیم</h3>
              <div className="mt-4 space-y-3 text-[14px]">
                <a href="tel:+982100000000" className="flex items-center gap-3 rounded-full border border-pink-100 bg-[#fff7fb] px-4 py-3 font-bold text-ink hover:bg-brand-light"><Phone size={16} className="text-brand" /> <span dir="ltr">021-00000000</span></a>
                <a href="mailto:info@hedieh-kindergarten.ir" className="flex items-center gap-3 rounded-full border border-pink-100 bg-white px-4 py-3 text-muted hover:text-ink"><Mail size={16} className="text-brand" /> <span dir="ltr">info@hedieh-kindergarten.ir</span></a>
                <div className="flex gap-3 rounded-[1.5rem] border border-pink-100 bg-white px-4 py-3 text-muted"><MapPin size={16} className="mt-0.5 text-brand" /><span className="text-[13px] leading-6">آدرس مهدکودک در این بخش قرار می‌گیرد.</span></div>
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-blue-soft p-6">
              <p className="text-[13px] font-bold text-ink">ساعت پاسخگویی</p>
              <p className="mt-2 text-[13px] leading-6 text-muted">شنبه تا چهارشنبه ۸ تا ۱۶ — پنجشنبه ۸ تا ۱۲</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-[1.75rem] border-2 border-white bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:p-8">
            <h2 className="flex items-center gap-2 text-[16px] font-extrabold text-ink"><Sparkles size={16} className="text-brand" /> فرم تماس</h2>
            {error && <div className="mt-4 rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</div>}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div><label className={labelClass}>نام *</label><input {...register('name')} placeholder="نام شما" className={inputClass} /><p className="mt-1 text-[12px] text-red-600">{errors.name?.message}</p></div>
              <div><label className={labelClass}>شماره تماس *</label><input {...register('phone')} placeholder="09..." className={inputClass} dir="ltr" /><p className="mt-1 text-[12px] text-red-600">{errors.phone?.message}</p></div>
              <div className="sm:col-span-2"><label className={labelClass}>ایمیل (اختیاری)</label><input {...register('email')} placeholder="email@example.com" className={inputClass} dir="ltr" /></div>
              <div className="sm:col-span-2"><label className={labelClass}>موضوع *</label><select {...register('subject')} className={inputClass}><option value="">انتخاب کنید</option><option value="registration">ثبت‌نام</option><option value="visit">بازدید</option><option value="question">سؤال</option><option value="other">سایر</option></select><p className="mt-1 text-[12px] text-red-600">{errors.subject?.message}</p></div>
              <div className="sm:col-span-2"><label className={labelClass}>پیام *</label><textarea {...register('message')} placeholder="پیام خود را بنویسید..." className={textareaClass} /><p className="mt-1 text-[12px] text-red-600">{errors.message?.message}</p></div>
            </div>
            <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-6 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(236,42,134,0.25)] transition hover:bg-brand-dark disabled:opacity-50">
              {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default Contact;
