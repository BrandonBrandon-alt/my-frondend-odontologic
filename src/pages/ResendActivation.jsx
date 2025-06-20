// src/pages/ResendActivation.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // No necesitamos useNavigate aquí si solo mostramos un mensaje
import { authService } from '../services/authService'; 

import Input from '../components/Input';
import Button from '../components/Button';
import MessageBox from '../components/MessageBox';

import activationImage from '../assets/6.jpg'; // O usa una imagen genérica si no tienes una específica para activación

function ResendActivation() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await authService.resendActivationCode(email);
      setMessage(response.message || 'Se ha reenviado un nuevo código de activación a tu correo electrónico.');
      setEmail(''); // Opcional: Limpiar el campo después de enviar
    } catch (err) {
      console.error('Error al reenviar código de activación:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
      } else {
        setError('Ocurrió un error inesperado al reenviar el código. Inténtalo de nuevo.');
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
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden md:flex md:min-h-[500px]">

        {/* Columna de la Imagen */}
        <motion.div
          className="hidden md:block md:w-1/2 relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <img
            src={activationImage}
            alt="Fondo de activación de cuenta"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 to-secondary/70"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
            <div className="text-white z-10">
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg">
                Reenvía tu Código de Activación
              </h2>
              <p className="text-lg lg:text-xl font-light opacity-90 leading-relaxed">
                Ingresa tu correo electrónico para recibir un nuevo código y activar tu cuenta.
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
            ¿No recibiste el Código?
          </motion.h2>
          <motion.p
            className="text-base text-text-dark text-center mb-8"
            variants={textVariants}
            transition={{ delay: 0.1 }}
          >
            Reenviaremos un código de activación a tu correo electrónico.
          </motion.p>

          <MessageBox type="success" message={message} />
          <MessageBox type="error" message={error} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Correo Electrónico"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setMessage(''); setError(''); }}
              required
              placeholder="tu@correo.com"
            />

            <Button loading={loading} className="py-3 mt-6">
              Reenviar Código de Activación
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
          <p className="mt-2 text-center text-text-dark text-sm">
            <Link
              to="/activate-account"
              className="font-semibold text-primary hover:text-secondary underline"
            >
              Ya tengo un código, activar cuenta
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ResendActivation;