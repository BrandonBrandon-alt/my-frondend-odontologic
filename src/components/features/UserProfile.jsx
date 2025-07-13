import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Alert, LoadingSpinner } from '../../components';
import { Link } from 'react-router-dom';

/**
 * Componente base reutilizable para editar perfil de usuario (paciente, dentista, admin)
 * @param {Object} props
 * @param {Object} props.userData - Datos del usuario
 * @param {Function} props.onChange - Handler para cambios en los inputs
 * @param {Function} props.onSubmit - Handler para submit del formulario
 * @param {boolean} props.loading - Estado de carga
 * @param {string} props.error - Mensaje de error
 * @param {string} props.message - Mensaje de éxito
 * @param {Array} props.fields - Array de campos a mostrar [{name, label, type, icon}]
 * @param {string} props.dashboardPath - Ruta al dashboard para el botón de volver
 * @param {string} props.title - Título del perfil
 */
const UserProfile = ({
  userData,
  onChange,
  onSubmit,
  loading,
  error,
  message,
  fields = [],
  dashboardPath = '/',
  title = 'Mi Perfil',
}) => {
  // Variantes de Framer Motion
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading && !userData) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-4 sm:p-6 lg:p-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-2xl mx-auto bg-white dark:bg-[var(--color-background)] rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          {fields.find(f => f.icon) && fields[0].icon}
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mt-4">{userData?.name || title}</h1>
          <p className="text-md text-[var(--color-text-secondary)]">{userData?.email}</p>
        </div>

        <AnimatePresence>
          {error && <Alert type="error" message={error} />}
        </AnimatePresence>

        {userData && (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map(field => (
                <Input
                  key={field.name}
                  label={field.label}
                  id={field.name}
                  name={field.name}
                  type={field.type || 'text'}
                  value={userData[field.name] || ''}
                  onChange={onChange}
                  startIcon={field.icon}
                />
              ))}
            </div>

            <div className="mt-6">
              <AnimatePresence>
                {message && <Alert type="success" message={message} key="success-msg" />}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Link to={dashboardPath}>
                <Button variant="outline">
                  Volver al Dashboard
                </Button>
              </Link>
              <Button type="submit" loading={loading} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default UserProfile; 