import UserProfile from './UserProfile';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// Modificación: agregar borde sutil al contenedor principal
export default function FormularioPatientProfile(props) {
  // Definir los campos con iconos
  const fields = [
    { name: 'name', label: 'Nombre', icon: <FaUser className="h-5 w-5 text-gray-400" /> },
    { name: 'email', label: 'Correo', icon: <FaEnvelope className="h-5 w-5 text-gray-400" /> },
    { name: 'phone', label: 'Teléfono', icon: <FaPhone className="h-5 w-5 text-gray-400" /> },
    { name: 'address', label: 'Dirección', icon: <FaMapMarkerAlt className="h-5 w-5 text-gray-400" /> },
  ];
  return <UserProfile {...props} fields={fields} className="border border-[var(--border-primary)]" />;
} 