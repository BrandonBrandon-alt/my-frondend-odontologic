import React from 'react';

/**
 * Componente LoadingSpinner reutilizable para mostrar estados de carga
 * @param {Object} props - Propiedades del componente
 * @param {string} props.size - Tamaño del spinner ('sm', 'md', 'lg')
 * @param {string} props.color - Color del spinner ('primary', 'white', 'gray')
 * @param {string} props.className - Clases CSS adicionales
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}) => {
  // Tamaños
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  // Colores
  const colors = {
    primary: 'text-[var(--color-accent)]',
    white: 'text-white',
    gray: 'text-[var(--color-secondary)]'
  };
  
  const spinnerClasses = [
    'animate-spin',
    sizes[size],
    colors[color],
    className
  ].filter(Boolean).join(' ');

  return (
    <svg 
      className={spinnerClasses}
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
  );
};

export default LoadingSpinner; 