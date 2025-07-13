// src/pages/dashboards/DentistDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../../services';
import Card from '../../components/ui/Card';
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
      className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-light)] p-6 md:p-10 lg:p-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto py-8">
        {/* Estadísticas ficticias */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-start" variants={containerVariants}>
          <StatCard icon={<ChartBarIcon className="w-10 h-10 text-[var(--color-accent)]" />} label="Pacientes Atendidos" value="112" description="¡Gran impacto en la salud!" color="from-[var(--color-accent)] to-[var(--color-primary)]" />
          <StatCard icon={<HeartIcon className="w-10 h-10 text-[var(--color-secondary)]" />} label="Días sin Ausencias" value="180" description="¡Compromiso ejemplar!" color="from-[var(--color-secondary)] to-[var(--color-primary)]" />
          <StatCard icon={<CheckBadgeIcon className="w-10 h-10 text-[var(--color-primary)]" />} label="Tratamientos Exitosos" value="89" description="¡Tus pacientes te recomiendan!" color="from-[var(--color-primary)] to-[var(--color-accent)]" />
          <StatCard icon={<UserGroupIcon className="w-10 h-10 text-[var(--color-primary)]" />} label="Nuevos Pacientes" value="14" description="¡La clínica sigue creciendo!" color="from-[var(--color-primary)] to-[var(--color-secondary)]" />
        </motion.div>

        {/* Gráfico animado ficticio */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}>
          <Card
            variant="elevated"
            className="p-8 flex flex-col md:flex-row items-center gap-8 border-l-8 border-[var(--color-accent)]"
            icon={<ChartBarIcon className="w-7 h-7 text-[var(--color-accent)]" />}
            title="Progreso Profesional"
            subtitle="¡Has mejorado tu eficiencia un +12% este semestre! Sigue capacitándote y creciendo como profesional."
          >
            <div className="flex gap-3 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold"><StarIcon className="w-4 h-4 mr-1" /> Nivel Platino</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)] text-white text-xs font-semibold"><TrophyIcon className="w-4 h-4 mr-1" /> 5 Logros</span>
            </div>
            <div className="flex-1 flex items-center justify-center w-full max-w-xs mt-4">
              <AnimatedBarChart />
            </div>
          </Card>
        </motion.div>

        {/* Logros */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-start" variants={containerVariants}>
          <AchievementCard icon={<TrophyIcon className="w-8 h-8 text-[var(--color-accent)]" />} title="100% Asistencia" description="No faltaste ni un solo día en 6 meses." color="from-[var(--color-accent)] to-[var(--color-primary)]" />
          <AchievementCard icon={<StarIcon className="w-8 h-8 text-[var(--color-secondary)]" />} title="Dentista Destacado" description="Tus pacientes te califican con 5 estrellas." color="from-[var(--color-secondary)] to-[var(--color-primary)]" />
          <AchievementCard icon={<CheckBadgeIcon className="w-8 h-8 text-[var(--color-primary)]" />} title="Cero Complicaciones" description="Todos tus tratamientos fueron exitosos." color="from-[var(--color-primary)] to-[var(--color-accent)]" />
        </motion.div>

        {/* Bienvenida y perfil rápido */}
        <motion.div variants={itemVariants}>
          <Card
            variant="elevated"
            className="p-6 md:p-10 mb-12 border-t-8 border-[var(--color-primary)]"
            title={`¡Bienvenido(a), ${currentUser?.name || 'Odontólogo/a'}!`}
            subtitle="Gestiona tu agenda, pacientes y mantente actualizado con las mejores prácticas odontológicas."
          />
        </motion.div>

        {/* Cards de funcionalidades */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start" variants={containerVariants}>
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

// Card funcional usando el componente Card global
const DashboardCard = ({ to, icon, title, description }) => (
  <Link to={to}>
    <Card
      variant="elevated"
      className="h-full flex flex-col items-center text-center cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-[var(--color-primary-darker)] hover:border-[var(--color-primary)] group animate-fade-in-up"
      icon={icon}
      title={title}
      subtitle={description}
    />
  </Link>
);

// Icono con fondo circular
const CircleIconBg = ({ children }) => (
  <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg mb-2 group-hover:scale-110 transition-transform duration-300">{children}</span>
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

export default DentistDashboard;