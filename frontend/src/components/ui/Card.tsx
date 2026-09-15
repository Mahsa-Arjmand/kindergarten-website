import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

const Card = ({
  children,
  interactive = false,
  className = '',
  ...props
}: CardProps) => {
  return (
    <div
      className={[
        'rounded-2xl border border-hedieh-border bg-white',
        'shadow-[0_8px_30px_rgba(80,60,45,0.06)]',
        interactive
          ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(80,60,45,0.10)]'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;