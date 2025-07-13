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
    default: 'bg-[var(--color-background)] border border-[var(--border-primary)] shadow-md',
    elevated: 'bg-[var(--color-background)] border border-[var(--border-primary)] shadow-xl hover:shadow-2xl transition-shadow duration-300',
    outlined: 'bg-[var(--color-background)] border-2 border-[var(--color-accent)]'
  };
  
  const cardClasses = [
    'rounded-xl p-6 transition-all duration-200',
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
        <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-1">
          {title}
        </h3>
      )}
      
      {subtitle && (
        <p className="text-base text-[var(--color-text-secondary)] mb-4">
          {subtitle}
        </p>
      )}
      
      <div className="text-[var(--color-text-dark)] text-base">
        {children}
      </div>
    </div>
  );
};

export default Card; 