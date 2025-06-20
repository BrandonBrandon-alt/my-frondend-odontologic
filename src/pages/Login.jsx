// src/pages/Login.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importa AnimatePresence
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Importa los componentes Input, Button, Alert
import { Input, Button, Alert } from '../components'; // Actualizado para usar Alert
// Importa los iconos necesarios
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

// Importa la imagen de fondo para el lado del login
import loginImage from '../assets/Login.png';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Estados para la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  // Obtén la función 'login' del contexto
  const { login: loginContext } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpia los mensajes/errores al empezar a escribir
    if (message || error) {
      setMessage('');
      setError('');
    }
  };

  // Función para alternar la visibilidad de la contraseña
  // Esta se pasará directamente al `onClick` del icono en el `Input`.
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await loginContext(formData);

      setMessage(response.message || 'Inicio de sesión exitoso.');

      // Limpia el mensaje de éxito después de unos segundos
      setTimeout(() => setMessage(''), 3000);

      // Redirigir al usuario al dashboard correcto basado en el rol.
      const userRole = response.user?.role;
      let dashboardPath = '/patient-dashboard'; // Default o para pacientes
      if (userRole === 'admin') {
        dashboardPath = '/admin-dashboard';
      } else if (userRole === 'dentist') {
        dashboardPath = '/dentist-dashboard';
      }

      setTimeout(() => {
        navigate(dashboardPath);
      }, 1500);

    } catch (err) {
      console.error('Error al iniciar sesión:', err);

      // Manejo de errores más claro
      let errorMessage = 'Ocurrió un error inesperado al iniciar sesión. Inténtalo de nuevo.';
      if (err.response) {
        if (err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
          // Si el backend envía un mensaje específico para cuentas inactivas
          if (errorMessage.includes("no está activa") || errorMessage.includes("inactiva") || errorMessage.includes("inactive")) {
            errorMessage = (
              <>
                Tu cuenta no ha sido activada. Por favor, revisa tu correo para el enlace de activación o{' '}
                <Link to="/resend-activation" className="font-semibold text-primary hover:text-secondary underline">
                  Reenviar Código de Activación
                </Link>.
              </>
            );
          }
        } else if (err.response.status === 401) { // Por ejemplo, para credenciales incorrectas
          errorMessage = 'Correo electrónico o contraseña incorrectos.';
        } else {
          errorMessage = `Error del servidor: ${err.response.status}. Inténtalo de nuevo.`;
        }
      } else if (err.request) {
        errorMessage = 'No se pudo conectar con el servidor. Por favor, revisa tu conexión a internet.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Variantes de Framer Motion (sin cambios)
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.3 } },
  };
  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  };
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="min-h-screen bg-background-light flex items-center justify-center p-4 md:p-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden md:flex md:min-h-[600px] flex-row-reverse">
        {/* Columna de la Imagen */}
        <motion.div
          className="hidden md:block md:w-1/2 relative overflow-hidden"
          // initial="hidden" // No es necesario si ya se define en el padre
          // animate="visible" // No es necesario si ya se define en el padre
          variants={imageVariants}
        >
          <img
            src={loginImage}
            alt="Fondo de inicio de sesión de Odontologic"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/70 to-secondary/70"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
            <div className="text-white z-10">
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
                ¡Bienvenido de Nuevo!
              </h2>
              <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">
                Accede a tu perfil de paciente y gestiona tus citas y tratamientos.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Columna del Formulario */}
        <motion.div
          className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center"
          // initial="hidden" // No es necesario si ya se define en el padre
          // animate="visible" // No es necesario si ya se define en el padre
          variants={formVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-4"
            variants={textVariants}
          >
            Inicia Sesión
          </motion.h2>
          <motion.p
            className="text-base text-text-dark text-center mb-8"
            variants={textVariants}
            transition={{ delay: 0.1 }}
          >
            Ingresa tus credenciales para continuar.
          </motion.p>

          <AnimatePresence>
            {/* Mensajes de éxito o error */}
            {message && <Alert type="success" message={message} key="login-success" />}
            {error && <Alert type="error" message={error} key="login-error" />}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo Electrónico"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              helperText="Ejemplo: correo@example.com"
              startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />} // Añade icono de sobre
            />

            {/* Input de Contraseña Simplificado */}
            <Input
              label="Contraseña"
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              maxLength="20"
              helperText="Mínimo 6 caracteres"
              startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />} // Añade icono de candado
              endIcon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  tabIndex={0}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="ml-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              }
            />

            <Button type="submit" loading={loading} className="py-3 mt-6">
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <p className="mt-6 text-center text-text-dark text-sm">
            <Link
              to="/solicitar-reset"
              className="font-semibold text-primary hover:text-secondary underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
          <p className="mt-2 text-center text-text-dark text-sm">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/register"
              className="font-semibold text-primary hover:text-secondary underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Login;