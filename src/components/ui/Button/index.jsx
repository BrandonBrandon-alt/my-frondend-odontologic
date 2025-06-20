import React from 'react';

/**
 * Componente Button profesional y atractivo
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.loading
 * @param {string} props.variant
 * @param {string} props.size
 * @param {boolean} props.fullWidth
 * @param {string} props.className
 * @param {React.ReactNode} props.leftIcon - Icono opcional a la izquierda
 * @param {Object} props.rest
 */
const Button = ({ 
  children, 
  loading = false, 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  className = '', 
  ...rest 
}) => {
  // Clases base
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95';
  
  // Variantes
  const variants = {
    primary: 'bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-white focus:ring-[var(--color-accent)]',
    secondary: 'bg-[var(--color-primary-darker)] hover:bg-[var(--color-primary)] text-white focus:ring-[var(--color-primary)]',
    outline: 'border-2 border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-background-light)] hover:bg-[var(--color-accent)] hover:text-white focus:ring-[var(--color-accent)]',
    ghost: 'text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 focus:ring-[var(--color-accent)] bg-transparent'
  };
  
  // Tamaños
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg'
  };
  
  // Ancho completo
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = [
    baseClasses,
    variants[variant],
    sizes[size],
    widthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      disabled={loading}
      className={buttonClasses}
      {...rest}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && (
        <span className="mr-2 flex items-center">{leftIcon}</span>
      )}
      {loading ? 'Cargando...' : children}
    </button>
  );
};

export default Button; 