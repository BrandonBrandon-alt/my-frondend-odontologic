// src/pages/ChangePassword.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MessageBox from '../../components/MessageBox';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/outline';

function ChangePassword() {
  // Nuevo estado para la contraseña actual
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Nuevos estados para la visibilidad de la contraseña actual
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Manejo del estado para cada campo
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else { // 'confirmPassword'
      setConfirmPassword(value);
    }
    // Limpia los mensajes/errores cuando el usuario empieza a escribir de nuevo
    if (message) setMessage('');
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Validaciones básicas en el frontend
    if (newPassword !== confirmPassword) {
      setError('Las nuevas contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 20) {
      setError('La nueva contraseña debe tener entre 6 y 20 caracteres.');
      setLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
        setError('La nueva contraseña no puede ser igual a la actual.');
        setLoading(false);
        return;
    }

    try {
      // ** Cambio clave aquí: Envía currentPassword y newPassword al servicio **
      const response = await userService.changePassword({ 
        currentPassword: currentPassword,
        newPassword: newPassword 
      });

      setMessage(response.message || 'Contraseña actualizada exitosamente.');
      // Limpiar los campos después de un cambio exitoso
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Limpia el mensaje de éxito después de unos segundos
      setTimeout(() => setMessage(''), 3000);

      // Redirige al dashboard apropiado después de un tiempo
      setTimeout(() => {
        let dashboardPath = '/patient-dashboard';
        if (user && user.role) {
          switch (user.role) {
            case 'admin':
              dashboardPath = '/admin-dashboard';
              break;
            case 'dentist':
              dashboardPath = '/dentist-dashboard';
              break;
            case 'user': // Aunque uses 'patient', si tu backend lo devuelve como 'user', tenlo en cuenta
            default:
              dashboardPath = '/patient-dashboard';
              break;
          }
        }
        navigate(dashboardPath);
      }, 2000);

    } catch (err) {
      console.error('Error al cambiar la contraseña:', err);
      // Manejo de errores más específico
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Por favor, revisa tu conexión a internet.');
      }
      else {
        setError('Ocurrió un error al cambiar la contraseña. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Variantes de Framer Motion (sin cambios)
  const pageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.3 } },
  };
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] bg-background-light flex items-center justify-center p-4 md:p-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-6 sm:p-10 lg:p-12">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-6"
          variants={textVariants}
        >
          Cambiar Contraseña
        </motion.h2>

        <AnimatePresence>
          {message && <MessageBox type="success" message={message} key="success-msg" />}
          {/* Solo muestra el error si no hay un mensaje de éxito para evitar solapamiento */}
          {error && !message && <MessageBox type="error" message={error} key="error-msg" />}
        </AnimatePresence>

        <motion.form onSubmit={handleSubmit} className="space-y-6" variants={formVariants}>
          {/* Nuevo Input para la contraseña actual */}
          <Input
            label="Contraseña Actual"
            id="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            placeholder="Tu contraseña actual"
            required
            icon={<KeyIcon className="h-5 w-5 text-gray-400" />}
            actionIcon={
              showCurrentPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowCurrentPassword(false)} />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowCurrentPassword(true)} />
              )
            }
          />
          <Input
            label="Nueva Contraseña"
            id="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            required
            icon={<KeyIcon className="h-5 w-5 text-gray-400" />}
            actionIcon={
              showNewPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowNewPassword(false)} />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowNewPassword(true)} />
              )
            }
          />
          <Input
            label="Confirmar Nueva Contraseña"
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu nueva contraseña"
            required
            icon={<KeyIcon className="h-5 w-5 text-gray-400" />}
            actionIcon={
              showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowConfirmPassword(true)} />
              )
            }
          />

          <Button loading={loading} className="py-3 mt-6 w-full">
            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </Button>
        </motion.form>

        <div className="mt-8 text-center">
          <p className="text-text-dark text-sm">
            <button
              onClick={() => {
                let dashboardPath = '/patient-dashboard';
                if (user && user.role) {
                  switch (user.role) {
                    case 'admin': dashboardPath = '/admin-dashboard'; break;
                    case 'dentist': dashboardPath = '/dentist-dashboard'; break;
                    default: dashboardPath = '/patient-dashboard'; break;
                  }
                }
                navigate(dashboardPath);
              }}
              className="font-semibold text-primary hover:text-secondary underline"
            >
              Volver al Dashboard
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ChangePassword;