import React from 'react';

/**
 * Componente Card profesional y atractivo
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {React.ReactNode} props.icon
 * @param {string} props.variant
 * @param {string} props.className
 * @param {Function} props.onClick
 */
const Card = ({ 
  children, 
  title, 
  subtitle, 
  icon,
  variant = 'default',
  className = '',
  onClick,
  ...rest 
}) => {
  // Variantes de estilo
  const variants = {
    default: 'bg-[var(--color-background-light)] border border-[var(--color-secondary)] shadow-md',
    elevated: 'bg-[var(--color-background-light)] border border-[var(--color-secondary)] shadow-xl hover:shadow-2xl transition-shadow duration-300',
    outlined: 'bg-[var(--color-background-light)] border-2 border-[var(--color-accent)]'
  };

  const cardClasses = [
    'rounded-2xl',
    'p-8',
    'transition-all',
    'duration-300',
    'animate-fade-in-up',
    variants[variant],
    onClick ? 'cursor-pointer' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...rest}
    >
      {(title || subtitle || icon) && (
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          {icon && (
            <div className="flex-shrink-0 text-[var(--color-accent)] text-3xl">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-base text-[var(--color-secondary)]">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="text-[var(--color-text-dark)] text-base">
        {children}
      </div>
    </div>
  );
};

export default Card; 