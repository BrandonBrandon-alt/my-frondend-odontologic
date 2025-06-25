import React, { forwardRef } from 'react';

/**
 * Componente Input profesional y atractivo
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.id
 * @param {React.ReactNode} props.startIcon
 * @param {React.ReactNode} props.endIcon
 * @param {string} props.error
 * @param {string} props.helperText
 * @param {string} props.size
 * @param {string} props.variant
 * @param {string} props.className
 * @param {string} props.type - 'input' o 'textarea'
 * @param {Object} props.rest
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
  type = 'input',
  rows = 4,
  ...rest 
}, ref) => {
  // Clases base
  const baseClasses = 'block w-full rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent/30 focus:border-accent';
  
  // Tamaños
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg'
  };
  
  // Variantes
  const variants = {
    default: 'border border-[var(--color-secondary)] bg-[var(--color-background-light)]',
    filled: 'border border-[var(--color-secondary)] bg-[var(--color-secondary)]/20 focus:bg-[var(--color-background-light)]'
  };
  
  // Estados
  const stateClasses = error 
    ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
    : variants[variant];
  
  // Padding para iconos
  const paddingClasses = [
    startIcon ? 'pl-12' : '',
    endIcon ? 'pr-12' : ''
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    baseClasses,
    sizes[size],
    stateClasses,
    paddingClasses,
    className
  ].filter(Boolean).join(' ');

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          ref={ref}
          id={id}
          className={inputClasses}
          placeholder={rest.placeholder ? rest.placeholder : ''}
          rows={rows}
          {...rest}
        />
      );
    }
    
    return (
      <input
        ref={ref}
        id={id}
        className={inputClasses}
        placeholder={rest.placeholder ? rest.placeholder : ''}
        {...rest}
      />
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-semibold text-[var(--color-text-dark)] mb-1 tracking-wide"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <div className="text-[var(--color-accent)] text-lg">
              {startIcon}
            </div>
          </div>
        )}
        
        {renderInput()}
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <div className="text-[var(--color-accent)] text-lg">
              {endIcon}
            </div>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1">
          {error && (
            <p className="text-sm text-[var(--color-accent)] font-semibold animate-pulse">{error}</p>
          )}
          {helperText && !error && (
            <p className="text-sm text-[var(--color-secondary)] italic">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 