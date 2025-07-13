import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Importa el servicio de autenticación y el hook de formulario
import { authService } from '../../services';
import { useAuthForm } from '../../hooks/useAuthForm';

// Importa componentes de UI e iconos
import { Input, Button, Alert } from '../';
import { EyeIcon, EyeSlashIcon, UserIcon, IdentificationIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import registerImage from '../../assets/Registro.png';

// --- Animaciones de Framer Motion ---
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

function FormularioRegistro() {
  const {
    formData,
    loading,
    error,
    message,
    isScriptLoaded, // Para saber si el script de reCAPTCHA cargó
    handleChange,
    handleSubmit: handleAuthSubmit, // Renombramos para claridad
    setError,
  } = useAuthForm(
    {
      name: '',
      idNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      birth_date: '',
    },
    authService.register,
    { redirectPath: '/activate-account' }
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    // Le pasamos el nombre de la acción para reCAPTCHA v3
    handleAuthSubmit(e, 'register');
  };

  return (
    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden md:flex md:min-h-[700px]">
      <motion.div
        className="hidden md:block md:w-1/2 relative overflow-hidden"
        variants={imageVariants}
      >
        <img src={registerImage} alt="Fondo de registro" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 to-secondary/70"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">Tu Sonrisa, Nuestra Prioridad</h2>
            <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">Regístrate y comienza tu viaje hacia una salud bucal excepcional.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center"
        variants={formVariants}
      >
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-4" variants={textVariants}>
          Crea tu Cuenta
        </motion.h2>
        <motion.p className="text-base text-text-dark text-center mb-8" variants={textVariants} transition={{ delay: 0.1 }}>
          Regístrate en pocos pasos y accede a tu perfil de paciente.
        </motion.p>

        <AnimatePresence>
          {message && <Alert key="success-alert" type="success" message={message} />}
          {error && <Alert key="error-alert" type="error" message={error} />}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* --- Tus Inputs (sin cambios) --- */}
          <Input label="Nombre Completo" name="name" value={formData.name} onChange={handleChange} required startIcon={<UserIcon className="h-5 w-5 text-gray-400" />} />
          <Input label="Número de Identificación" name="idNumber" value={formData.idNumber} onChange={handleChange} required startIcon={<IdentificationIcon className="h-5 w-5 text-gray-400" />} />
          <Input label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={handleChange} required startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />} />
          <Input label="Contraseña" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} required minLength="6" startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />} endIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 p-1" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={showPassword}>{showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}</button>} />
          <Input label="Confirmar Contraseña" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} required startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />} endIcon={<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2 p-1" aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={showConfirmPassword}>{showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}</button>} />
          <Input label="Teléfono" name="phone" type="tel" value={formData.phone} onChange={handleChange} required startIcon={<PhoneIcon className="h-5 w-5 text-gray-400" />} />
          <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} required startIcon={<MapPinIcon className="h-5 w-5 text-gray-400" />} />
          <Input label="Fecha de Nacimiento" name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} required startIcon={<CalendarIcon className="h-5 w-5 text-gray-400" />} />

          <Button type="submit" loading={loading} disabled={!isScriptLoaded} className="w-full py-3 mt-6">
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>

          <p className="text-xs text-left text-gray-500 mt-4">
            This site is protected by reCAPTCHA and the Google&nbsp;
            <a href="https://policies.google.com/privacy" className="underline hover:text-primary">Privacy Policy</a> and&nbsp;
            <a href="https://policies.google.com/terms" className="underline hover:text-primary">Terms of Service</a> apply.
          </p>
        </form>

        <p className="mt-6 text-center text-text-dark text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-semibold text-primary hover:text-secondary underline">
            Inicia Sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default FormularioRegistro;