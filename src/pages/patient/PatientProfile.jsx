// src/pages/patient/PatientProfile.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importa AnimatePresence para mensajes
import { userService } from '../../services';
import { Button, Input, Alert, LoadingSpinner } from '../../components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCircleIcon, MapPinIcon, PhoneIcon, EnvelopeIcon, CalendarIcon, IdentificationIcon } from '@heroicons/react/24/outline'; // Nuevos iconos

function PatientProfile() {
  const { user, updateUserContext, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(true);
      userService.getProfile(user.id)
        .then(data => {
          setUserData(data);
          setError('');
        })
        .catch(err => {
          setError('No se pudo cargar la información del perfil.');
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(authLoading);
    }
  }, [user, authLoading]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const updatedUser = await userService.updateProfile(user.id, userData);
      updateUserContext(updatedUser);
      setMessage('Perfil actualizado con éxito.');
    } catch (err) {
      setError(err.message || 'Error al actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <UserCircleIcon className="w-24 h-24 mx-auto text-gray-300" />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">{userData?.name || 'Mi Perfil'}</h1>
          <p className="text-md text-gray-500">{userData?.email}</p>
        </div>

        <AnimatePresence>
          {error && <Alert type="error" message={error} />}
        </AnimatePresence>

        {userData && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre Completo"
                id="name"
                name="name"
                type="text"
                value={userData.name || ''}
                onChange={handleChange}
                startIcon={<UserCircleIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Cédula de Ciudadanía"
                id="cedula"
                name="cedula"
                type="text"
                value={userData.cedula || ''}
                onChange={handleChange}
                startIcon={<IdentificationIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Fecha de Nacimiento"
                id="birthDate"
                name="birthDate"
                type="date"
                value={userData.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                startIcon={<CalendarIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Teléfono"
                id="phone"
                name="phone"
                type="tel"
                value={userData.phone || ''}
                onChange={handleChange}
                startIcon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
              />
            </div>

            <div className="mt-6">
              <AnimatePresence>
                {message && <Alert type="success" message={message} key="success-msg" />}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Link to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'dentist' ? '/dentist-dashboard' : '/patient-dashboard'}>
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
}

export default PatientProfile;