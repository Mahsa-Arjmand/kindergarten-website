import { AlertCircle, RefreshCw } from 'lucide-react';
import { ReactNode } from 'react';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
}

const ErrorState = ({ 
  title = 'خطا در بارگذاری اطلاعات',
  message = 'متأسفانه دریافت اطلاعات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.',
  onRetry,
  action,
  className = ''
}: ErrorStateProps) => {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-error-50 rounded-full flex items-center justify-center">
          <AlertCircle size={32} className="text-error-500" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">{message}</p>
      <div className="flex justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <RefreshCw size={16} />
            تلاش مجدد
          </button>
        )}
        {action}
      </div>
    </div>
  );
};

export default ErrorState;