import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  title = 'مشکلی پیش آمد',
  description = 'دریافت اطلاعات با مشکل مواجه شد. لطفاً دوباره تلاش کنید.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/60 px-6 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-hedieh-error shadow-sm">
        <AlertCircle size={22} aria-hidden="true" />
      </div>

      <h3 className="font-bold text-hedieh-text">{title}</h3>

      <p className="mt-1 max-w-md text-sm leading-7 text-hedieh-muted">
        {description}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-hedieh-primary transition hover:bg-white"
        >
          <RefreshCw size={16} />
          تلاش دوباره
        </button>
      )}
    </div>
  );
};

export default ErrorState;