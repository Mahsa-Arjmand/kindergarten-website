import { ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const EmptyState = ({ 
  title, 
  description, 
  icon, 
  action, 
  className = '' 
}: EmptyStateProps) => {
  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      {icon && (
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;