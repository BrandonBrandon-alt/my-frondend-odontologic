import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Importa el hook de autenticación y el contexto
import { useAuth } from '../../context/AuthContext';
import { useAuthForm } from '../../hooks/useAuthForm';

// Importa componentes de UI e iconos
import { Input, Button, Alert } from '../';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import loginImage from '../../assets/Login.png';

// --- Animaciones de Framer Motion ---
const formVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.3 } },
};
const imageVariants = {
  hidden: { opacity: 0, x: 50 }, // Invertimos la dirección para el login
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
};
const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function FormularioLogin() {
  const { login: loginContext } = useAuth();

  const {
    formData,
    loading,
    error,
    message,
    isScriptLoaded,
    handleChange,
    handleSubmit: handleAuthSubmit,
  } = useAuthForm({ email: '', password: '' }, loginContext);

  const [showPassword, setShowPassword] = useState(false);
  const [displayError, setDisplayError] = useState(null); // Nuevo estado para el error a mostrar

  useEffect(() => {
    if (error) {
      if (String(error).includes("inactiva")) {
        setDisplayError(
          <>
            Tu cuenta está inactiva. Revisa tu correo o{' '}
            <Link to="/resend-activation" className="font-semibold text-primary hover:text-secondary underline">
              Reenviar Código
            </Link>.
          </>
        );
      } else {
        setDisplayError(error);
      }
    } else {
      setDisplayError(null);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuthSubmit(e, 'login');
  };

  return (
    <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden md:flex md:min-h-[600px]">
      <motion.div
        className="hidden md:block md:w-1/2 relative overflow-hidden"
        variants={imageVariants}
      >
        <img src={loginImage} alt="Fondo de inicio de sesión" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 to-secondary/70"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">¡Bienvenido de Nuevo!</h2>
            <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">Accede a tu perfil y gestiona tus citas y tratamientos.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center"
        variants={formVariants}
      >
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-4" variants={textVariants}>
          Inicia Sesión
        </motion.h2>
        <motion.p className="text-base text-text-dark text-center mb-8" variants={textVariants} transition={{ delay: 0.1 }}>
          Ingresa tus credenciales para continuar.
        </motion.p>

        <AnimatePresence>
          {message && <Alert key="success-alert" type="success" message={message} />}
          {displayError && <Alert key="error-alert" type="error" message={displayError} />}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Correo Electrónico" type="email" name="email" value={formData.email} onChange={handleChange} required startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />} />
          <Input label="Contraseña" type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />} endIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 p-1" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={showPassword}>{showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}</button>} />

          <Button type="submit" loading={loading} disabled={!isScriptLoaded} className="w-full py-3 mt-6">
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>

          <p className="text-xs text-left text-gray-500 mt-4">
            This site is protected by reCAPTCHA and the Google&nbsp;
            <a href="https://policies.google.com/privacy" className="underline hover:text-primary">Privacy Policy</a> and&nbsp;
            <a href="https://policies.google.com/terms" className="underline hover:text-primary">Terms of Service</a> apply.
          </p>
        </form>

        <p className="mt-6 text-center text-text-dark text-sm">
          <Link to="/solicitar-reset" className="font-semibold text-primary hover:text-secondary underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
        <p className="mt-2 text-center text-text-dark text-sm">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-semibold text-primary hover:text-secondary underline">
            Regístrate aquí
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default FormularioLogin;