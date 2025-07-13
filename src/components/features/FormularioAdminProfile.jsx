import UserProfile from './UserProfile';

// Modificación: agregar borde sutil al contenedor principal
export default function FormularioAdminProfile(props) {
  return <UserProfile {...props} className="border border-[var(--border-primary)]" />;
} 