import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

/**
 * Botón inteligente para agendar cita.
 * Redirige a la página correcta según el estado de autenticación y rol.
 * @param {string} children - Texto del botón.
 * @param {string} [className] - Clases CSS opcionales.
 * @param {object} [props] - Otros props para el botón o enlace.
 */
function AgendarCitaButton({ children, className = '', ...props }) {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    if (isLoggedIn && user) {
      if (user.role === 'user') {
        navigate('/patient-appointment');
      } else if (user.role === 'dentist') {
        navigate('/dentist-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } else {
      navigate('/guest-appointment');
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default AgendarCitaButton; 