import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDownIcon
} from '@heroicons/react/24/outline';

import { useAuth } from '../../../context/AuthContext';

/**
 * Componente Navbar profesional y atractivo
 */
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, user, logout: logoutContext, loading } = useAuth();
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Configuración de roles
  const roleConfig = {
    admin: { emoji: '👑', label: 'Administrador' },
    dentist: { emoji: '🦷', label: 'Dentista' },
    user: { emoji: '👤', label: 'Paciente' }
  };

  const getRoleInfo = (role) => {
    return roleConfig[role] || { emoji: '❓', label: 'Usuario' };
  };

  // Animaciones
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 } },
  };

  const linkVariants = {
    hover: { scale: 1.08, backgroundColor: 'rgba(255,255,255,0.12)' },
    tap: { scale: 0.97 },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.3, ease: "easeIn" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
  };

  // Handlers
  const handleLogout = async () => {
    try {
      await logoutContext();
      navigate('/login');
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      navigate('/login');
      setIsDropdownOpen(false);
    }
  };

  const getDashboardPath = (role) => {
    const paths = {
      admin: '/admin-dashboard',
      dentist: '/dentist-dashboard',
      user: '/patient-dashboard'
    };
    return paths[role] || '/patient-dashboard';
  };

  const getNavLinkClasses = ({ isActive }) => {
    const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold transition duration-300 flex items-center space-x-1 whitespace-nowrap";
    const inactiveClasses = "text-white hover:bg-white/10 hover:text-accent";
    const activeClasses = "bg-[var(--color-primary-darker)] text-white shadow-lg border-2 border-white/20";
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  // Renderizado condicional mientras carga
  if (loading) {
    return null;
  }

  return (
    <motion.nav
      className="bg-gradient-to-r from-primary via-accent to-secondary shadow-xl sticky top-0 z-50 animate-fade-in-up"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-2 md:px-0">
        {/* Logo */}
        <NavLink to="/" className="text-white text-2xl font-bold hover:text-accent transition duration-300 flex items-center space-x-2">
          <svg width="36" height="36" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" fill="#fff" fillOpacity="0.08" />
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
          <span className="leading-none drop-shadow-lg">Odontologic</span>
        </NavLink>

        {/* Botón de Menú Hamburguesa (para móvil) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 focus:outline-none hover:bg-white/10 rounded-full transition">
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
              <li className="text-white/40">|</li>
              {/* Dropdown de usuario */}
              <li className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-white px-4 py-2 rounded-full hover:bg-white/10 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-md"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mr-2 border-2 border-white/30">
                    <UserCircleIcon className="h-7 w-7 text-white" />
                  </span>
                  <span className="font-semibold text-lg drop-shadow-sm">{user?.name || 'Mi Perfil'}</span>
                  {user?.role && (
                    <span className="text-sm text-white/80 ml-2">
                      {getRoleInfo(user.role).emoji} {getRoleInfo(user.role).label}
                    </span>
                  )}
                  <ChevronDownIcon className={`h-5 w-5 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-10 overflow-hidden border border-gray-100 animate-fade-in-up"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <NavLink
                        to={getDashboardPath(user?.role)}
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-accent/10 transition duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to={
                          user?.role === 'admin'
                            ? '/admin-profile'
                            : user?.role === 'dentist'
                            ? '/dentist-profile'
                            : '/patient-profile'
                        }
                        className="block px-5 py-3 text-base text-gray-700 hover:bg-accent/10 transition duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Mi Perfil
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-5 py-3 text-base text-gray-700 hover:bg-accent/10 transition duration-150 flex items-center"
                      >
                        <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2" />
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </>
          ) : (
            <>
              <li className="text-white/40">|</li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <NavLink to="/login" className={getNavLinkClasses}>
                    Iniciar Sesión
                  </NavLink>
                </motion.div>
              </li>
              <li>
                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <NavLink
                    to="/register"
                    className="px-6 py-2 bg-white/90 text-accent rounded-full text-sm font-semibold hover:bg-white transition duration-300 flex items-center space-x-1 shadow-md"
                  >
                    Registrarse
                  </NavLink>
                </motion.div>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Menú</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <nav className="space-y-4">
                  <NavLink
                    to="/"
                    className="block py-2 text-gray-700 hover:text-accent transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HomeIcon className="h-5 w-5 inline mr-2" />
                    Home
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="block py-2 text-gray-700 hover:text-accent transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <InformationCircleIcon className="h-5 w-5 inline mr-2" />
                    Acerca de
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="block py-2 text-gray-700 hover:text-accent transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PhoneIcon className="h-5 w-5 inline mr-2" />
                    Contacto
                  </NavLink>

                  {isLoggedIn ? (
                    <>
                      <hr className="my-4" />
                      <NavLink
                        to={getDashboardPath(user?.role)}
                        className="block py-2 text-gray-700 hover:text-accent transition duration-150"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to={
                          user?.role === 'admin'
                            ? '/admin-profile'
                            : user?.role === 'dentist'
                            ? '/dentist-profile'
                            : '/patient-profile'
                        }
                        className="block py-2 text-gray-700 hover:text-accent transition duration-150"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Mi Perfil
                      </NavLink>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left py-2 text-gray-700 hover:text-accent transition duration-150 flex items-center"
                      >
                        <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2" />
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <hr className="my-4" />
                      <NavLink
                        to="/login"
                        className="block py-2 text-gray-700 hover:text-accent transition duration-150"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Iniciar Sesión
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="block py-2 text-gray-700 hover:text-accent transition duration-150"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Registrarse
                      </NavLink>
                    </>
                  )}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 