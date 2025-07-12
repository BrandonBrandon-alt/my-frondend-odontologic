import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  TrophyIcon,
  StarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Animaciones
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.6,
      ease: "easeOut"
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: "0px 15px 30px rgba(0,0,0,0.1)",
    transition: { duration: 0.3 }
  },
};

// Datos de la clínica
const clinicData = {
  name: "Clínica Dental Sonrisa Perfecta",
  founded: "2010",
  experience: "14 años",
  patients: "15,000+",
  team: [
    {
      name: "Dr. Carlos Mendoza",
      specialty: "Odontólogo General",
      experience: "20 años",
      education: "Universidad Nacional de Colombia",
      image: "👨‍⚕️"
    },
    {
      name: "Dra. Ana García",
      specialty: "Ortodoncista",
      experience: "15 años",
      education: "Universidad de los Andes",
      image: "👩‍⚕️"
    },
    {
      name: "Dr. Luis Rodríguez",
      specialty: "Endodoncista",
      experience: "12 años",
      education: "Universidad Javeriana",
      image: "👨‍⚕️"
    },
    {
      name: "Dra. María López",
      specialty: "Periodoncista",
      experience: "18 años",
      education: "Universidad del Rosario",
      image: "👩‍⚕️"
    }
  ],
  values: [
    {
      title: "Excelencia Médica",
      description: "Mantenemos los más altos estándares de calidad en todos nuestros tratamientos",
      icon: "🏆"
    },
    {
      title: "Tecnología Avanzada",
      description: "Utilizamos equipos de última generación para diagnósticos precisos",
      icon: "🔬"
    },
    {
      title: "Atención Personalizada",
      description: "Cada paciente recibe un tratamiento único y personalizado",
      icon: "💝"
    },
    {
      title: "Compromiso Social",
      description: "Participamos en programas de salud dental para comunidades vulnerables",
      icon: "🤝"
    }
  ],
  achievements: [
    "Más de 15,000 pacientes atendidos",
    "Certificación ISO 9001:2015",
    "Premio a la Excelencia en Salud Dental 2023",
    "Miembro de la Asociación Colombiana de Odontología",
    "Programa de Responsabilidad Social activo",
    "Tecnología de vanguardia en todos los tratamientos"
  ],
  services: [
    "Odontología General y Preventiva",
    "Ortodoncia Tradicional y Estética",
    "Endodoncia y Cirugía Oral",
    "Periodoncia y Estética Dental",
    "Implantes Dentales",
    "Blanqueamiento Profesional"
  ]
};

function About() {
  return (
    <div className="min-h-screen bg-[var(--color-background-light)]">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-accent)] text-white py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            variants={itemVariants}
          >
            Acerca de Nosotros
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl opacity-90 mb-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            Más de una década cuidando sonrisas y transformando vidas con excelencia médica y tecnología de vanguardia
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-8 text-center"
            variants={itemVariants}
          >
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-2xl font-bold">{clinicData.experience}</div>
              <div className="text-sm opacity-80">Años de Experiencia</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold">{clinicData.patients}</div>
              <div className="text-sm opacity-80">Pacientes Atendidos</div>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">🦷</div>
              <div className="text-2xl font-bold">6</div>
              <div className="text-sm opacity-80">Especialidades</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Historia y Misión */}
      <motion.section
        className="py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-[var(--color-text-secondary)]">
                <p>
                  Fundada en {clinicData.founded}, {clinicData.name} nació con la visión de 
                  transformar la experiencia dental en Colombia, combinando la excelencia médica 
                  con la tecnología más avanzada.
                </p>
                <p>
                  Desde nuestros inicios, nos hemos comprometido a brindar atención personalizada 
                  y tratamientos de la más alta calidad, siempre poniendo al paciente en el centro 
                  de todo lo que hacemos.
                </p>
                <p>
                  A lo largo de {clinicData.experience}, hemos atendido a más de {clinicData.patients} 
                  pacientes, construyendo relaciones de confianza que duran toda la vida.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center">
                  <HeartIcon className="w-8 h-8 text-[var(--color-primary)] mr-3" />
                  Nuestra Misión
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6">
                  Proporcionar atención dental integral de la más alta calidad, utilizando 
                  tecnología de vanguardia y un equipo de profesionales altamente calificados, 
                  para mejorar la salud bucal y la calidad de vida de nuestros pacientes.
                </p>
                
                <h4 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4 flex items-center">
                  <SparklesIcon className="w-6 h-6 text-[var(--color-accent)] mr-2" />
                  Nuestra Visión
                </h4>
                <p className="text-[var(--color-text-secondary)]">
                  Ser reconocidos como la clínica dental líder en Colombia, destacando por 
                  nuestra innovación tecnológica, excelencia médica y compromiso con el 
                  bienestar integral de nuestros pacientes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Valores */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Nuestros Valores
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y compromiso con la excelencia
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {clinicData.values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-[var(--color-background-light)] rounded-xl p-6 text-center shadow-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                  {value.title}
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Equipo Médico */}
      <motion.section
        className="py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Nuestro Equipo Médico
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Profesionales altamente calificados comprometidos con tu salud dental
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {clinicData.team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{member.image}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                  {member.name}
                </h3>
                <p className="text-[var(--color-accent)] font-medium mb-2">
                  {member.specialty}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  {member.experience} de experiencia
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {member.education}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Servicios */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Ofrecemos una amplia gama de tratamientos odontológicos con tecnología de vanguardia
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {clinicData.services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-[var(--color-background-light)] rounded-xl p-6 shadow-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-xl">🦷</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {service}
                  </h3>
                </div>
                <p className="text-[var(--color-text-secondary)]">
                  Tratamientos especializados con la más alta tecnología y profesionales expertos.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Logros */}
      <motion.section
        className="py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Nuestros Logros
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Reconocimientos y certificaciones que avalan nuestra calidad y compromiso
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {clinicData.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg flex items-start"
                variants={cardVariants}
                whileHover="hover"
              >
                <CheckCircleIcon className="w-6 h-6 text-[var(--color-success)] mr-3 mt-1 flex-shrink-0" />
                <p className="text-[var(--color-text-secondary)]">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            ¿Listo para tu primera visita?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            variants={itemVariants}
          >
            Únete a miles de pacientes satisfechos que han confiado en nosotros para cuidar su sonrisa
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link 
              to="/guest-appointment"
              className="bg-white text-[var(--color-primary)] font-bold py-4 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-block text-center"
            >
              Agendar Cita
            </Link>
            <Link 
              to="/services"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-[var(--color-primary)] transition-all duration-200 inline-block text-center"
            >
              Conocer Servicios
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default About; 