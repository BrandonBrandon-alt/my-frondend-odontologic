// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
// Importa iconos de Heroicons (asegúrate de tenerlos instalados: npm install @heroicons/react)
import { SparklesIcon, UserCircleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
// Si quieres un icono de diente más específico, podrías buscar en otras librerías o usar un SVG custom.
// Por ejemplo, de @heroicons/react/24/solid podrías usar AcademicCapIcon para algo que parezca una muela o una corona, o un icono más genérico de "Health" o "Medical".
// Por ahora, SparklesIcon sigue siendo una buena opción para "Sonrisa Radiante".

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, color: 'var(--color-secondary)' }, // Texto de enlace a azul claro en hover
    tap: { scale: 0.95 },
  };

  const registerButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Sesión cerrada (simulado)');
    // Puedes también redirigir al usuario: navigate('/');
  };

  const getNavLinkClasses = ({ isActive }) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center space-x-1";
    // Clases específicas para el estado inactivo (default)
    const inactiveClasses = "text-white hover:bg-primary-darker"; // Texto blanco sobre primary, hover más oscuro de primary

    // Clases para el estado activo (fondo secundario, texto primario)
    const activeClasses = "bg-secondary text-primary font-bold shadow-md";

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  const getLogoNavLinkClasses = ({ isActive }) => {
    const baseClasses = "text-white text-2xl font-bold hover:text-secondary transition duration-300 flex items-center space-x-2";
    // El logo en Home no cambia drásticamente al estar activo, solo el hover.
    return baseClasses;
  };


  return (
    <motion.nav
      className="bg-primary p-4 shadow-lg" // Fondo con tu nuevo azul principal
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className={getLogoNavLinkClasses}
        >
          {/* Icono de Heroicons para el logo Odontologic */}
          <SparklesIcon className="h-8 w-8 text-secondary" /> {/* Icono con tu azul secundario */}
          <span>Odontologic</span> {/* Nombre de la marca */}
        </NavLink>
        <ul className="flex items-center space-x-6">
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink
                to="/"
                className={getNavLinkClasses}
                end
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

          {isLoggedIn ? (
            <>
              <li className="text-gray-500">|</li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <NavLink
                    to="/dashboard"
                    className={getNavLinkClasses}
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    <span>Mi Perfil</span>
                  </NavLink>
                </motion.div>
              </li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-primary-darker px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer flex items-center space-x-1"
                  >
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </motion.div>
              </li>
            </>
          ) : (
            <>
              <li className="text-gray-500">|</li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <NavLink
                    to="/login"
                    className={getNavLinkClasses}
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
                    className={({ isActive }) =>
                        `bg-accent text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ${
                            isActive ? 'bg-secondary text-primary' : 'hover:bg-primary'
                        }`
                    }
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