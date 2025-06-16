// src/pages/ActivateAccount.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation
import axios from 'axios';

// Importa los componentes Input, Button, MessageBox
import Input from '../components/Input';
import Button from '../components/Button';
import MessageBox from '../components/MessageBox';

function ActivateAccount() {
  const location = useLocation(); // Hook para acceder al estado de la navegación
  const navigate = useNavigate();

  // Inicializa el email con el valor pasado del estado de la ruta, si existe
  const [formData, setFormData] = useState({
    email: location.state?.email || '', // Precarga el email si viene de /register
    code: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Efecto para limpiar mensajes al cambiar el formulario
  useEffect(() => {
    if (message || error) {
      setMessage('');
      setError('');
    }
  }, [formData.email, formData.code]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/activar', formData);

      setMessage(response.data.message || 'Cuenta activada correctamente. Ya puedes iniciar sesión.');

      // Redirigir al usuario a la página de login después de la activación exitosa
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      console.error('Error al activar cuenta:', err);
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

  // Variantes de Framer Motion
  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.2 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
      <motion.div
        className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg border-2 border-secondary
                   hover:shadow-2xl hover:shadow-accent/40 hover:border-accent
                   transition duration-500 ease-in-out transform hover:scale-100"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <motion.h2
          className="text-4xl font-extrabold text-primary text-center mb-4"
          variants={textVariants}
        >
          Activa tu cuenta
        </motion.h2>
        <motion.p
          className="text-lg text-text-dark text-center mb-10"
          variants={textVariants}
          transition={{ delay: 0.1 }}
        >
          Ingresa el código de activación enviado a tu correo.
        </motion.p>

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
            placeholder="tu_correo@example.com"
          />

          <Input
            label="Código de Activación"
            id="code"
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            placeholder="Ingresa tu código aquí"
          />

          <Button loading={loading} className="py-3">
            Activar Cuenta
          </Button>
        </form>

        <p className="mt-8 text-center text-text-dark text-base">
          ¿No recibiste el código?{' '}
          <Link
            to="/reenviar-activacion" // Esta ruta la necesitarás crear si aún no la tienes
            className="font-semibold text-primary hover:text-secondary underline"
          >
            Reenviar Código
          </Link>
        </p>
        <p className="mt-4 text-center text-text-dark text-base">
          ¿Ya activaste tu cuenta?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-secondary underline"
          >
            Inicia Sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default ActivateAccount;
