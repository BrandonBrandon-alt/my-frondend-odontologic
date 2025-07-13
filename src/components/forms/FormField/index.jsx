import React from 'react';
import { Input } from '../../ui';

/**
 * Componente FormField que envuelve Input con validación y manejo de errores
 * @param {Object} props - Propiedades del componente
 * @param {string} props.label - Etiqueta del campo
 * @param {string} props.name - Nombre del campo
 * @param {string} props.error - Mensaje de error
 * @param {string} props.helperText - Texto de ayuda
 * @param {boolean} props.required - Si el campo es requerido
 * @param {Object} props.rest - Resto de propiedades del Input
 */
const FormField = ({ 
  label, 
  name, 
  error, 
  helperText, 
  required = false,
  ...rest 
}) => {
  const fieldId = `field-${name}`;
  const displayLabel = required ? `${label} *` : label;

  return (
    <div className="w-full text-[var(--color-text-dark)]">
      <Input
        id={fieldId}
        name={name}
        label={displayLabel}
        error={error}
        helperText={helperText}
        {...rest}
      />
    </div>
  );
};

export default FormField; 