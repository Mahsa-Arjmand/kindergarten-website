import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/axios';
import { CheckCircle, Upload } from 'lucide-react';

const careerSchema = z.object({
  first_name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  last_name: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().min(10, 'شماره تماس معتبر نیست'),
  age: z.number().min(18, 'سن باید حداقل ۱۸ سال باشد').max(70, 'سن باید حداکثر ۷۰ سال باشد'),
  education: z.string().min(1, 'تحصیلات را انتخاب کنید'),
  field_of_study: z.string().min(1, 'رشته تحصیلی را وارد کنید'),
  work_experience: z.string().optional(),
  skills: z.string().optional(),
  notes: z.string().optional(),
  cv: z.any().optional(),
  confirm: z.literal(true, { errorMap: () => ({ message: 'تایید اطلاعات الزامی است' }) }),
});

type CareerFormData = z.infer<typeof careerSchema>;

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
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">درخواست موفق!</h1>
            <p className="text-lg text-gray-600 mb-4">
              درخواست همکاری شما با موفقیت ارسال شد.
            </p>
            <p className="text-gray-600">
              پس از بررسی رزومه شما، با شما تماس خواهیم گرفت.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">همکاری با ما</h1>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          اگر به کار با کودکان علاقه دارید و می‌خواهید در تیم آموزشی ما عضو شوید، فرم زیر را تکمیل کنید.
        </p>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">اطلاعات شخصی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">نام</label>
                  <input
                    type="text"
                    {...register('first_name')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.first_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.first_name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">نام خانوادگی</label>
                  <input
                    type="text"
                    {...register('last_name')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.last_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.last_name.message}</p>
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
                  <label className="block text-gray-700 font-medium mb-2">سن</label>
                  <input
                    type="number"
                    {...register('age', { valueAsNumber: true })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.age && (
                    <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">تحصیلات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">آخرین مدرک تحصیلی</label>
                  <select
                    {...register('education')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="diploma">دیپلم</option>
                    <option value="associate">فوق دیپلم</option>
                    <option value="bachelor">لیسانس</option>
                    <option value="master">فوق لیسس</option>
                    <option value="phd">دکترا</option>
                  </select>
                  {errors.education && (
                    <p className="text-red-600 text-sm mt-1">{errors.education.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">رشته تحصیلی</label>
                  <input
                    type="text"
                    {...register('field_of_study')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.field_of_study && (
                    <p className="text-red-600 text-sm mt-1">{errors.field_of_study.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Experience & Skills */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">تجربه و مهارت‌ها</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">سابقه کار (اختیاری)</label>
                  <textarea
                    {...register('work_experience')}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">مهارت‌ها (اختیاری)</label>
                  <textarea
                    {...register('skills')}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">رزومه (PDF یا DOC)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <input
                  type="file"
                  {...register('cv')}
                  accept=".pdf,.doc,.docx"
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-2">فرمت‌های مجاز: PDF, DOC, DOCX (حداکثر ۵MB)</p>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">توضیحات اضافی (اختیاری)</label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
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
              {isSubmitting ? 'در حال ارسال...' : 'ارسال درخواست'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Careers;
