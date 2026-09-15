import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/axios';
import { CheckCircle, Phone, Mail, MapPin } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  phone: z.string().min(10, 'شماره تماس معتبر نیست'),
  email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
  subject: z.string().min(1, 'موضوع را انتخاب کنید'),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد'),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">پیام ارسال شد!</h1>
            <p className="text-lg text-gray-600">
              پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">تماس با ما</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">اطلاعات تماس</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">تلفن</h3>
                  <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  <p className="text-gray-600">۰۹۱۲-۱۲۳۴۵۶۷</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">ایمیل</h3>
                  <p className="text-gray-600">info@hedieh-kindergarten.ir</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">آدرس</h3>
                  <p className="text-gray-600">تهران، خیابان اصلی، کوچه آموزش</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h3 className="font-semibold text-gray-800 mb-2">ساعات کاری</h3>
                <p className="text-gray-600">شنبه تا پنجشنبه: ۷ صبح تا ۶ عصر</p>
                <p className="text-gray-600">جمعه: تعطیل</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">فرم تماس</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">موضوع</label>
                <select
                  {...register('subject')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="registration">ثبت‌نام</option>
                  <option value="programs">برنامه‌ها</option>
                  <option value="employment">استخدام</option>
                  <option value="general">سایر موارد</option>
                </select>
                {errors.subject && (
                  <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">پیام</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
