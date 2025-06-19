
import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // ¡ELIMINA ESTA LÍNEA! Ya no la necesitas.

// Importa el servicio de autenticación
import { authService } from '../services/';

// Importa los nuevos subcomponentes
import Input from '../components/Input';
import Button from '../components/Button';
import MessageBox from '../components/MessageBox';
// Asegúrate de que estos iconos estén instalados: npm install @heroicons/react
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; 

// Importa la imagen de fondo para el lado de la imagen (asegúrate de que esta ruta sea correcta)
import registerImage from '../assets/Registro.png'; // Asegúrate de tener una imagen en esta ruta.

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '', // Asegúrate de que el nombre de la clave coincida con el DTO del backend
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    birth_date: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpiar mensajes al cambiar los campos
    if (message || error || passwordMismatchError) {
      setMessage('');
      setError('');
      setPasswordMismatchError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    setPasswordMismatchError('');

    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatchError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    // Prepara los datos para enviar.
    // El backend espera 'id_number' y 'birth_date' si son opcionales y no se envían.
    // Aunque tu DTO en el backend usa `idNumber` (camelCase) y `birth_date` (snake_case),
    // el código actual de tu DTO es `idNumber`, por lo que lo mantengo así para el frontend.
    // Si tu DTO real en el backend espera `id_number`, deberías ajustar `idNumber` aquí a `id_number`.
    const dataToSend = {
      name: formData.name,
      idNumber: formData.idNumber, // Asegúrate de que este nombre coincida con tu DTO de backend (registroDTO.js)
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      birth_date: formData.birth_date,
    };
    // No necesitamos `delete dataToSend.confirmPassword;` si construimos `dataToSend` explícitamente.

    try {
      // ***** CAMBIO CLAVE AQUÍ: Usamos el servicio en lugar de axios directo *****
      const response = await authService.register(dataToSend);

      setMessage(response.message || 'Registro exitoso. Revisa tu correo para activar tu cuenta.');
      
      // Limpiar el formulario
      setFormData({
        name: '', idNumber: '', email: '', password: '', confirmPassword: '',
        phone: '', address: '', birth_date: ''
      });

      // Redirigir a la página de activación
      setTimeout(() => {
        // Importante: `formData.email` aquí aún tiene el valor del formulario antes de limpiarlo
        navigate('/activate-account', { state: { email: dataToSend.email } }); 
      }, 1500);

    } catch (err) {
      console.error('Error al registrar usuario en el componente:', err);

      // El error que viene del servicio ya tiene el `response.data` si es un error de la API
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.request) {
        // Error de red o servidor no responde
        setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
      } else {
        // Otro tipo de error (ej. en la lógica del frontend antes de la llamada)
        setError('Ocurrió un error inesperado. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Variantes de animación (sin cambios, ya están bien)
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
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden md:flex md:min-h-[700px]">

        {/* Columna de la Imagen */}
        <motion.div
          className="hidden md:block md:w-1/2 relative overflow-hidden"
          variants={imageVariants}
        >
          <img
            src={registerImage}
            alt="Fondo de registro de Odontologic"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 to-secondary/70"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
            <div className="text-white z-10">
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
                Tu Sonrisa, Nuestra Prioridad
              </h2>
              <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">
                Regístrate y comienza tu viaje hacia una salud bucal excepcional con Odontologic.
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
            Crea tu Cuenta
          </motion.h2>
          <motion.p
            className="text-base text-text-dark text-center mb-8"
            variants={textVariants}
            transition={{ delay: 0.1 }}
          >
            Regístrate en pocos pasos y accede a tu perfil de paciente.
          </motion.p>

          <MessageBox type="success" message={message} />
          <MessageBox type="error" message={error} />
          <MessageBox type="warning" message={passwordMismatchError} />

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nombre Completo"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Juan Pérez"
            />

            <Input
              label="Número de Identificación"
              id="idNumber"
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              pattern="^[0-9]{8,10}$"
              title="Debe tener entre 8 y 10 dígitos numéricos"
              placeholder="Ej. 123456789"
            />

            <Input
              label="Correo Electrónico"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Ej. correo@example.com"
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
                placeholder="Mínimo 6 caracteres"
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

            <div className="relative">
              <Input
                label="Confirmar Contraseña"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirma tu contraseña"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-5"
                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
                )}
              </button>
            </div>

            <Input
              label="Teléfono"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^[0-9]{10}$"
              title="Debe tener 10 dígitos numéricos"
              placeholder="Ej. 3001234567"
            />

            <Input
              label="Dirección"
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              maxLength="255"
              required
              placeholder="Ej. Calle 123 #45-67"
            />

            <Input
              label="Fecha de Nacimiento"
              id="birth_date"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />

            <Button loading={loading} className="py-3 mt-6">
              Registrarse
            </Button>
          </form>

          <p className="mt-6 text-center text-text-dark text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-secondary underline"
            >
              Inicia Sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Register;