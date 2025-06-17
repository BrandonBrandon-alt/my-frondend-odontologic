import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Importa iconos de Heroicons (asegúrate de tenerlos instalados: npm install @heroicons/react)
import { UserCircleIcon, ArrowRightEndOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Ya no necesitamos importar el SVG ni el CSS de animaciones de esta forma
// import { ReactComponent as AnimatedLogo } from '../assets/logo-animated.svg';
// import '../styles/LogoAnimations.css'; // Ajusta la ruta si tu carpeta de estilos es diferente

function Navbar() {
  // Estado para controlar si el usuario está logeado (simulación más realista)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para controlar la apertura/cierre del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate(); // Hook para la navegación programática

  // Efecto para verificar el estado de login al cargar el componente
  useEffect(() => {
    // En una aplicación real, verificarías la existencia de un token de acceso
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // Si hay token, está logeado (true), si no, (false)
  }, []);

  // Variantes de Framer Motion para la animación de la barra de navegación principal
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 } },
  };

  // Variantes para los enlaces de navegación principales
  const linkVariants = {
    hover: { scale: 1.05, color: '#60A5FA' }, // Ligero escalado y cambio a un azul secundario en hover
    tap: { scale: 0.95 }, // Efecto al hacer clic/tocar
  };

  // Variantes específicas para el botón de Registro (si aplica, manteniendo tu estilo)
  const registerButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } },
    hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }, // Sombra al pasar el ratón
    tap: { scale: 0.95 },
  };

  // Variantes para el menú móvil (para que se deslice)
  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.3, ease: "easeIn" } },
  };

  // Función simulada para cerrar sesión
  const handleLogout = () => {
    // En una aplicación real, harías esto:
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login'); // Redirigir al login después de cerrar sesión
    // CONSIDERAR: Usar un modal de confirmación en lugar de alert() en producción
    // alert('Sesión cerrada.');
  };

  // Función para determinar las clases CSS de NavLink basadas en el estado activo
  const getNavLinkClasses = ({ isActive }) => {
    // Clases base aplicadas a todos los NavLink para un estilo consistente
    const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold transition duration-300 flex items-center space-x-1 whitespace-nowrap";

    // Clases cuando el enlace NO está activo (texto blanco, al pasar el ratón se vuelve azul secundario)
    const inactiveClasses = "text-white hover:text-secondary";

    // Clases cuando el enlace ESTÁ activo (fondo azul secundario, texto primario, sombra)
    const activeClasses = "bg-secondary text-primary shadow-md";

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
          {/* Logo SVG animado con brillos insertado directamente */}
          <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Fondo principal del diente (Color Primario: azul, puedes ajustar) */}
            <path d="M30 0C19.39 0 10.74 8.65 10.74 19.26C10.74 34.39 30 59.97 30 59.97C30 59.97 49.26 34.39 49.26 19.26C49.26 8.65 40.61 0 30 0Z" fill="#007bff"/>
            {/* Brillo superior (más claro, como luz reflejada) */}
            <path d="M30 0C25.5 0 21.61 1.79 19.01 4.5C18.66 4.88 18.06 4.91 17.67 4.56L14.7 1.83C14.31 1.48 14.28 0.88 14.63 0.49C18.3 0.11 23.01 0 30 0Z" fill="white" fillOpacity="0.8"/>
            {/* Brillo lateral sutil (para dar volumen, puedes ajustar el color o la opacidad) */}
            <path d="M49.26 19.26C49.26 14.51 47.74 10.05 44.97 6.42L42.5 9.07C44.75 11.96 46.26 15.52 46.26 19.26C46.26 21.43 45.7 23.51 44.66 25.43L48.24 23.36C49.07 21.84 49.26 20.59 49.26 19.26Z" fill="white" fillOpacity="0.3"/>
            {/* Acabado brillante o "esmalte" (color de acento: teal/pink, ajusta según tu secondary o accent) */}
            <path d="M30 4.5C23.01 4.5 17.06 9.87 15.82 16.5C15.71 17.04 15.93 17.61 16.42 17.87L18.73 19.16C19.22 19.42 19.82 19.21 20.03 18.68C20.91 16.42 22.84 14.5 25.17 13.06C26.79 12.06 28.37 11.75 30 11.75C31.63 11.75 33.21 12.06 34.83 13.06C37.16 14.5 39.09 16.42 39.97 18.68C40.18 19.21 40.78 19.42 41.27 19.16L43.58 17.87C44.07 17.61 44.29 17.04 44.18 16.5C42.94 9.87 36.99 4.5 30 4.5Z" fill="#20c997"/>
            {/* Elementos de brillo adicionales (círculos pequeños que se animan) */}
            <circle className="sparkle-1" cx="38" cy="10" r="1.5" fill="white" />
            <circle className="sparkle-2" cx="45" cy="22" r="1.2" fill="white" />
            <circle className="sparkle-3" cx="22" cy="15" r="1.3" fill="white" />
            <circle className="sparkle-4" cx="30" cy="5" r="1.8" fill="white" />
            <circle className="sparkle-5" cx="15" cy="25" r="1.0" fill="white" />
          </svg>
          <span className="leading-none">Odontologic</span> {/* Nombre de la marca */}
        </NavLink>

        {/* Botón de Menú Hamburguesa (visible solo en pantallas pequeñas) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 focus:outline-none">
            {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
          </button>
        </div>

        {/* Lista de enlaces de navegación (visible en pantallas medianas y grandes) */}
        <ul className="hidden md:flex items-center space-x-6">
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

      {/* Menú Móvil (se muestra/oculta con animaciones) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center space-y-8" // Fondo oscuro para el menú, ocupa toda la pantalla
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            {/* Botón de cerrar menú */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-white p-2 focus:outline-none"
            >
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
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) => `text-3xl font-extrabold transition duration-300 flex items-center space-x-2 ${isActive ? 'text-secondary' : 'text-white hover:text-secondary'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserCircleIcon className="h-8 w-8" />
                      <span>Mi Perfil</span>
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
