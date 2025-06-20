// src/pages/dashboards/DentistDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../../services';
import {
  CalendarDaysIcon,
  DocumentTextIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  HeartIcon,
  CheckBadgeIcon,
  TrophyIcon,
  StarIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import ProfileCards from '../../components/features/ProfileCards';

function DentistDashboard() {
  const currentUser = authService.getCurrentUser();

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };
  const textFadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[var(--color-background-light)] via-white to-[var(--color-primary)] p-6 md:p-10 lg:p-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto py-8">
        {/* Estadísticas ficticias */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12" variants={containerVariants}>
          <StatCard icon={<ChartBarIcon className="w-10 h-10 text-accent" />} label="Pacientes Atendidos" value="112" description="¡Gran impacto en la salud!" color="from-accent to-primary" />
          <StatCard icon={<HeartIcon className="w-10 h-10 text-secondary" />} label="Días sin Ausencias" value="180" description="¡Compromiso ejemplar!" color="from-secondary to-primary" />
          <StatCard icon={<CheckBadgeIcon className="w-10 h-10 text-primary" />} label="Tratamientos Exitosos" value="89" description="¡Tus pacientes te recomiendan!" color="from-primary to-accent" />
          <StatCard icon={<UserGroupIcon className="w-10 h-10 text-primary" />} label="Nuevos Pacientes" value="14" description="¡La clínica sigue creciendo!" color="from-primary to-secondary" />
        </motion.div>

        {/* Gráfico animado ficticio */}
        <motion.div className="bg-white rounded-2xl shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 border-l-8 border-[var(--color-accent)] animate-fade-in-up" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2 flex items-center gap-2">
              <ChartBarIcon className="w-7 h-7 text-accent" /> Progreso Profesional
            </h3>
            <p className="text-gray-700 mb-4 max-w-md">¡Has mejorado tu eficiencia un <span className="text-accent font-bold">+12%</span> este semestre! Sigue capacitándote y creciendo como profesional.</p>
            <div className="flex gap-3 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold"><StarIcon className="w-4 h-4 mr-1" /> Nivel Platino</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-semibold"><TrophyIcon className="w-4 h-4 mr-1" /> 5 Logros</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center w-full max-w-xs">
            <AnimatedBarChart />
          </div>
        </motion.div>

        {/* Logros */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" variants={containerVariants}>
          <AchievementCard icon={<TrophyIcon className="w-8 h-8 text-accent" />} title="100% Asistencia" description="No faltaste ni un solo día en 6 meses." color="from-accent to-primary" />
          <AchievementCard icon={<StarIcon className="w-8 h-8 text-secondary" />} title="Dentista Destacado" description="Tus pacientes te califican con 5 estrellas." color="from-secondary to-primary" />
          <AchievementCard icon={<CheckBadgeIcon className="w-8 h-8 text-primary" />} title="Cero Complicaciones" description="Todos tus tratamientos fueron exitosos." color="from-primary to-accent" />
        </motion.div>

        {/* Bienvenida y perfil rápido */}
        <motion.div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-12 border-t-8 border-[var(--color-primary)] overflow-hidden animate-fade-in-up" variants={itemVariants}>
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-dark)] mb-3 leading-tight tracking-tight drop-shadow-lg" variants={textFadeIn}>
            ¡Bienvenido(a), <span className="text-[var(--color-primary)] drop-shadow-md">{currentUser?.name || 'Odontólogo/a'}</span>!
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-[var(--color-text-dark)] leading-relaxed max-w-2xl" variants={textFadeIn} transition={{ delay: 0.2 }}>
            Gestiona tu agenda, pacientes y mantente actualizado con las mejores prácticas odontológicas.
          </motion.p>
        </motion.div>

        {/* Cards de funcionalidades */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <DashboardCard to="/dentist/my-appointments" icon={<CircleIconBg><CalendarDaysIcon className="w-8 h-8" /></CircleIconBg>} title="Mi Agenda de Citas" description="Gestiona tus próximas citas y disponibilidad." />
          </motion.div>
          <motion.div variants={itemVariants}>
            <DashboardCard to="/dentist/patients" icon={<CircleIconBg><DocumentTextIcon className="w-8 h-8" /></CircleIconBg>} title="Historial de Pacientes" description="Consulta el historial clínico y de tratamientos de tus pacientes." />
          </motion.div>
          <motion.div variants={itemVariants}>
            <DashboardCard to="/dentist/availability" icon={<CircleIconBg><Cog6ToothIcon className="w-8 h-8" /></CircleIconBg>} title="Mi Disponibilidad" description="Define tus horarios de atención y días libres." />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ProfileCards profilePath="/dentist-profile" changePasswordPath="/change-password" />
          </motion.div>
        </motion.div>

        {/* Perfil rápido y mensaje motivacional */}
        <motion.div className="mt-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 animate-fade-in-up" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}>
          <div className="flex-1 flex flex-col items-center md:items-start text-white">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <UserCircleIcon className="w-8 h-8 text-white/80" /> Perfil Rápido
            </h3>
            <p className="mb-1"><span className="font-semibold">Nombre:</span> {currentUser?.name || 'Odontólogo/a'}</p>
            <p className="mb-1"><span className="font-semibold">Rol:</span> Odontólogo/a</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-lg text-white/90 font-semibold mb-2">"La excelencia es un hábito, no un acto. ¡Sigue inspirando sonrisas!"</p>
            <StarIcon className="w-16 h-16 text-yellow-300 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Card de estadística espectacular
const StatCard = ({ icon, label, value, description, color }) => (
  <motion.div className={`bg-gradient-to-br ${color} rounded-2xl shadow-xl p-7 flex flex-col items-center text-center animate-fade-in-up hover:scale-105 transition-transform duration-300`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}>
    <div className="mb-3 flex items-center justify-center w-16 h-16 rounded-full bg-white/20 shadow-lg">{icon}</div>
    <div className="text-4xl font-extrabold text-white drop-shadow-lg mb-1 animate-pulse">{value}</div>
    <div className="text-lg font-semibold text-white mb-1">{label}</div>
    <div className="text-white/80 text-sm">{description}</div>
  </motion.div>
);

// Card de logro
const AchievementCard = ({ icon, title, description, color }) => (
  <motion.div className={`bg-gradient-to-br ${color} rounded-2xl shadow-xl p-7 flex flex-col items-center text-center animate-fade-in-up hover:scale-105 transition-transform duration-300`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}>
    <div className="mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-white/20 shadow-lg">{icon}</div>
    <div className="text-xl font-bold text-white drop-shadow-lg mb-1">{title}</div>
    <div className="text-white/80 text-sm">{description}</div>
  </motion.div>
);

// Card funcional
const DashboardCard = ({ to, icon, title, description }) => (
  <Link to={to} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center border-b-4 border-[var(--color-primary-darker)] hover:border-[var(--color-primary)] group animate-fade-in-up">
    <div className="mb-5">{icon}</div>
    <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300 drop-shadow-sm">{title}</h2>
    <p className="text-[var(--color-text-dark)] text-center leading-relaxed text-base">{description}</p>
  </Link>
);

// Icono con fondo circular
const CircleIconBg = ({ children }) => (
  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">{children}</span>
);

// Gráfico animado ficticio
const AnimatedBarChart = () => (
  <svg viewBox="0 0 120 60" className="w-full h-24">
    <rect x="10" y="30" width="15" height="20" rx="3" fill="#D72F8B" className="animate-pulse" />
    <rect x="35" y="20" width="15" height="30" rx="3" fill="#4AA8E2" className="animate-bounce" />
    <rect x="60" y="10" width="15" height="40" rx="3" fill="#256E8F" className="animate-pulse" />
    <rect x="85" y="25" width="15" height="25" rx="3" fill="#20c997" className="animate-bounce" />
  </svg>
);

export default DentistDashboard;