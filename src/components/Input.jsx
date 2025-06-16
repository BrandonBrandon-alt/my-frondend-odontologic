// src/components/Input.jsx
import React from 'react';

// Este componente representa un campo de entrada de formulario con su etiqueta.
// Recibe todas las props estándar de un input HTML, más una prop 'label'.
const Input = ({ label, id, ...props }) => {
  return (
    <div>
      {label && ( // Renderiza la etiqueta solo si se proporciona la prop 'label'
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id} // El ID del input debe coincidir con el 'htmlFor' de la etiqueta
        {...props} // Pasa todas las demás props (type, name, value, onChange, required, etc.)
        // Las clases de foco ahora usan 'accent'
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
        //                          ⬆️ Aquí cambiamos a accent      ⬆️ Aquí cambiamos a accent
      />
    </div>
  );
};

export default Input;
