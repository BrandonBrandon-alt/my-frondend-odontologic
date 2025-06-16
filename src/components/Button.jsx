// src/components/Button.jsx
import React from 'react';

const Button = ({ children, loading, className, ...props }) => {
  return (
    <button
      type="submit" // Por defecto un botón de submit, puedes cambiarlo con props.type
      disabled={loading}
      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-primary'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition duration-300 ${className || ''}`}
      {...props} // Pasa cualquier otra prop (como onClick)
    >
      {loading ? 'Cargando...' : children} {/* Muestra 'Cargando...' si loading es true */}
    </button>
  );
};

export default Button;
