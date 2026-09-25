import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../../lib/axios';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('ایمیل معتبر نیست'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
  password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
  password_confirmation: z.string().min(8, 'تکرار رمز عبور باید حداقل ۸ کاراکتر باشد'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'رمز عبور و تکرار آن مطابقت ندارند',
  path: ['password_confirmation'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const AdminLogin = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ورود');
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setError('');
      setSuccess('');
      const response = await api.post('/auth/register', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSuccess('ثبت‌نام با موفقیت انجام شد. در حال انتقال به پنل مدیریت...');
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ثبت‌نام');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white text-3xl font-bold">ه</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">پنل مدیریت کودکستان</h1>
          <p className="text-gray-600 text-sm">کودکستان هدیه</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              mode === 'login'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ورود
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              mode === 'register'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ثبت‌نام مدیر
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">ایمیل</label>
              <input
                type="email"
                {...registerLogin('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="admin@example.com"
              />
              {loginErrors.email && (
                <p className="text-red-600 text-sm mt-1">{loginErrors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">رمز عبور</label>
              <input
                type="password"
                {...registerLogin('password')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="••••••"
              />
              {loginErrors.password && (
                <p className="text-red-600 text-sm mt-1">{loginErrors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoginSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {isLoginSubmitting ? 'در حال ورود...' : 'ورود'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">نام و نام خانوادگی</label>
              <input
                type="text"
                {...registerRegister('name')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="نام مدیر"
              />
              {registerErrors.name && (
                <p className="text-red-600 text-sm mt-1">{registerErrors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">ایمیل</label>
              <input
                type="email"
                {...registerRegister('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="admin@example.com"
              />
              {registerErrors.email && (
                <p className="text-red-600 text-sm mt-1">{registerErrors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">رمز عبور</label>
              <input
                type="password"
                {...registerRegister('password')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="حداقل ۸ کاراکتر"
              />
              {registerErrors.password && (
                <p className="text-red-600 text-sm mt-1">{registerErrors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">تکرار رمز عبور</label>
              <input
                type="password"
                {...registerRegister('password_confirmation')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="تکرار رمز عبور"
              />
              {registerErrors.password_confirmation && (
                <p className="text-red-600 text-sm mt-1">{registerErrors.password_confirmation.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isRegisterSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {isRegisterSubmitting ? 'در حال ثبت‌نام...' : 'ثبت‌نام مدیر'}
            </button>
          </form>
        )}

        {mode === 'register' && (
          <div className="mt-4 text-center text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="font-medium text-blue-800">نکته مهم:</p>
            <p className="text-blue-700 mt-1">ثبت‌نام مدیر فقط یک بار امکان‌پذیر است. پس از ثبت‌نام اولین مدیر، امکان ثبت‌نام مدیر جدید وجود نخواهد داشت.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
