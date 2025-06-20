import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

// Card funcional reutilizable (puede importarse desde el dashboard si ya existe)
const DashboardCard = ({ to, icon, title, description }) => (
  <Link
    to={to}
    className="bg-[var(--color-background-light)] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center border-b-4 border-[var(--color-primary-darker)] hover:border-[var(--color-primary)] group animate-fade-in-up"
  >
    <div className="mb-5">{icon}</div>
    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300 drop-shadow-sm">
      {title}
    </h2>
    <p className="text-[var(--color-text-dark)] text-center leading-relaxed text-base">
      {description}
    </p>
  </Link>
);

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
    <DashboardCard
      to={profilePath}
      icon={<CircleIconBg><UserCircleIcon className="w-8 h-8" /></CircleIconBg>}
      title={profileText}
      description="Actualiza tu información personal y de contacto."
    />
    <DashboardCard
      to={changePasswordPath}
      icon={<CircleIconBg><Cog6ToothIcon className="w-8 h-8" /></CircleIconBg>}
      title={changePasswordText}
      description="Mantén tu cuenta segura actualizando tu contraseña."
    />
  </>
);

export default ProfileCards; 