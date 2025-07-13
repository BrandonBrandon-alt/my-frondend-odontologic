// src/pages/dashboards/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importa motion para animaciones
import ProfileCards from '../../components/features/ProfileCards';
import Card from '../../components/ui/Card';

// Importa el servicio de usuario
import { userService } from '../../services';

// Importa los iconos de Heroicons (24x24 outline es un buen tamaño y estilo)
import {
  CalendarDaysIcon, // Para citas
  DocumentTextIcon,  // Para historial médico
  CreditCardIcon,   // Para facturas/pagos
  UserCircleIcon,   // Para perfil
  Cog6ToothIcon,    // Para cambiar contraseña o ajustes
  ChartBarIcon,     // Para estadísticas
  HeartIcon,        // Para estadísticas
  CheckBadgeIcon,   // Para estadísticas
  UserGroupIcon,    // Para estadísticas
  TrophyIcon,        // Para logros
  StarIcon          // Para logros
} from '@heroicons/react/24/outline';

function PatientDashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa navigate para posibles redirecciones

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const profile = await userService.getProfile();
        setUserProfile(profile);
      } catch (err) {
        console.error("Error al cargar el perfil del paciente:", err);
        // Si el error es una respuesta 401 (No autorizado), redirige al login
        if (err.response && err.response.status === 401) {
            setError("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
            setTimeout(() => navigate('/login'), 2000); // Redirige después de 2 segundos
        } else {
            setError("No se pudo cargar la información de tu perfil. Intenta de nuevo más tarde.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]); // Añadir navigate a las dependencias para evitar advertencias de eslint

  // --- Variantes de Framer Motion para animaciones ---
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1, // Anima los hijos con un ligero retraso entre ellos
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring", // Animación tipo muelle para un efecto "pop"
        stiffness: 200, // Rigidez del muelle
        damping: 20    // Amortiguación del muelle
      }
    }
  };

  const textFadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
  };

  // --- Componente de Carga Profesional ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          {/* Spinner de carga SVG */}
          <svg className="animate-spin h-12 w-12 text-[var(--color-primary)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.034 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl md:text-2xl font-semibold text-[var(--color-text-dark)]">Cargando tu portal de salud...</p>
        </div>
      </div>
    );
  }

  // --- Componente de Error Elegante ---
  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-4">
        <svg className="h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-2xl font-bold text-red-700 mb-2">¡Ups! Algo salió mal</p>
        <p className="text-lg text-red-600 text-center max-w-md leading-relaxed">{error}</p>
        <button
          onClick={() => window.location.reload()} // O una función para re-intentar la carga
          className="mt-6 px-8 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-full shadow-lg hover:bg-[var(--color-accent)] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]" // Usamos accent para el botón de error
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen text-[var(--color-text-light)] p-6 md:p-10 lg:p-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto py-8">
        {/* --- Sección de Estadísticas Ficticias --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-start"
          variants={containerVariants}
        >
          <StatCard
            icon={<ChartBarIcon className="w-10 h-10 text-[var(--color-accent)]" />}
            label="Citas Realizadas"
            value="27"
            description="¡Vas por un récord de salud!"
            color="from-[var(--color-accent)] to-[var(--color-primary)]"
          />
          <StatCard
            icon={<HeartIcon className="w-10 h-10 text-[var(--color-secondary)]" />}
            label="Días sin Caries"
            value="365"
            description="¡Un año completo cuidando tu sonrisa!"
            color="from-[var(--color-secondary)] to-[var(--color-primary)]"
          />
          <StatCard
            icon={<CheckBadgeIcon className="w-10 h-10 text-[var(--color-primary)]" />}
            label="Tratamientos Completados"
            value="5"
            description="¡Felicidades por tu constancia!"
            color="from-[var(--color-primary)] to-[var(--color-accent)]"
          />
          <StatCard
            icon={<UserGroupIcon className="w-10 h-10 text-[var(--color-primary)]" />}
            label="Recomendaciones"
            value="3"
            description="¡Tus amigos también confían en Odontologic!"
            color="from-[var(--color-primary)] to-[var(--color-secondary)]"
          />
        </motion.div>

        {/* --- Gráfico Animado Ficticio --- */}
        <motion.div
          className="bg-[var(--color-background-light)] rounded-2xl shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 border-l-8 border-[var(--color-accent)] animate-fade-in-up"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
        >
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2 flex items-center gap-2">
              <ChartBarIcon className="w-7 h-7 text-[var(--color-accent)]" /> Progreso de Salud Bucal
            </h3>
            <p className="text-[var(--color-text-dark)] mb-4 max-w-md">¡Tu salud bucal ha mejorado un <span className="text-[var(--color-accent)] font-bold">+18%</span> este año! Sigue así para alcanzar nuevos logros y mantener tu sonrisa radiante.</p>
            <div className="flex gap-3 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold"><StarIcon className="w-4 h-4 mr-1" /> Nivel Oro</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-semibold"><TrophyIcon className="w-4 h-4 mr-1" /> 3 Logros</span>
            </div>
          </div>
          {/* Gráfico animado ficticio */}
          <div className="flex-1 flex items-center justify-center w-full max-w-xs">
            <AnimatedBarChart />
          </div>
        </motion.div>

        {/* --- Sección de Bienvenida Personalizada y Moderna --- */}
        <motion.div
          className="bg-[var(--color-background-light)] rounded-3xl shadow-2xl p-6 md:p-10 mb-12 border-t-8 border-[var(--color-primary)] overflow-hidden animate-fade-in-up"
          variants={itemVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-dark)] mb-3 leading-tight tracking-tight drop-shadow-lg"
            variants={textFadeIn}
          >
            ¡Bienvenido de Nuevo, <span className="text-[var(--color-primary)] drop-shadow-md">{userProfile?.name || 'Paciente'}</span>!
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[var(--color-text-dark)] leading-relaxed max-w-2xl"
            variants={textFadeIn}
            transition={{ delay: 0.2 }}
          >
            Tu portal de salud dental te espera. Aquí puedes gestionar todos los aspectos de tu atención odontológica de manera <span className="font-semibold text-[var(--color-accent)]">fácil y segura</span>.
          </motion.p>
          <motion.div className="mt-6 flex flex-wrap gap-4" variants={textFadeIn} transition={{ delay: 0.3 }}>
            <Link to="/patient/my-appointments" className="text-[var(--color-secondary)] hover:text-[var(--color-primary-darker)] font-semibold flex items-center group transition-all duration-200">
              <CalendarDaysIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" /> Ver mis citas
            </Link>
            <Link to="/patient-profile" className="text-[var(--color-secondary)] hover:text-[var(--color-primary-darker)] font-semibold flex items-center group transition-all duration-200">
              <UserCircleIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" /> Editar perfil
            </Link>
          </motion.div>
        </motion.div>

        {/* --- Sección de Logros --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-start"
          variants={containerVariants}
        >
          <AchievementCard
            icon={<TrophyIcon className="w-8 h-8 text-[var(--color-accent)]" />}
            title="¡Sin caries en 1 año!"
            description="Has mantenido una higiene bucal ejemplar durante 12 meses."
            color="from-[var(--color-accent)] to-[var(--color-primary)]"
          />
          <AchievementCard
            icon={<StarIcon className="w-8 h-8 text-[var(--color-secondary)]" />}
            title="Paciente Destacado"
            description="Tu asistencia y compromiso te han hecho merecedor de este reconocimiento."
            color="from-[var(--color-secondary)] to-[var(--color-primary)]"
          />
          <AchievementCard
            icon={<CheckBadgeIcon className="w-8 h-8 text-[var(--color-primary)]" />}
            title="Tratamientos al Día"
            description="No tienes tratamientos pendientes. ¡Sigue así!"
            color="from-[var(--color-primary)] to-[var(--color-accent)]"
          />
        </motion.div>

        {/* --- Grid de Tarjetas de Funcionalidades --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start"
          variants={containerVariants}
        >
          {/* Tarjeta: Agendar Cita */}
          <motion.div variants={itemVariants}>
            <DashboardCard
              to="/patient-appointment"
              icon={<CircleIconBg><CalendarDaysIcon className="w-8 h-8" /></CircleIconBg>}
              title="Agendar Cita"
              description="Reserva tu próxima cita de manera rápida y fácil."
            />
          </motion.div>
          {/* Tarjeta: Mis Citas */}
          <motion.div variants={itemVariants}>
            <DashboardCard
              to="/patient/my-appointments"
              icon={<CircleIconBg><CalendarDaysIcon className="w-8 h-8" /></CircleIconBg>}
              title="Mis Citas"
              description="Agenda, consulta y gestiona tus próximas citas."
            />
          </motion.div>
          {/* Tarjeta: Mi Historial Clínico */}
          <motion.div variants={itemVariants}>
            <DashboardCard
              to="/patient/medical-history"
              icon={<CircleIconBg><DocumentTextIcon className="w-8 h-8" /></CircleIconBg>}
              title="Historial Clínico"
              description="Accede a tu historial de tratamientos y diagnósticos."
            />
          </motion.div>
          {/* Tarjeta: Mis Facturas */}
          <motion.div variants={itemVariants}>
            <DashboardCard
              to="/patient/billing"
              icon={<CircleIconBg><CreditCardIcon className="w-8 h-8" /></CircleIconBg>}
              title="Mis Facturas"
              description="Revisa tus estados de cuenta y pagos pendientes."
            />
          </motion.div>
          {/* Tarjeta: Mi Perfil */}
          <motion.div variants={itemVariants}>
            <ProfileCards profilePath="/patient-profile" changePasswordPath="/change-password" />
          </motion.div>
        </motion.div>

        {/* --- Perfil Rápido --- */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 animate-fade-in-up"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
        >
          <div className="flex-1 flex flex-col items-center md:items-start text-white">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <UserCircleIcon className="w-8 h-8 text-white/80" /> Perfil Rápido
            </h3>
            <p className="mb-1"><span className="font-semibold">Nombre:</span> {userProfile?.name || 'Paciente'}</p>
            <p className="mb-1"><span className="font-semibold">Correo:</span> {userProfile?.email || 'correo@ejemplo.com'}</p>
            <p className="mb-1"><span className="font-semibold">Teléfono:</span> {userProfile?.phone || '3001234567'}</p>
            <p className="mb-1"><span className="font-semibold">Dirección:</span> {userProfile?.address || 'Calle 123 #45-67'}</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-lg text-white/90 font-semibold mb-2">"La salud es la mayor posesión. ¡Sigue cuidando tu sonrisa!"</p>
            <StarIcon className="w-16 h-16 text-yellow-300 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PatientDashboard;

// ----------------------------------------------------
// Componente de Tarjeta de Dashboard (ahora usando Card global)
// ----------------------------------------------------
const DashboardCard = ({ to, icon, title, description }) => {
  return (
    <Card
      as="div"
      className="h-full flex flex-col items-center text-center cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-[var(--color-primary-darker)] hover:border-[var(--color-primary)] group animate-fade-in-up"
      onClick={() => to && window.location.assign(to)}
      icon={icon}
      title={title}
      subtitle={description}
    >
      {/* El contenido principal ya está en title/subtitle/icon */}
    </Card>
  );
};

// Componente para iconos con fondo circular y color de acento
const CircleIconBg = ({ children }) => (
  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">
    {children}
  </span>
);

// Card de estadística espectacular
const StatCard = ({ icon, label, value, description, color }) => (
  <motion.div
    className={`bg-gradient-to-br ${color} rounded-2xl shadow-xl p-7 flex flex-col items-center text-center animate-fade-in-up hover:scale-105 transition-transform duration-300`}
  >
    <div className="mb-3 flex items-center justify-center w-16 h-16 rounded-full bg-white/20 shadow-lg">
      {icon}
    </div>
    <div className="text-4xl font-extrabold text-white drop-shadow-lg mb-1 animate-pulse">{value}</div>
    <div className="text-lg font-semibold text-white mb-1">{label}</div>
    <div className="text-white/80 text-sm">{description}</div>
  </motion.div>
);

// Gráfico animado ficticio
const AnimatedBarChart = () => (
  <svg viewBox="0 0 120 60" className="w-full h-24">
    <rect x="10" y="30" width="15" height="20" rx="3" fill="var(--color-accent)" className="animate-pulse" />
    <rect x="35" y="20" width="15" height="30" rx="3" fill="var(--color-secondary)" className="animate-bounce" />
    <rect x="60" y="10" width="15" height="40" rx="3" fill="var(--color-primary-darker)" className="animate-pulse" />
    <rect x="85" y="25" width="15" height="25" rx="3" fill="var(--color-primary)" className="animate-bounce" />
  </svg>
);

// Card de logro
const AchievementCard = ({ icon, title, description, color }) => (
  <motion.div
    className={`bg-gradient-to-br ${color} rounded-2xl shadow-xl p-7 flex flex-col items-center text-center animate-fade-in-up hover:scale-105 transition-transform duration-300`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
  >
    <div className="mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-white/20 shadow-lg">{icon}</div>
    <div className="text-xl font-bold text-white drop-shadow-lg mb-1">{title}</div>
    <div className="text-white/80 text-sm">{description}</div>
  </motion.div>
);
