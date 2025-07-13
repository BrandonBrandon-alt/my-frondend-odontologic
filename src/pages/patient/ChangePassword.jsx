// src/pages/ChangePassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import FormularioChangePassword from '../../components/features/FormularioChangePassword';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else setConfirmPassword(value);
    if (message) setMessage('');
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
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
      const response = await userService.changePassword({ currentPassword, newPassword });
      setMessage(response.message || 'Contraseña actualizada exitosamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage(''), 3000);
      setTimeout(() => {
        let dashboardPath = '/patient-dashboard';
        if (user && user.role) {
          switch (user.role) {
            case 'admin': dashboardPath = '/admin-dashboard'; break;
            case 'dentist': dashboardPath = '/dentist-dashboard'; break;
            default: dashboardPath = '/patient-dashboard'; break;
          }
        }
        navigate(dashboardPath);
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Por favor, revisa tu conexión a internet.');
      } else {
        setError('Ocurrió un error al cambiar la contraseña. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormularioChangePassword
      currentPassword={currentPassword}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      showCurrentPassword={showCurrentPassword}
      showNewPassword={showNewPassword}
      showConfirmPassword={showConfirmPassword}
      setShowCurrentPassword={setShowCurrentPassword}
      setShowNewPassword={setShowNewPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      loading={loading}
      message={message}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      user={user}
      navigate={navigate}
    />
  );
}

export default ChangePassword;