// src/pages/Register.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importa AnimatePresence
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services';
import { Input, Button, Alert } from '../components';
import { EyeIcon, EyeSlashIcon, UserIcon, IdentificationIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon, LockClosedIcon } from '@heroicons/react/24/outline'; // Importa más iconos
import registerImage from '../assets/Registro.png'; // Asegúrate de tener una imagen en esta ruta.
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
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
    if (message || error || passwordMismatchError) {
      setMessage('');
      setError('');
      setPasswordMismatchError('');
    }
  };

  // Estas funciones se mantendrán para los onClick de los iconos.
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

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

    const dataToSend = {
      name: formData.name,
      idNumber: formData.idNumber,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      birth_date: formData.birth_date,
    };

    try {
      const response = await authService.register(dataToSend);
      setMessage(response.message || 'Registro exitoso. Revisa tu correo para activar tu cuenta.');

      setFormData({
        name: '', idNumber: '', email: '', password: '', confirmPassword: '',
        phone: '', address: '', birth_date: ''
      });

      setTimeout(() => {
        navigate('/activate-account', { state: { email: dataToSend.email } });
      }, 1500);

    } catch (err) {
      console.error('Error al registrar usuario en el componente:', err);
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

  // Variantes de animación (sin cambios)
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

          <AnimatePresence> {/* Envuelve los Alert con AnimatePresence */}
            {message && <Alert type="success" message={message} key="msg-success" />}
            {error && <Alert type="error" message={error} key="msg-error" />}
            {passwordMismatchError && <Alert type="warning" message={passwordMismatchError} key="msg-mismatch" />}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre Completo"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej. Juan Pérez"
              startIcon={<UserIcon className="h-5 w-5 text-gray-400" />} 
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
              startIcon={<IdentificationIcon className="h-5 w-5 text-gray-400" />} 
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
              startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
            />

            {/* Simplificado el Input de Contraseña */}
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
              startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />} 
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

            {/* Simplificado el Input de Confirmar Contraseña */}
            <Input
              label="Confirmar Contraseña"
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirma tu contraseña"
              startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />} 
              endIcon={
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  tabIndex={0}
                  aria-label={showConfirmPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
                  className="ml-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              }
            />

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
              startIcon={<PhoneIcon className="h-5 w-5 text-gray-400" />} 
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
              startIcon={<MapPinIcon className="h-5 w-5 text-gray-400" />} 
            />

            <Input
              label="Fecha de Nacimiento"
              id="birth_date"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
              startIcon={<CalendarIcon className="h-5 w-5 text-gray-400" />} 
            />

            <Button type="submit" loading={loading} className="py-3 mt-6">
              {loading ? 'Registrando...' : 'Registrarse'}
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