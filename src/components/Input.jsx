// src/components/Input.jsx
import React from 'react';

// Este componente representa un campo de entrada de formulario con su etiqueta,
// y ahora con soporte opcional para iconos al inicio y al final (funcional).
const Input = ({ label, id, icon: StartIcon, actionIcon: EndActionIcon, className, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {StartIcon && ( // Renderiza el icono inicial si se proporciona
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {/* Asegúrate de que StartIcon sea un componente React o un elemento JSX */}
            {StartIcon}
          </div>
        )}
        <input
          id={id}
          {...props}
          // Ajusta el padding-left (pl) y padding-right (pr) si hay iconos
          className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm
            ${StartIcon ? 'pl-10' : ''} // Añade padding si hay un icono al inicio
            ${EndActionIcon ? 'pr-10' : ''} // Añade padding si hay un icono al final
            ${className || ''} // Permite pasar clases adicionales desde el padre
          `}
        />
        {EndActionIcon && ( // Renderiza el icono de acción final si se proporciona
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {/* Asegúrate de que EndActionIcon sea un componente React o un elemento JSX */}
            {EndActionIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;