
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white shadow-sm hover:bg-brand-dark hover:shadow-md',

  secondary:
    'bg-yellow text-ink shadow-sm hover:brightness-95 hover:shadow-md',

  outline:
    'border border-brand bg-transparent text-brand hover:bg-brand-light',

  ghost:
    'bg-transparent text-ink hover:bg-brand-light/60',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-7 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-xl',
          'font-semibold',
          'transition-all duration-200',
          'focus-visible:outline-none',
          'focus-visible:ring-4',
          'focus-visible:ring-brand-light',
          'disabled:pointer-events-none',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading ? (
          <Loader2
            size={18}
            className="animate-spin"
            aria-hidden="true"
          />
        ) : (
          icon
        )}

        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

