import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({
  message = 'در حال بارگذاری...',
}: LoadingStateProps) => {
  return (
    <div
      className="flex min-h-40 flex-col items-center justify-center gap-3 text-hedieh-muted"
      role="status"
      aria-live="polite"
    >
      <Loader2
        size={28}
        className="animate-spin text-hedieh-primary"
        aria-hidden="true"
      />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default LoadingState;