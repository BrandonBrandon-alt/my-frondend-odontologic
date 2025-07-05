// src/pages/ResendActivation.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../services';
import { Input, Button, Alert } from '../components';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import resendImage from '../assets/3.jpg';

const ResendActivation = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await authService.resendActivationCode(email);
      setMessage(response.message || 'Se ha reenviado el correo de activación. Por favor, revisa tu bandeja de entrada.');
      setError(''); // Limpia cualquier error previo
      setTimeout(() => navigate('/activate-account', { state: { email: email } }), 2000); // Redirige a activación después de 2 segundos
    } catch (err) {
      setError(err.message || 'Hubo un error al reenviar el correo. Por favor, inténtalo de nuevo.');
      setMessage(''); // Limpia cualquier mensaje de éxito previo
    } finally {
      setLoading(false);
    }
  };

  // Variantes de animación de Framer Motion
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4 sm:px-6 lg:px-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-md space-y-8">
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg"
          variants={formVariants}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Reenviar Activación
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              ¿No recibiste el correo? Ingresa tu email para reenviarlo.
            </p>
          </div>

          {/* Mensajes de feedback */}
          <AnimatePresence>
            {message && <Alert key="success-alert" type="success" message={message} />}
            {error && <Alert key="error-alert" type="error" message={error} />}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <Input
              label="Correo Electrónico"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
            />

            <div>
              <Button
                type="submit"
                loading={loading}
                fullWidth
              >
                {loading ? 'Reenviando...' : 'Reenviar Correo'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">
              <Link to="/login" className="font-medium text-accent hover:text-primary transition duration-150">
                Volver a Iniciar Sesión
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResendActivation;