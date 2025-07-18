import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Importa el servicio de autenticación y el hook de formulario
import { authService } from '../../services';
import { useAuthForm } from '../../hooks/useAuthForm';

// Importa componentes de UI e iconos
import { Input, Button, Alert } from '../';
import { FaUser, FaIdCard, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
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
    handleChange: originalHandleChange,
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
  const [fieldErrors, setFieldErrors] = useState({});

  // Validación en vivo por campo
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'El nombre es obligatorio.';
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(value)) error = 'Solo letras y espacios.';
        break;
      case 'idNumber':
        if (!value.trim()) error = 'La identificación es obligatoria.';
        else if (!/^[0-9]+$/.test(value)) error = 'Solo números.';
        else if (value.length < 6) error = 'Mínimo 6 dígitos.';
        break;
      case 'email':
        if (!value.trim()) error = 'El correo es obligatorio.';
        else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) error = 'Correo inválido.';
        break;
      case 'password':
        if (value.length < 6) error = 'Mínimo 6 caracteres.';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Las contraseñas no coinciden.';
        break;
      case 'phone':
        if (!/^[0-9]+$/.test(value)) error = 'Solo números.';
        else if (value.length < 7) error = 'Mínimo 7 dígitos.';
        break;
      case 'address':
        if (!value.trim()) error = 'La dirección es obligatoria.';
        break;
      case 'birth_date':
        if (!value) error = 'La fecha es obligatoria.';
        break;
      default:
        break;
    }
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
  };

  // handleChange modificado para validar en vivo
  const handleChange = (e) => {
    const { name, value } = e.target;
    originalHandleChange(e);
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar todos los campos antes de enviar
    let valid = true;
    Object.entries(formData).forEach(([name, value]) => {
      validateField(name, value);
      if (value === '' || fieldErrors[name]) valid = false;
    });
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden.' }));
      valid = false;
    }
    if (!valid) return;
    handleAuthSubmit(e, 'register');
  };

  return (
    <div className="relative bg-white dark:bg-[var(--color-background)] border border-[var(--border-primary)] rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden md:flex md:min-h-[600px]">
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
          <Input label="Nombre Completo" name="name" value={formData.name} onChange={handleChange} required startIcon={<FaUser className="h-5 w-5 text-gray-400" />} error={fieldErrors.name} />
          <Input label="Número de Identificación" name="idNumber" value={formData.idNumber} onChange={handleChange} required startIcon={<FaIdCard className="h-5 w-5 text-gray-400" />} error={fieldErrors.idNumber} />
          <Input label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={handleChange} required startIcon={<FaEnvelope className="h-5 w-5 text-gray-400" />} error={fieldErrors.email} />
          <Input label="Contraseña" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} required minLength="6" startIcon={<FaLock className="h-5 w-5 text-gray-400" />} endIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 p-1" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={showPassword}>{showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}</button>} error={fieldErrors.password} />
          <Input label="Confirmar Contraseña" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} required startIcon={<FaLock className="h-5 w-5 text-gray-400" />} endIcon={<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2 p-1" aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={showConfirmPassword}>{showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}</button>} error={fieldErrors.confirmPassword} />
          <Input label="Teléfono" name="phone" type="tel" value={formData.phone} onChange={handleChange} required startIcon={<FaPhone className="h-5 w-5 text-gray-400" />} error={fieldErrors.phone} />
          <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} required startIcon={<FaMapMarkerAlt className="h-5 w-5 text-gray-400" />} error={fieldErrors.address} />
          <Input label="Fecha de Nacimiento" name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} required startIcon={<FaCalendarAlt className="h-5 w-5 text-gray-400" />} error={fieldErrors.birth_date} />

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