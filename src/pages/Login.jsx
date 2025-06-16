import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importa los componentes Input, Button, MessageBox (ya los tienes)
import Input from '../components/Input';
import Button from '../components/Button';
import MessageBox from '../components/MessageBox';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Para el toggle de contraseña

// Importa la imagen de fondo para el lado del login
import loginImage from '../assets/6.jpg'; // Asegúrate de tener una imagen en esta ruta, por ejemplo, una sonrisa o un ambiente de clínica acogedor.

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // Mensaje de éxito
  const [error, setError] = useState('');     // Mensaje de error

  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Hook para la navegación programática

  // Manejador de cambios para los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpia mensajes de error/éxito al empezar a escribir
    if (message || error) {
      setMessage('');
      setError('');
    }
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Petición POST a tu endpoint de login usando Axios
      const response = await axios.post('http://localhost:3000/api/login', formData);

      // Si la petición es exitosa (código 2xx), Axios no lanzará un error,
      // y la respuesta estará en response.data
      const { message, token, refreshToken, user } = response.data;

      // Almacenar los tokens (ej. en localStorage, pero considera opciones más seguras para prod)
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user)); // Guarda info del usuario si es necesaria en el front

      setMessage(message || 'Inicio de sesión exitoso.');

      // Redirigir al usuario al dashboard o página de inicio
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500); // Pequeño retraso para que el mensaje sea visible

    } catch (err) {
      // Axios captura errores de red y respuestas HTTP no 2xx en el bloque catch
      console.error('Error al iniciar sesión:', err);

      if (err.response && err.response.data && err.response.data.error) {
        // Error de validación o error de negocio del backend
        setError(err.response.data.error);
      } else if (err.request) {
        // La solicitud fue hecha pero no se recibió respuesta (ej. servidor caído, CORS)
        setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
      } else {
        // Algo más causó el error
        setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false); // Deshabilitar estado de carga
    }
  };

  // Variantes de Framer Motion
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.3 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 }, // Animación desde la derecha
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
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden md:flex md:min-h-[600px] flex-row-reverse"> {/* Contenedor principal, imagen a la derecha */}

        {/* Columna de la Imagen (visible en md y superior) */}
        <motion.div
          className="hidden md:block md:w-1/2 relative overflow-hidden"
          variants={imageVariants}
        >
          <img
            src={loginImage}
            alt="Fondo de inicio de sesión de Odontologic"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Capa de degradado sobre la imagen para mejorar la legibilidad y estética */}
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/70 to-secondary/70"></div> {/* Degradado diferente */}
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

          {/* Mensajes de feedback */}
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

            {/* Campo de Contraseña con Toggle */}
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
