// src/components/Navbar.jsx
import React, { useState } from 'react'; // Solo necesitas useState para isMenuOpen
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// ICONOS: Asegúrate de que estos iconos existan en Heroicons si decides volver a usarlos.
// Por ahora, con los emojis en los dashboards, esto no causará un error aquí directamente,
// pero si alguno no existe y lo usas en el JSX, te dará error.
import { UserCircleIcon, ArrowRightEndOnRectangleIcon, Bars3Icon, XMarkIcon, HomeIcon, InformationCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';

// ***** CAMBIO CLAVE: Importa useAuth *****
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado solo para el menú móvil

  // ***** CAMBIO CLAVE: Obtén el estado y las funciones del contexto *****
  // Ya no necesitas useEffect ni useState para isLoggedIn, userRole, userName
  const { isLoggedIn, user, logout: logoutContext, loading } = useAuth(); // Renombramos logout para no chocar si hubiera otra variable

  // user.name y user.role se obtendrán directamente del objeto 'user' del contexto
  const userName = user?.name;
  const userRole = user?.role;

  // Variantes de Framer Motion (sin cambios, asumiendo que ya las tienes o son estas)
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

  // Función para cerrar sesión (llama a la función del contexto)
  const handleLogout = async () => {
    try {
      await logoutContext(); // Llama a la función de logout del contexto
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aún si hay error en el backend, limpia el estado local para consistencia
      navigate('/login'); // Redirige de todas formas
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

  // Función para determinar el enlace del dashboard según el rol
  const getDashboardPath = (role) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'dentist':
        return '/dentist-dashboard';
      case 'user': // Paciente
      default:
        return '/patient-dashboard'; // O simplemente '/dashboard'
    }
  };

  // Función auxiliar para renderizar los enlaces del Dashboard y Perfil
  const renderDashboardLinks = (role) => {
    const dashboardPath = getDashboardPath(role);
    return (
      <>
        <li>
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <NavLink
              to={dashboardPath}
              className={getNavLinkClasses}
            >
              <UserCircleIcon className="h-5 w-5 mr-1" />
              <span>{userName || 'Mi Perfil'}</span>
            </NavLink>
          </motion.div>
        </li>
      </>
    );
  };

  // ***** CAMBIO CLAVE: Manejo de estado de carga inicial del contexto *****
  // Esto es para evitar que el Navbar parpadee o muestre información incorrecta
  // mientras el AuthContext está inicializando el estado desde localStorage.
  if (loading) {
    // Puedes mostrar un spinner o un estado vacío temporal.
    // Para el Navbar, simplemente no renderizar nada o un placeholder simple es común.
    return null; // No muestra el Navbar hasta que el estado de autenticación se haya cargado.
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

        {/* Botón de Menú Hamburguesa */}
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
              {renderDashboardLinks(userRole)}
              <li className="text-white text-sm font-semibold mr-2 ml-4">
                {userName ? `${userName}` : 'Cargando...'} ({userRole ? userRole.toUpperCase() : 'ROL'})
              </li>
              <li>
                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 hover:bg-gray-100 whitespace-nowrap flex items-center space-x-1"
                  >
                    <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-1" />
                    <span>Cerrar Sesión</span>
                  </button>
                </motion.div>
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

      {/* Menú Móvil */}
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
                  <li className="text-white text-2xl font-semibold mb-4">
                    {userName ? `${userName}` : 'Cargando...'} ({userRole ? userRole.toUpperCase() : 'ROL'})
                  </li>
                  {/* Enlaces del Dashboard/Perfil en móvil */}
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