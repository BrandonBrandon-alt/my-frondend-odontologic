import React from 'react';

/**
 * Componente Button reutilizable con múltiples variantes
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {boolean} props.loading - Estado de carga
 * @param {string} props.variant - Variante del botón ('primary', 'secondary', 'outline', 'ghost')
 * @param {string} props.size - Tamaño del botón ('sm', 'md', 'lg')
 * @param {boolean} props.fullWidth - Si el botón debe ocupar todo el ancho
 * @param {string} props.className - Clases CSS adicionales
 * @param {Object} props.rest - Resto de propiedades HTML del botón
 */
const Button = ({ 
  children, 
  loading = false, 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '', 
  ...rest 
}) => {
  // Clases base
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variantes
  const variants = {
    primary: 'bg-accent hover:bg-primary text-white focus:ring-accent',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
    ghost: 'text-accent hover:bg-accent/10 focus:ring-accent'
  };
  
  // Tamaños
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
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
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
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
      {loading ? 'Cargando...' : children}
    </button>
  );
};

export default Button; 