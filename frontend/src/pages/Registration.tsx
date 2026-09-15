import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/axios';
import { CheckCircle } from 'lucide-react';

// SEO metadata for Registration page
document.title = 'ثبت‌نام آنلاین - کودکستان هدیه';
document.querySelector('meta[name="description"]')?.setAttribute('content', 'ثبت‌نام آنلاین کودک در کودکستان هدیه - فرم ثبت‌نام ساده و سریع برای کودکان دلبند شما');

const registrationSchema = z.object({
  child_first_name: z.string().min(2, 'نام کودک باید حداقل ۲ کاراکتر باشد'),
  child_last_name: z.string().min(2, 'نام خانوادگی کودک باید حداقل ۲ کاراکتر باشد'),
  child_birth_date: z.string().min(1, 'تاریخ تولد الزامی است'),
  child_gender: z.enum(['male', 'female'], { required_error: 'جنسیت را انتخاب کنید' }),
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
  confirm: z.literal(true, { errorMap: () => ({ message: 'تایید اطلاعات الزامی است' }) }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

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
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">ثبت‌نام موفق!</h1>
            <p className="text-lg text-gray-600 mb-4">
              درخواست ثبت‌نام شما با موفقیت ارسال شد.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              کد پیگیری: <span className="font-bold text-orange-600">{registrationId}</span>
            </p>
            <p className="text-gray-600">
              با شما تماس خواهیم گرفت. برای پیگیری می‌توانید با شماره ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">ثبت‌نام آنلاین</h1>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Child Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">اطلاعات کودک</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">نام</label>
                  <input
                    type="text"
                    {...register('child_first_name')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.child_first_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.child_first_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">نام خانوادگی</label>
                  <input
                    type="text"
                    {...register('child_last_name')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.child_last_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.child_last_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">تاریخ تولد</label>
                  <input
                    type="date"
                    {...register('child_birth_date')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.child_birth_date && (
                    <p className="text-red-600 text-sm mt-1">{errors.child_birth_date.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">جنسیت</label>
                  <select
                    {...register('child_gender')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">پسر</option>
                    <option value="female">دختر</option>
                  </select>
                  {errors.child_gender && (
                    <p className="text-red-600 text-sm mt-1">{errors.child_gender.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">گروه سنی</label>
                  <select
                    {...register('age_group')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="2-3">۲ تا ۳ سال</option>
                    <option value="3-4">۳ تا ۴ سال</option>
                    <option value="4-5">۴ تا ۵ سال</option>
                    <option value="5-6">۵ تا ۶ سال</option>
                  </select>
                  {errors.age_group && (
                    <p className="text-red-600 text-sm mt-1">{errors.age_group.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">توضیحات (اختیاری)</label>
                  <textarea
                    {...register('child_notes')}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">اطلاعات والد/سرپرست</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">نام</label>
                  <input
                    type="text"
                    {...register('parent_first_name')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.parent_first_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.parent_first_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">نام خانوادگی</label>
                  <input
                    type="text"
                    {...register('parent_last_name')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.parent_last_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.parent_last_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">نسبت با کودک</label>
                  <select
                    {...register('parent_relation')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="father">پدر</option>
                    <option value="mother">مادر</option>
                    <option value="guardian">سرپرست</option>
                  </select>
                  {errors.parent_relation && (
                    <p className="text-red-600 text-sm mt-1">{errors.parent_relation.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">شماره تماس دوم (اختیاری)</label>
                  <input
                    type="tel"
                    {...register('phone_secondary')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">ایمیل (اختیاری)</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Registration Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">اطلاعات ثبت‌نام</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">برنامه مورد نظر</label>
                  <select
                    {...register('preferred_program')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="full_day">تمام روز</option>
                    <option value="half_day_morning">نیم روز (صبح)</option>
                    <option value="half_day_afternoon">نیم روز (عصر)</option>
                  </select>
                  {errors.preferred_program && (
                    <p className="text-red-600 text-sm mt-1">{errors.preferred_program.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">زمان ترجیحی (اختیاری)</label>
                  <input
                    type="text"
                    {...register('preferred_time')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">توضیحات اضافی (اختیاری)</label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Confirmation */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('confirm')}
                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
              />
              <label className="mr-3 text-gray-700">
                اطلاعات وارد شده را تایید می‌کنم
              </label>
            </div>
            {errors.confirm && (
              <p className="text-red-600 text-sm">{errors.confirm.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-lg font-bold hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست ثبت‌نام'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
