import React, { forwardRef } from 'react';

/**
 * Componente Input reutilizable con soporte para iconos y validación
 * @param {Object} props - Propiedades del componente
 * @param {string} props.label - Etiqueta del campo
 * @param {string} props.id - ID del campo
 * @param {React.ReactNode} props.startIcon - Icono al inicio del campo
 * @param {React.ReactNode} props.endIcon - Icono al final del campo
 * @param {string} props.error - Mensaje de error
 * @param {string} props.helperText - Texto de ayuda
 * @param {string} props.size - Tamaño del input ('sm', 'md', 'lg')
 * @param {string} props.variant - Variante del input ('default', 'filled')
 * @param {string} props.className - Clases CSS adicionales
 * @param {Object} props.rest - Resto de propiedades HTML del input
 */
const Input = forwardRef(({ 
  label, 
  id, 
  startIcon, 
  endIcon, 
  error, 
  helperText,
  size = 'md',
  variant = 'default',
  className = '', 
  ...rest 
}, ref) => {
  // Clases base
  const baseClasses = 'block w-full border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  // Tamaños
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };
  
  // Variantes
  const variants = {
    default: 'border-gray-300 focus:border-accent focus:ring-accent',
    filled: 'border-gray-300 bg-gray-50 focus:border-accent focus:ring-accent focus:bg-white'
  };
  
  // Estados
  const stateClasses = error 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
    : variants[variant];
  
  // Padding para iconos
  const paddingClasses = [
    startIcon ? 'pl-10' : '',
    endIcon ? 'pr-10' : ''
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    baseClasses,
    sizes[size],
    stateClasses,
    paddingClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <div className="text-gray-400">
              {startIcon}
            </div>
          </div>
        )}
        
        <input
          ref={ref}
          id={id}
          className={inputClasses}
          {...rest}
        />
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="text-gray-400">
              {endIcon}
            </div>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1">
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {helperText && !error && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 