import React from 'react';

/**
 * Componente Card reutilizable para mostrar información
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} props.title - Título de la tarjeta
 * @param {string} props.subtitle - Subtítulo de la tarjeta
 * @param {React.ReactNode} props.icon - Icono de la tarjeta
 * @param {string} props.variant - Variante de la tarjeta ('default', 'elevated', 'outlined')
 * @param {string} props.className - Clases CSS adicionales
 * @param {Function} props.onClick - Función llamada al hacer clic en la tarjeta
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
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300',
    outlined: 'bg-white border-2 border-gray-200'
  };

  const cardClasses = [
    'rounded-lg p-6',
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
        <div className="flex items-start space-x-3 mb-4">
          {icon && (
            <div className="flex-shrink-0 text-accent">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default Card; 