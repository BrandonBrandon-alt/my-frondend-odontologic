import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';

// Icono con fondo circular
const CircleIconBg = ({ children }) => (
  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">{children}</span>
);

/**
 * Componente reutilizable para mostrar las cards de perfil y cambio de contraseña en los dashboards
 * @param {string} profilePath - Ruta al perfil del usuario
 * @param {string} changePasswordPath - Ruta para cambiar contraseña
 * @param {string} [profileText] - Texto personalizado para la card de perfil
 * @param {string} [changePasswordText] - Texto personalizado para la card de contraseña
 */
const ProfileCards = ({
  profilePath = '/profile',
  changePasswordPath = '/change-password',
  profileText = 'Actualizar Perfil',
  changePasswordText = 'Cambiar Contraseña',
}) => (
  <>
    <Link to={profilePath}>
      <Card
        variant="elevated"
        className="h-full flex flex-col items-center text-center cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-[var(--color-primary-darker)] hover:border-[var(--color-primary)] group animate-fade-in-up"
        icon={<CircleIconBg><UserCircleIcon className="w-8 h-8" /></CircleIconBg>}
        title={profileText}
        subtitle="Actualiza tu información personal y de contacto."
      />
    </Link>
    <Link to={changePasswordPath}>
      <Card
        variant="elevated"
        className="h-full flex flex-col items-center text-center cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-[var(--color-primary-darker)] hover:border-[var(--color-primary)] group animate-fade-in-up"
        icon={<CircleIconBg><Cog6ToothIcon className="w-8 h-8" /></CircleIconBg>}
        title={changePasswordText}
        subtitle="Mantén tu cuenta segura actualizando tu contraseña."
      />
    </Link>
  </>
);

export default ProfileCards; 