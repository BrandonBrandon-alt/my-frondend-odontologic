// src/pages/CambiarPasswordReset.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService'; // Importa el servicio de autenticación

import Input from '../components/Input';
import Button from '../components/Button';
import MessageBox from '../components/MessageBox';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import resetImage from '../assets/6.jpg'; // Usar la misma imagen o una diferente si tienes

function CambiarPasswordReset() {
  const navigate = useNavigate();
  const location = useLocation(); // Para acceder al estado de la navegación
  
  // Puedes pre-llenar el correo si vienes de la página de solicitar-reset
  const initialEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    email: initialEmail, // Mantener email si lo pasas, aunque el backend no lo use en cambiar-password-reset
    code: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Opcional: Si quieres asegurar que el usuario tenga un email al llegar aquí
  useEffect(() => {
    // Si la ruta `cambiar-password-reset` se accede directamente sin un email en el estado
    // y quieres que el email sea un prerrequisito, podrías redirigir.
    // Comenta o remueve esta sección si no es un requisito estricto
    /*
    if (!initialEmail) {
      console.warn("Accediendo a CambiarPasswordReset sin email en el estado de la ruta. Considera redirigir a solicitar-reset.");
      // navigate('/solicitar-reset', { replace: true }); 
    }
    */
  }, [initialEmail, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (message || error || passwordMismatchError) {
      setMessage('');
      setError('');
      setPasswordMismatchError('');
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    setPasswordMismatchError('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordMismatchError('Las nuevas contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    try {
      // CAMBIO AQUÍ: Se mantiene authService.resetPassword (que coincide con tu backend)
      const response = await authService.resetPassword(
        formData.code,
        formData.newPassword
      );
      setMessage(response.message || 'Contraseña restablecida exitosamente. Ahora puedes iniciar sesión.');
      
      // Limpiar el formulario
      setFormData({
        email: '', code: '', newPassword: '', confirmNewPassword: ''
      });

      // Redirigir al login después de un mensaje de éxito
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error('Error al cambiar contraseña:', err);
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

  // Variantes de Framer Motion (puedes copiarlas de Login/Register)
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
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <img
            src={resetImage}
            alt="Fondo de cambio de contraseña"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/70 to-secondary/70"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
            <div className="text-white z-10">
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
                Establece tu Nueva Contraseña
              </h2>
              <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">
                Ingresa el código que recibiste y tu nueva contraseña segura.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Columna del Formulario */}
        <motion.div
          className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-4"
            variants={textVariants}
          >
            Restablecer Contraseña
          </motion.h2>
          <motion.p
            className="text-base text-text-dark text-center mb-8"
            variants={textVariants}
            transition={{ delay: 0.1 }}
          >
            Ingresa el código de recuperación y tu nueva contraseña.
          </motion.p>

          <MessageBox type="success" message={message} />
          <MessageBox type="error" message={error} />
          <MessageBox type="warning" message={passwordMismatchError} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Si quieres mostrar el email, aunque el backend no lo use directamente */}
            {initialEmail && (
              <Input
                label="Correo Electrónico (No editable)"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                readOnly // Para que el usuario no pueda cambiarlo
                className="bg-gray-100 cursor-not-allowed" // Estilo para indicar que es solo lectura
              />
            )}

            <Input
              label="Código de Recuperación"
              id="code"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="Ej. d5f7c3b1"
            />

            <div className="relative">
              <Input
                label="Nueva Contraseña"
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                minLength="6"
                maxLength="20"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-5"
                aria-label={showNewPassword ? 'Ocultar nueva contraseña' : 'Mostrar nueva contraseña'}
              >
                {showNewPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirmar Nueva Contraseña"
                id="confirmNewPassword"
                type={showConfirmNewPassword ? 'text' : 'password'}
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
                placeholder="Confirma tu nueva contraseña"
              />
              <button
                type="button"
                onClick={toggleConfirmNewPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-5"
                aria-label={showConfirmNewPassword ? 'Ocultar nueva contraseña' : 'Mostrar nueva contraseña'}
              >
                {showConfirmNewPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
                )}
              </button>
            </div>

            <Button loading={loading} className="py-3 mt-6">
              Restablecer Contraseña
            </Button>
          </form>

          <p className="mt-6 text-center text-text-dark text-sm">
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-secondary underline"
            >
              Volver al inicio de sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CambiarPasswordReset;