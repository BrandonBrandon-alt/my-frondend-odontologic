import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import Card from '../ui/Card';
import { Input } from '../ui';
import { Button } from '../ui';
import { Alert } from '../ui';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const FormularioReenviarActivacion = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await authService.resendActivationCode(email);
      setMessage('Código de activación reenviado. Revisa tu correo electrónico.');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Error al reenviar el código. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-background-light)] to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card
          variant="elevated"
          className="p-8"
          icon={<EnvelopeIcon className="w-12 h-12 text-[var(--color-accent)]" />}
          title="Reenviar Código de Activación"
          subtitle="Ingresa tu correo electrónico y te enviaremos un nuevo código de activación."
        >
          {message && <Alert type="success" message={message} />}
          {error && <Alert type="error" message={error} />}

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <Input
              type="email"
              name="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
            />
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Enviando...' : 'Reenviar Código'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            ¿Ya tienes tu código?{' '}
            <a href="/activate-account" className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-primary)] underline">
              Activar cuenta
            </a>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default FormularioReenviarActivacion;