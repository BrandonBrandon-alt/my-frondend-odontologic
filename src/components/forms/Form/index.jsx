import React from 'react';

/**
 * Componente Form que maneja el estado y validación de formularios
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onSubmit - Función llamada al enviar el formulario
 * @param {boolean} props.loading - Estado de carga del formulario
 * @param {string} props.className - Clases CSS adicionales
 * @param {React.ReactNode} props.children - Contenido del formulario
 */
const Form = ({ 
  onSubmit, 
  loading = false, 
  className = '', 
  children,
  ...rest 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      {...rest}
    >
      {children}
    </form>
  );
};

export default Form; 