// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
// Importa iconos de Heroicons (asegúrate de tenerlos instalados: npm install @heroicons/react)
import { SparklesIcon, UserCircleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulación de estado de login
  // En una aplicación real, este estado vendría de un contexto de autenticación o Redux.

  // Variantes de Framer Motion para la animación de la barra de navegación
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 } },
  };

  // Variantes para los enlaces de navegación principales
  const linkVariants = {
    hover: { scale: 1.05, color: 'var(--color-secondary)' }, // Ligero escalado y cambio a azul claro en hover
    tap: { scale: 0.95 }, // Efecto al hacer clic/tocar
  };

  // Variantes específicas para el botón de Registro
  const registerButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }, // Sombra al pasar el ratón
    tap: { scale: 0.95 },
  };

  // Función simulada para cerrar sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    // En una aplicación real:
    // 1. Eliminar tokens de localStorage/cookies.
    // 2. Redirigir al usuario a la página de login o home.
    // 3. Posiblemente llamar a un endpoint de logout en el backend.
    alert('Sesión cerrada (simulado). En una app real, usarías un modal para confirmar.');
  };

  // Función para determinar las clases CSS de NavLink basadas en el estado activo
  const getNavLinkClasses = ({ isActive }) => {
    // Clases base aplicadas a todos los NavLink para un estilo consistente
    const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold transition duration-300 flex items-center space-x-1 whitespace-nowrap";

    // Clases cuando el enlace NO está activo
    const inactiveClasses = "text-white hover:text-secondary"; // Texto blanco, al pasar el ratón se vuelve azul claro

    // Clases cuando el enlace ESTÁ activo (la página actual)
    const activeClasses = "bg-secondary text-primary shadow-md"; // Fondo azul secundario, texto azul primario

    // Retorna la combinación de clases
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  // Clases específicas para el enlace del logo (no cambia drásticamente al estar activo)
  const getLogoNavLinkClasses = () => {
    const baseClasses = "text-white text-2xl font-bold hover:text-secondary transition duration-300 flex items-center space-x-2";
    return baseClasses;
  };


  return (
    <motion.nav
      className="bg-primary p-4 shadow-lg sticky top-0 z-50" // Fondo azul principal, sombra, sticky para fijar en la parte superior, z-index alto
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Enlace del Logo */}
        <NavLink
          to="/"
          className={getLogoNavLinkClasses}
        >
          {/* Icono de Heroicons para el logo "Odontologic" */}
          <SparklesIcon className="h-8 w-8 text-secondary" /> {/* Icono con tu azul secundario */}
          <span className="leading-none">Odontologic</span> {/* Nombre de la marca */}
        </NavLink>

        {/* Lista de enlaces de navegación */}
        <ul className="flex items-center space-x-6">
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink
                to="/"
                className={getNavLinkClasses}
                end // Asegura que solo sea activo en la ruta exacta "/"
              >
                Home
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink
                to="/about"
                className={getNavLinkClasses}
              >
                Acerca de
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink
                to="/contact"
                className={getNavLinkClasses}
              >
                Contacto
              </NavLink>
            </motion.div>
          </li>

          {/* Renderizado condicional basado en si el usuario está logeado */}
          {isLoggedIn ? (
            <>
              {/* Separador visual */}
              <li className="text-gray-400">|</li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        // Clases específicas para el enlace de "Mi Perfil" (puede tener iconos)
                        `px-4 py-2 rounded-full text-sm font-semibold transition duration-300 flex items-center space-x-1 whitespace-nowrap ${
                            isActive ? 'bg-secondary text-primary shadow-md' : 'text-white hover:text-secondary'
                        }`
                    }
                  >
                    <UserCircleIcon className="h-5 w-5 mr-1" /> {/* Icono de usuario */}
                    <span>Mi Perfil</span>
                  </NavLink>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 hover:bg-gray-100 whitespace-nowrap flex items-center space-x-1"
                  >
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-1" /> {/* Icono de salir */}
                    <span>Cerrar Sesión</span>
                  </button>
                </motion.div>
              </li>
            </>
          ) : (
            <>
              {/* Separador visual */}
              <li className="text-gray-400">|</li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <NavLink
                    to="/login"
                    // Clases para el botón "Iniciar Sesión" (fondo blanco, texto primario)
                    className="bg-white text-primary font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 hover:bg-gray-100 whitespace-nowrap"
                  >
                    Iniciar Sesión
                  </NavLink>
                </motion.div>
              </li>
              <li>
                <motion.div
                  variants={registerButtonVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <NavLink
                    to="/register"
                    // Clases para el botón "Registro" (fondo accent, texto blanco)
                    className="bg-accent text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 hover:bg-primary-darker whitespace-nowrap"
                  >
                    Registro
                  </NavLink>
                </motion.div>
              </li>
            </>
          )}
        </ul>
      </div>
    </motion.nav>
  );
}

export default Navbar;
