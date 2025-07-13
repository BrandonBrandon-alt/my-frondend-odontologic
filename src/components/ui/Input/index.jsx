import React, { forwardRef } from 'react';

/**
 * Componente Input profesional y atractivo
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
  rows = 4, // Default rows for textarea
  ...rest 
}, ref) => {
  // Clases base para el input/textarea
  const baseClasses = 'block w-full rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4';
  
  // Tamaños
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg'
  };
  
  // Variantes
  const variants = {
    default: 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-primary)] placeholder-[var(--text-muted)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/30',
    filled: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-secondary)] placeholder-[var(--text-muted)] focus:bg-[var(--bg-primary)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/30'
  };
  
  // Estado de error y foco
  const stateClasses = error 
    ? 'border-[var(--error)] text-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/30' 
    : variants[variant];
  
  // Estado deshabilitado
  const disabledClasses = rest.disabled 
    ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed opacity-75' 
    : '';
  
  // Padding para iconos
  const paddingClasses = [
    startIcon ? 'pl-11' : '',
    endIcon ? 'pr-11' : ''
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    baseClasses,
    sizes[size],
    stateClasses,
    disabledClasses,
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
        type={type}
        {...rest}
      />
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-semibold text-[var(--text-secondary)] mb-1 tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startIcon && (
          <div className="absolute left-0 flex items-center pl-3.5 pointer-events-none h-full">
            <div className="text-[var(--text-muted)] text-xl">
              {startIcon}
            </div>
          </div>
        )}
        {renderInput()}
        {endIcon && (
          <div className="absolute right-0 flex items-center pr-3.5 h-full">
            <div className="text-[var(--text-muted)] text-xl">
              {endIcon}
            </div>
          </div>
        )}
      </div>
      {(error || helperText) && (
        <div className="mt-1">
          {error && (
            <p className="text-sm text-[var(--error)] font-medium">{error}</p> 
          )}
          {helperText && !error && (
            <p className="text-sm text-[var(--text-muted)] italic">{helperText}</p> 
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
