// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline'; // Un ícono para indicar acceso denegado

function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg w-full transform transition-all duration-300 hover:scale-105">
        <ShieldExclamationIcon className="h-24 w-24 text-red-600 mx-auto mb-6 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-800 mb-4">
          Acceso Denegado
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
          No tienes los permisos necesarios para acceder a esta página.
          Por favor, contacta al administrador si crees que esto es un error.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-primary-darker transition duration-300 transform hover:scale-105"
          >
            Ir a la Página de Inicio
          </Link>
          <p className="text-sm text-gray-600 mt-4">
            ¿Necesitas iniciar sesión con otra cuenta?{' '}
            <Link to="/login" className="text-secondary hover:underline font-semibold">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;