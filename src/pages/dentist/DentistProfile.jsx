import React, { useState, useEffect } from 'react';
import { userService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import { UserCircleIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import FormularioDentistProfile from '../../components/features/FormularioDentistProfile';

function DentistProfile() {
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
    const allowedFields = ['name', 'email', 'phone', 'address'];
    const dataToSend = Object.fromEntries(
      Object.entries(userData).filter(([key]) => allowedFields.includes(key))
    );
    try {
      const updatedUser = await userService.updateProfile(dataToSend);
      updateUserContext(updatedUser);
      setMessage('Perfil actualizado con éxito.');
    } catch (err) {
      setError(err.message || 'Error al actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Nombre Completo', icon: <UserCircleIcon className="h-5 w-5 text-gray-400" /> },
    { name: 'email', label: 'Correo Electrónico', icon: <EnvelopeIcon className="h-5 w-5 text-gray-400" /> },
    { name: 'phone', label: 'Teléfono', icon: <PhoneIcon className="h-5 w-5 text-gray-400" /> },
    { name: 'address', label: 'Dirección', icon: <MapPinIcon className="h-5 w-5 text-gray-400" /> },
  ];

  return (
    <FormularioDentistProfile
      userData={userData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      message={message}
      fields={fields}
      dashboardPath="/dentist-dashboard"
      title="Perfil de Dentista"
    />
  );
}

export default DentistProfile; 