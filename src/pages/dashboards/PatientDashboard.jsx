// src/pages/dashboards/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importa motion para animaciones

// Importa el servicio de usuario
import { userService } from '../../services';

// Importa los iconos de Heroicons (24x24 outline es un buen tamaño y estilo)
import {
  CalendarDaysIcon, // Para citas
  DocumentTextIcon,  // Para historial médico
  CreditCardIcon,   // Para facturas/pagos
  UserCircleIcon,   // Para perfil
  Cog6ToothIcon     // Para cambiar contraseña o ajustes
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
      className="min-h-screen bg-gradient-to-br from-[var(--color-background-light)] via-white to-[var(--color-secondary)] p-6 md:p-10 lg:p-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto py-8">
        {/* --- Sección de Bienvenida Personalizada y Moderna --- */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-12 border-t-8 border-[var(--color-primary)] overflow-hidden animate-fade-in-up"
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

        {/* --- Grid de Tarjetas de Funcionalidades --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
        >
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
            <DashboardCard
              to="/patient-profile"
              icon={<CircleIconBg><UserCircleIcon className="w-8 h-8" /></CircleIconBg>}
              title="Mi Perfil"
              description="Actualiza tu información personal y de contacto."
            />
          </motion.div>

          {/* Tarjeta: Cambiar Contraseña (Nueva) */}
          <motion.div variants={itemVariants}>
            <DashboardCard
              to="/change-password"
              icon={<CircleIconBg><Cog6ToothIcon className="w-8 h-8" /></CircleIconBg>}
              title="Cambiar Contraseña"
              description="Mantén tu cuenta segura actualizando tu contraseña."
            />
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}

export default PatientDashboard;


// ----------------------------------------------------
// Componente de Tarjeta de Dashboard (Idealmente en src/components/DashboardCard.jsx)
// ----------------------------------------------------
const DashboardCard = ({ to, icon, title, description }) => {
  return (
    <Link
      to={to}
      className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center border-b-4 border-[var(--color-primary-darker)] hover:border-[var(--color-primary)] group animate-fade-in-up"
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
};

// Componente para iconos con fondo circular y color de acento
const CircleIconBg = ({ children }) => (
  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">
    {children}
  </span>
);