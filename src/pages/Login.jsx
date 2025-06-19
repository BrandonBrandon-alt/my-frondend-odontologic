// src/pages/Login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// import axios from 'axios'; // ¡Asegúrate de que esta línea esté comentada o eliminada!

// No necesitas importar authService directamente aquí, porque usarás el contexto
// import { authService } from '../services';

// ***** CAMBIO CLAVE: Importa useAuth del contexto *****
import { useAuth } from '../context/AuthContext'; // Importa el hook useAuth

// Importa los componentes Input, Button, MessageBox
import Input from '../components/Input';
import Button from '../components/Button';
import MessageBox from '../components/MessageBox';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// Importa la imagen de fondo para el lado del login
import loginImage from '../assets/6.jpg';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  // ***** CAMBIO CLAVE: Obtén la función 'login' del contexto *****
  // La renombramos a 'loginContext' para evitar cualquier posible conflicto de nombres.
  const { login: loginContext } = useAuth(); // <-- ESTA LÍNEA ES FUNDAMENTAL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (message || error) {
      setMessage('');
      setError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // ***** CAMBIO CLAVE AQUÍ: LLAMA A loginContext EN LUGAR DE authService.login *****
      // loginContext es la función del AuthContext que se encarga de:
      // 1. Llamar a authService.login (que guarda en localStorage)
      // 2. Y, lo más importante, ACTUALIZAR EL ESTADO GLOBAL del contexto.
      const response = await loginContext(formData); // <--- ¡ESTE ES EL CAMBIO!

      setMessage(response.message || 'Inicio de sesión exitoso.');

      // Redirigir al usuario al dashboard correcto basado en el rol.
      // `response.user` aquí proviene del `AuthContext` que ya lo obtuvo del `authService`.
      const userRole = response.user?.role;
      let dashboardPath = '/dashboard'; // Default o para pacientes
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

      // El error que viene del contexto (o del servicio subyacente) ya debe ser manejable
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
      } else {
        setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Variantes de Framer Motion (sin cambios)
  const pageVariants = { /* ... */ };
  const formVariants = { /* ... */ };
  const imageVariants = { /* ... */ };
  const textVariants = { /* ... */ };

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

          <MessageBox type="success" message={message} />
          <MessageBox type="error" message={error} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo Electrónico"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="correo@example.com"
            />

            <div className="relative">
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
                placeholder="Tu contraseña"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-5"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
                )}
              </button>
            </div>

            <Button loading={loading} className="py-3 mt-6">
              Iniciar Sesión
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