import React, { forwardRef } from 'react';
// Asegúrate de que los colores definidos en :root en tu CSS global estén disponibles.

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
 * @param {number} props.rows - Número de filas para textarea
 * @param {Object} props.rest - Resto de las props del input/textarea
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
    default: 'border border-[var(--color-secondary)] bg-white focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/30', // Fondo blanco para default
    filled: 'border border-[var(--color-secondary)] bg-[var(--color-secondary)]/20 focus:bg-white focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/30' // Fondo suave para filled
  };
  
  // Estado de error y foco
  const stateClasses = error 
    ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/30' // Colores de error definidos en CSS
    : variants[variant];
  
  // Estado deshabilitado
  const disabledClasses = rest.disabled 
    ? 'bg-gray-100 text-gray-500 cursor-not-allowed opacity-75' 
    : '';
  
  // Padding para iconos (ajustado para mayor consistencia)
  const paddingClasses = [
    startIcon ? 'pl-11' : '', // Ajustado a 11 para mejor espacio con icono w-5
    endIcon ? 'pr-11' : ''    // Ajustado a 11
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
          {...rest} // Pasa todas las props restantes, incluyendo placeholder
        />
      );
    }
    
    return (
      <input
        ref={ref}
        id={id}
        className={inputClasses}
        type={type} // Asegura que el tipo de input se propague
        {...rest} // Pasa todas las props restantes, incluyendo placeholder
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
      
      <div className="relative flex items-center"> {/* flex items-center para centrar iconos verticalmente */}
        {startIcon && (
          <div className="absolute left-0 flex items-center pl-3.5 pointer-events-none h-full"> {/* h-full y pl-3.5 */}
            <div className="text-gray-400 text-xl"> {/* Color más sutil para el icono, tamaño xl para que sea visible */}
              {startIcon}
            </div>
          </div>
        )}
        
        {renderInput()}
        
        {endIcon && (
          <div className="absolute right-0 flex items-center pr-3.5 h-full"> {/* h-full y pr-3.5 */}
            <div className="text-gray-400 text-xl"> {/* Color más sutil para el icono, tamaño xl */}
              {endIcon}
            </div>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-1">
          {error && (
            // Color rojo de error, sin animación de pulso
            <p className="text-sm text-[var(--color-error)] font-medium">{error}</p> 
          )}
          {helperText && !error && (
            <p className="text-sm text-gray-500 italic">{helperText}</p> 
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
