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
  ChevronDownIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import useScrollDirection from '../../../hooks/useScrollDirection';
import { ThemeToggle } from '../../ui';

/**
 * Componente Navbar profesional y atractivo
 */
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, user, logout: logoutContext, loading } = useAuth();
  const dropdownRef = useRef(null);
  const { isVisible } = useScrollDirection();
  const { isDarkMode } = useTheme();

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
    hiddenScroll: { 
      y: -100, 
      opacity: 0, 
      transition: { 
        type: "tween", 
        duration: 0.25,
        ease: "easeInOut"
      } 
    },
    visibleScroll: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "tween", 
        duration: 0.25,
        ease: "easeInOut"
      } 
    },
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
    const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-1 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2";
    const inactiveClasses = "text-white hover:bg-white/10 hover:text-accent bg-transparent";
    const activeClasses = "bg-[var(--color-accent)] text-white shadow-lg border-2 border-white/20 relative after:content-[''] after:block after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-1 after:rounded-full after:bg-white after:animate-navbar-indicator";
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  // Renderizado condicional mientras carga
  if (loading) {
    return null;
  }

  return (
    <motion.nav
      className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-accent)] shadow-2xl border-b border-white/20 fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      initial="hidden"
      animate={isVisible ? "visibleScroll" : "hiddenScroll"}
      variants={navVariants}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-2 md:px-0">
        {/* Logo */}
        <NavLink to="/" className="text-white text-2xl font-bold hover:text-[var(--color-accent)] transition duration-300 flex items-center space-x-3">
          <style>{`
            .sparkle {
              transform-origin: center;
              animation: sparkle-blink 2.2s infinite ease-in-out;
            }
            .sparkle2 {
              animation-delay: 0.7s;
              animation: sparkle-scale 2.5s infinite alternate;
            }
            .sparkle3 {
              animation-delay: 1.2s;
              animation: sparkle-rotate 3s infinite linear;
            }
            @keyframes sparkle-blink {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 0.2; }
            }
            @keyframes sparkle-scale {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.4); }
            }
            @keyframes sparkle-rotate {
              0% { transform: rotate(0deg) scale(1); }
              100% { transform: rotate(360deg) scale(1.2); }
            }
          `}</style>
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tooth-cool" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-accent)" />
              </linearGradient>
              <radialGradient id="shine" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {/* Diente bold y curvo */}
            <path d="M32 12C22 12 14 26 20 48C23 60 29 60 32 50C35 60 41 60 44 48C50 26 42 12 32 12Z" fill="url(#tooth-cool)" stroke="white" strokeWidth="3.5"/>
            {/* Sombra interior */}
            <ellipse cx="32" cy="38" rx="10" ry="4" fill="url(#shine)" opacity="0.5"/>
            {/* Brillos tipo sparkle animados */}
            <g>
              <polygon className="sparkle" points="50,20 52,24 56,24 53,27 54,31 50,29 46,31 47,27 44,24 48,24" fill="#fff" opacity="0.85"/>
              <circle className="sparkle2" cx="40" cy="18" r="2" fill="#fff" opacity="0.8"/>
              <rect className="sparkle3" x="38" y="14" width="1" height="5" rx="0.5" fill="#fff" opacity="0.7"/>
              <polygon points="24,36 25,38 27,38 25.5,39.5 26,42 24,41 22,42 22.5,39.5 21,38 23,38" fill="#fff" opacity="0.6"/>
            </g>
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
              <NavLink to="/" className={getNavLinkClasses} end><HomeIcon className="h-5 w-5 mr-1 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200" />Home</NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink to="/services" className={getNavLinkClasses}><WrenchScrewdriverIcon className="h-5 w-5 mr-1 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200" />Servicios</NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink to="/about" className={getNavLinkClasses}><InformationCircleIcon className="h-5 w-5 mr-1 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200" />Acerca de</NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
              <NavLink to="/contact" className={getNavLinkClasses}><PhoneIcon className="h-5 w-5 mr-1 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200" />Contacto</NavLink>
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
                  <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mr-2 border-2 border-white/30 overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <UserCircleIcon className="h-7 w-7 text-white" />
                    )}
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
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-[var(--color-background)] rounded-xl shadow-2xl py-2 z-10 overflow-hidden border border-gray-100 dark:border-gray-700 animate-fade-in-up"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <NavLink
                        to={getDashboardPath(user?.role)}
                        className="block px-5 py-3 text-base text-[var(--color-text-dark)] dark:text-[var(--color-text-main)] hover:bg-[var(--color-accent)]/10 dark:hover:bg-[var(--color-accent)]/20 hover:text-[var(--color-accent)] cursor-pointer transition duration-150"
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
                        className="block px-5 py-3 text-base text-[var(--color-text-dark)] hover:bg-[var(--color-accent)]/10 transition duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Mi Perfil
                      </NavLink>
                      <NavLink
                        to={'/change-password'}
                        className="block px-5 py-3 text-base text-[var(--color-text-dark)] dark:text-[var(--color-text-main)] hover:bg-[var(--color-accent)]/10 dark:hover:bg-[var(--color-accent)]/20 hover:text-[var(--color-accent)] cursor-pointer transition duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Cambiar Contraseña
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-5 py-3 text-base text-[var(--color-text-dark)] dark:text-[var(--color-text-main)] hover:bg-[var(--color-accent)]/10 dark:hover:bg-[var(--color-accent)]/20 hover:text-[var(--color-accent)] cursor-pointer transition duration-150 flex items-center"
                      >
                        <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2" />
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li className="text-white/40">|</li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <ThemeToggle size="sm" />
                </motion.div>
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
                    className="px-6 py-2 bg-[var(--color-text-on-accent)] text-[var(--color-primary)] rounded-full text-sm font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-text-on-accent)] transition duration-300 flex items-center space-x-1 shadow-md"
                  >
                    Registrarse
                  </NavLink>
                </motion.div>
              </li>
              <li className="text-white/40">|</li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <ThemeToggle size="sm" />
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
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-64 bg-[var(--color-background)] shadow-xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-2 mb-6">
                {/* Logo animado */}
                <svg width="36" height="36" viewBox="0 0 64 64" fill="none" className="animate-spin-slow" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="tooth-cool" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" />
                      <stop offset="100%" stopColor="var(--color-accent)" />
                    </linearGradient>
                  </defs>
                  <path d="M32 12C22 12 14 26 20 48C23 60 29 60 32 50C35 60 41 60 44 48C50 26 42 12 32 12Z" fill="url(#tooth-cool)" stroke="white" strokeWidth="3.5"/>
                </svg>
                <span className="text-xl font-bold text-[var(--color-accent)]">Odontologic</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[var(--color-text-dark)]">Menú</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-dark)]"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <nav className="space-y-4">
                  <NavLink
                    to="/"
                    className="block py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HomeIcon className="h-5 w-5 inline mr-2 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200" />
                    Home
                  </NavLink>
                  <NavLink
                    to="/services"
                    className="block py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <WrenchScrewdriverIcon className="h-5 w-5 inline mr-2 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200" />
                    Servicios
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="block py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <InformationCircleIcon className="h-5 w-5 inline mr-2 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200" />
                    Acerca de
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="block py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PhoneIcon className="h-5 w-5 inline mr-2 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200" />
                    Contacto
                  </NavLink>

                  {isLoggedIn ? (
                    <>
                      <hr className="my-4" />
                      <NavLink
                        to={getDashboardPath(user?.role)}
                        className="block py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150"
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
                        className="block py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Mi Perfil
                      </NavLink>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150 flex items-center"
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
                        className="block py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Iniciar Sesión
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="block py-2 text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition duration-150"
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