// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react'; // Añadí useRef y useEffect
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  PhoneIcon,
  ChevronDownIcon // Icono para el desplegable
} from '@heroicons/react/24/outline';

import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Nuevo estado para el desplegable

  // Referencia para detectar clics fuera del desplegable
  const dropdownRef = useRef(null);

  const { isLoggedIn, user, logout: logoutContext, loading } = useAuth();
  const userName = user?.name;
  const userRole = user?.role;

  // Efecto para cerrar el desplegable al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  // Mapeo de roles a emojis
  const roleEmojis = {
    'admin': '👑',    // Corona para administrador
    'dentist': '🦷',  // Diente para dentista
    'user': '👤',     // Persona para usuario (paciente)
    'unknown': '❓'    // Para roles desconocidos
  };

  const getRoleEmoji = (role) => {
    return roleEmojis[role] || roleEmojis['unknown'];
  };

  // Variantes de Framer Motion
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 } },
  };

  const linkVariants = {
    hover: { scale: 1.05, color: '#60A5FA' },
    tap: { scale: 0.95 },
  };

  const registerButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.3, ease: "easeIn" } },
  };

  // Variantes para el desplegable (Framer Motion)
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
  };


  const handleLogout = async () => {
    try {
      await logoutContext();
      navigate('/login');
      setIsDropdownOpen(false); // Cerrar desplegable al cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      navigate('/login');
      setIsDropdownOpen(false); // Cerrar desplegable al cerrar sesión
    }
  };

  const getNavLinkClasses = ({ isActive }) => {
    const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold transition duration-300 flex items-center space-x-1 whitespace-nowrap";
    const inactiveClasses = "text-white hover:text-secondary";
    const activeClasses = "bg-secondary text-primary shadow-md";
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  const getLogoNavLinkClasses = () => {
    const baseClasses = "text-white text-2xl font-bold hover:text-secondary transition duration-300 flex items-center space-x-2";
    return baseClasses;
  };

  const getDashboardPath = (role) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'dentist':
        return '/dentist-dashboard';
      case 'user':
      default:
        return '/patient-dashboard';
    }
  };

  // Renderizado condicional del Navbar mientras carga el estado de autenticación
  if (loading) {
    return null;
  }

  return (
    <motion.nav
      className="bg-primary p-4 shadow-lg sticky top-0 z-50"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Enlace del Logo */}
        <NavLink to="/" className={getLogoNavLinkClasses()}>
          <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0C19.39 0 10.74 8.65 10.74 19.26C10.74 34.39 30 59.97 30 59.97C30 59.97 49.26 34.39 49.26 19.26C49.26 8.65 40.61 0 30 0Z" fill="#007bff" />
            <path d="M30 0C25.5 0 21.61 1.79 19.01 4.5C18.66 4.88 18.06 4.91 17.67 4.56L14.7 1.83C14.31 1.48 14.28 0.88 14.63 0.49C18.3 0.11 23.01 0 30 0Z" fill="white" fillOpacity="0.8" />
            <path d="M49.26 19.26C49.26 14.51 47.74 10.05 44.97 6.42L42.5 9.07C44.75 11.96 46.26 15.52 46.26 19.26C46.26 21.43 45.7 23.51 44.66 25.43L48.24 23.36C49.07 21.84 49.26 20.59 49.26 19.26Z" fill="white" fillOpacity="0.3" />
            <path d="M30 4.5C23.01 4.5 17.06 9.87 15.82 16.5C15.71 17.04 15.93 17.61 16.42 17.87L18.73 19.16C19.22 19.42 19.82 19.21 20.03 18.68C20.91 16.42 22.84 14.5 25.17 13.06C26.79 12.06 28.37 11.75 30 11.75C31.63 11.75 33.21 12.06 34.83 13.06C37.16 14.5 39.09 16.42 39.97 18.68C40.18 19.21 40.78 19.42 41.27 19.16L43.58 17.87C44.07 17.61 44.29 17.04 44.18 16.5C42.94 9.87 36.99 4.5 30 4.5Z" fill="#20c997" />
            <circle className="sparkle-1" cx="38" cy="10" r="1.5" fill="white" />
            <circle className="sparkle-2" cx="45" cy="22" r="1.2" fill="white" />
            <circle className="sparkle-3" cx="22" cy="15" r="1.3" fill="white" />
            <circle className="sparkle-4" cx="30" cy="5" r="1.8" fill="white" />
            <circle className="sparkle-5" cx="15" cy="25" r="1.0" fill="white" />
          </svg>
          <span className="leading-none">Odontologic</span>
        </NavLink>

        {/* Botón de Menú Hamburguesa (para móvil) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 focus:outline-none">
            {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
          </button>
        </div>

        {/* Lista de enlaces de navegación (Desktop) */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink to="/" className={getNavLinkClasses} end><HomeIcon className="h-5 w-5 mr-1" />Home</NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink to="/about" className={getNavLinkClasses}><InformationCircleIcon className="h-5 w-5 mr-1" />Acerca de</NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink to="/contact" className={getNavLinkClasses}><PhoneIcon className="h-5 w-5 mr-1" />Contacto</NavLink>
            </motion.div>
          </li>

          {isLoggedIn ? (
            <>
              <li className="text-gray-400">|</li>
              {/* Desplegable de Perfil y Cerrar Sesión */}
              <li className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-white px-4 py-2 rounded-full hover:bg-white/10 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UserCircleIcon className="h-6 w-6 mr-2" />
                  <span className="font-semibold text-lg">{userName || 'Mi Perfil'}</span>
                  {userRole && ( // Solo muestra el rol si existe
                    <span className="text-sm text-gray-300 ml-2">
                      {getRoleEmoji(userRole)} {userRole.toUpperCase()} {/* Combina emoji y texto del rol */}
                    </span>
                  )}
                  <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 overflow-hidden"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <NavLink
                        to={getDashboardPath(userRole)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserCircleIcon className="h-5 w-5" />
                        <span>Mi Perfil</span>
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </>
          ) : (
            <>
              <li className="text-gray-400">|</li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <NavLink to="/login" className="bg-white text-primary font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 hover:bg-gray-100 whitespace-nowrap">
                    Iniciar Sesión
                  </NavLink>
                </motion.div>
              </li>
              <li>
                <motion.div variants={registerButtonVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
                  <NavLink to="/register" className="bg-accent text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 hover:bg-primary-darker whitespace-nowrap">
                    Registro
                  </NavLink>
                </motion.div>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Menú Móvil (No cambia, sigue siendo una lista completa) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center space-y-8"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-white p-2 focus:outline-none">
              <XMarkIcon className="h-10 w-10" />
            </button>

            <ul className="flex flex-col items-center space-y-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `text-3xl font-extrabold transition duration-300 ${isActive ? 'text-secondary' : 'text-white hover:text-secondary'}`}
                  onClick={() => setIsMenuOpen(false)}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `text-3xl font-extrabold transition duration-300 ${isActive ? 'text-secondary' : 'text-white hover:text-secondary'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Acerca de
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `text-3xl font-extrabold transition duration-300 ${isActive ? 'text-secondary' : 'text-white hover:text-secondary'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </NavLink>
              </li>

              {isLoggedIn ? (
                <>
                  {/* Aquí puedes decidir si también quieres un desplegable en móvil o simplemente los enlaces directos */}
                  <li className="text-white text-2xl font-semibold mb-4">
                    {userName ? `${userName}` : 'Cargando...'} ({userRole ? `${getRoleEmoji(userRole)} ${userRole.toUpperCase()}` : 'ROL'})
                  </li>
                  <li>
                    <NavLink
                      to={getDashboardPath(userRole)}
                      className={({ isActive }) => `text-3xl font-extrabold transition duration-300 flex items-center space-x-2 ${isActive ? 'text-secondary' : 'text-white hover:text-secondary'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserCircleIcon className="h-8 w-8" />
                      <span>{userRole === 'admin' ? 'Panel Admin' : userRole === 'dentist' ? 'Panel Odont.' : 'Mi Perfil'}</span>
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="text-3xl font-extrabold text-white bg-red-500 py-3 px-6 rounded-full flex items-center space-x-2 transition duration-300 hover:bg-red-600 shadow-lg"
                    >
                      <ArrowRightEndOnRectangleIcon className="h-8 w-8" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="text-3xl font-extrabold text-white bg-white/20 py-3 px-6 rounded-full transition duration-300 hover:bg-white/30 shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="text-3xl font-extrabold text-white bg-accent py-3 px-6 rounded-full transition duration-300 hover:bg-primary-darker shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registro
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;