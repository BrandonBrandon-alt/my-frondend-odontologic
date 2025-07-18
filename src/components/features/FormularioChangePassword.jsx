import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Button, Alert } from '../../components';
import { FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function FormularioChangePassword({
  currentPassword,
  newPassword,
  confirmPassword,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  setShowCurrentPassword,
  setShowNewPassword,
  setShowConfirmPassword,
  loading,
  message,
  error,
  handleChange,
  handleSubmit,
  user,
  navigate
}) {
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
      <div className="bg-white dark:bg-[var(--color-background)] border border-[var(--border-primary)] rounded-xl shadow-2xl w-full max-w-xl p-6 sm:p-10 lg:p-12">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-main)] text-center mb-6"
          variants={textVariants}
        >
          Cambiar Contraseña
        </motion.h2>

        <div className="mt-8 text-center">
          <p className="text-[var(--color-text-secondary)] text-sm">
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

        <AnimatePresence>
          {message && <Alert type="success" message={message} key="success-msg" />}
          {error && !message && <Alert type="error" message={error} key="error-msg" />}
        </AnimatePresence>

        <motion.form onSubmit={handleSubmit} className="space-y-6" variants={formVariants}>
          <Input
            label="Contraseña Actual"
            id="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            placeholder="Tu contraseña actual"
            required
            icon={<FaKey className="h-5 w-5 text-gray-400" />}
            actionIcon={
              showCurrentPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowCurrentPassword(false)} />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowCurrentPassword(true)} />
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
            icon={<FaKey className="h-5 w-5 text-gray-400" />}
            actionIcon={
              showNewPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowNewPassword(false)} />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowNewPassword(true)} />
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
            icon={<FaKey className="h-5 w-5 text-gray-400" />}
            actionIcon={
              showConfirmPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" onClick={() => setShowConfirmPassword(true)} />
              )
            }
          />

          <Button type="submit" loading={loading} className="py-3 mt-6 w-full">
            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </Button>
        </motion.form>
      </div>
    </motion.div>
  );
} 