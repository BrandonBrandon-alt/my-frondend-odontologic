// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg"> {/* Clases de Tailwind */}
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition duration-300">
          Mi Marca
        </Link>
        <ul className="flex space-x-6"> {/* Espaciado con Tailwind */}
          <li>
            <Link 
              to="/" 
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Acerca de
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;