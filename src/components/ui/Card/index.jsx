import React from 'react';

/**
 * Componente Card profesional y atractivo
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.variant
 * @param {string} props.className
 * @param {React.ReactNode} props.icon
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {Object} props.rest
 */
const Card = ({ 
  children, 
  variant = 'default',
  className = '',
  icon,
  title,
  subtitle,
  ...rest 
}) => {
  const variants = {
    default: 'bg-[var(--color-background-light)] dark:bg-[var(--color-background)] border border-[var(--border-primary)] shadow-xl',
    elevated: 'bg-[var(--color-background-light)] dark:bg-[var(--color-background)] border border-[var(--border-primary)] shadow-xl hover:shadow-2xl transition-shadow duration-300',
  };
  
  const cardClasses = [
    'rounded-xl p-8 transition-all duration-200',
    variants[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses + ' h-auto'} {...rest}>
      {icon && (
        <div className="flex-shrink-0 text-[var(--color-accent)] text-3xl mb-4">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-2xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-light)]/80 mb-4">
          {subtitle}
        </p>
      )}
      <div className="text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] text-base">
        {children}
      </div>
    </div>
  );
};

export default Card; 