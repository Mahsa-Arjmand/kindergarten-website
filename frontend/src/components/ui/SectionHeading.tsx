interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'right' | 'center';
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'right',
  className = '',
}: SectionHeadingProps) => {
  const centered = align === 'center';

  return (
    <div
      className={[
        'max-w-2xl',
        centered ? 'mx-auto text-center' : 'text-right',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-hedieh-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-hedieh-primary" />
          {eyebrow}
        </span>
      )}

      <h2 className="text-2xl font-bold leading-tight text-hedieh-text sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-8 text-hedieh-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;