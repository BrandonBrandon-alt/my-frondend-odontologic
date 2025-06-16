// src/components/Navbar.jsx
import React, { useState } from 'react';
// Importa NavLink en lugar de Link
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparklesIcon, UserCircleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'; // Asegúrate de tener los iconos importados

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, color: 'var(--color-secondary)' },
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
  };

  // Función para obtener las clases de NavLink
  // isActive es una propiedad proporcionada por NavLink
  const getNavLinkClasses = ({ isActive }) => {
    // Clases base para todos los enlaces
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center space-x-1";
    // Clases específicas para el estado inactivo (default)
    const inactiveClasses = "text-white hover:bg-primary-darker"; // Blanco sobre primary, hover más oscuro

    // Clases para el estado activo
    const activeClasses = "bg-secondary text-primary font-bold shadow-md"; // Tu azul secundario como fondo, texto azul primario

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  // Función para obtener las clases del NavLink del logo (solo si el path es '/')
  const getLogoNavLinkClasses = ({ isActive }) => {
    const baseClasses = "text-white text-2xl font-bold hover:text-secondary transition duration-300 flex items-center space-x-2";
    // Para el logo, si está activo (en home), no queremos que cambie radicalmente,
    // solo mantener su estilo normal. El hover ya lo distingue.
    return baseClasses;
  };


  return (
    <motion.nav
      className="bg-primary p-4 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Usamos NavLink para el logo también */}
        <NavLink
          to="/"
          className={getLogoNavLinkClasses} // Usa la función de clases
        >
          <SparklesIcon className="h-8 w-8 text-secondary" />
          <span>Odontologic</span>
        </NavLink>
        <ul className="flex items-center space-x-6">
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink
                to="/"
                className={getNavLinkClasses} // Aplica las clases condicionales
                end // Importante para que solo sea activo cuando la ruta es exactamente "/"
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
                  {/* El botón de Registro es un caso especial porque tiene un estilo de botón más prominente */}
                  {/* Podríamos hacer una función getButtonNavLinkClasses si queremos que también cambie en activo */}
                  {/* Por ahora, lo dejaremos como está para mantener su estilo de botón CTA */}
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                        `bg-accent text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ${
                            isActive ? 'bg-secondary text-primary' : 'hover:bg-primary' // Si activo, usa secondary y primary text
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