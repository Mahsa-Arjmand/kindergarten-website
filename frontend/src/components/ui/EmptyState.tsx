import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = 'موردی یافت نشد',
  description = 'در حال حاضر اطلاعاتی برای نمایش وجود ندارد.',
}: EmptyStateProps) => {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-hedieh-border bg-white/70 px-6 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-hedieh-primary">
        <Inbox size={22} aria-hidden="true" />
      </div>

      <h3 className="font-bold text-hedieh-text">{title}</h3>

      <p className="mt-1 max-w-md text-sm leading-7 text-hedieh-muted">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;