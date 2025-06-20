// src/pages/patient/PatientProfile.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importa AnimatePresence para mensajes
import { userService } from '../../services';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MessageBox from '../../components/MessageBox';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCircleIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Nuevos iconos

function PatientProfile() {
  const { updateUserContext } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    // Agrega cualquier otro campo de perfil inicial aquí para evitar 'undefined'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await userService.getProfile();
        const data = response.user || response;

        setProfileData({
          name: data.name || '',
          email: data.email || '',
          address: data.address || '',
          phone: data.phone || '',
          // Asegúrate de que todos los campos esperados del perfil estén aquí
        });
      } catch (err) {
        console.error('Error al cargar el perfil del paciente:', err);
        setError('No se pudo cargar tu perfil. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpia mensajes de éxito/error al empezar a editar
    if (message) setMessage('');
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const dataToUpdate = {
        name: profileData.name,
        address: profileData.address,
        phone: profileData.phone,
        // Incluye otros campos editables que tu backend acepta
      };
      const response = await userService.updateProfile(dataToUpdate);
      const updatedProfile = response.user || response;

      setProfileData({
        name: updatedProfile.name || '',
        email: updatedProfile.email || '',
        address: updatedProfile.address || '',
        phone: updatedProfile.phone || '',
        // Actualiza todos los campos aquí también
      });
      setMessage('¡Perfil actualizado exitosamente!');

      // Actualiza el contexto de autenticación
      updateUserContext({
        id: updatedProfile.id,
        name: updatedProfile.name,
        email: updatedProfile.email,
        address: updatedProfile.address,
        phone: updatedProfile.phone,
      });

      // El mensaje de éxito se borrará después de 3 segundos
      setTimeout(() => setMessage(''), 3000);

    } catch (err) {
      console.error('Error al actualizar el perfil:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Ocurrió un error al actualizar tu perfil. Inténtalo de nuevo.');
      }
    } finally {
      setSaving(false);
    }
  };

  // Variantes de Framer Motion
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

  // Manejo de estados de carga y error inicial
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background-light flex items-center justify-center p-4">
        <p className="text-xl text-primary animate-pulse">Cargando tu perfil...</p>
      </div>
    );
  }

  // Si hay un error al cargar el perfil y no se pudo mostrar el formulario
  if (error && !profileData.name) { // Si no hay datos de perfil para mostrar, solo mostrar el error
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background-light flex items-center justify-center p-4">
        <MessageBox type="error" message={error} />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] bg-background-light flex items-center justify-center p-4 md:p-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 sm:p-10 lg:p-12"> {/* Aumenta el max-w */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-6"
          variants={textVariants}
        >
          Mi Perfil
        </motion.h2>

        <AnimatePresence>
          {message && <MessageBox type="success" message={message} key="success-msg" />}
          {error && !message && <MessageBox type="error" message={error} key="error-msg" />} {/* Mostrar error si existe y no hay mensaje de éxito */}
        </AnimatePresence>

        <motion.form onSubmit={handleSubmit} className="space-y-6" variants={formVariants}>
          {/* Sección de Información Personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-text-dark mb-4 border-b pb-2">Información Personal</h3>
              <Input
                label="Nombre Completo"
                id="name"
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                required
                icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />} // Añade icono
              />
              <Input
                label="Correo Electrónico"
                id="email"
                type="email"
                name="email"
                value={profileData.email}
                readOnly
                className="bg-gray-100 cursor-not-allowed mt-4" // Añade margen superior
                icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />} // Añade icono
              />
            </div>

            {/* Sección de Contacto */}
            <div>
              <h3 className="text-xl font-bold text-text-dark mb-4 border-b pb-2">Datos de Contacto</h3>
              <Input
                label="Dirección"
                id="address"
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                placeholder="Tu dirección completa"
                icon={<MapPinIcon className="h-5 w-5 text-gray-400" />} // Añade icono
              />
              <Input
                label="Teléfono"
                id="phone"
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="Ej: +57 3XX XXX XXXX"
                className="mt-4" // Añade margen superior
                icon={<PhoneIcon className="h-5 w-5 text-gray-400" />} // Añade icono
              />
            </div>
          </div>
          {/* Fin de secciones */}

          <Button loading={saving} className="py-3 mt-8 w-full"> {/* Aumenta el margen superior */}
            {saving ? 'Guardando...' : 'Actualizar Perfil'}
          </Button>
        </motion.form>

        <div className="mt-8 text-center">
            <p className="text-text-dark text-sm mb-2">
                ¿Necesitas cambiar tu contraseña?{' '}
                <Link
                    to="/change-password"
                    className="font-semibold text-primary hover:text-secondary underline"
                >
                    Cambiar Contraseña
                </Link>
            </p>
            <p className="text-text-dark text-sm">
                <Link
                    to="/patient-dashboard"
                    className="font-semibold text-primary hover:text-secondary underline"
                >
                    Volver al Dashboard
                </Link>
            </p>
        </div>
      </div>
    </motion.div>
  );
}

export default PatientProfile;