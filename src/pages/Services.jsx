import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  WrenchScrewdriverIcon, 
  SparklesIcon, 
  ShieldCheckIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon
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
    scale: 1.05,
    y: -10,
    boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 }
  },
};

// Datos de servicios organizados por categorías
const servicesData = {
  general: {
    title: "Odontología General y Preventiva",
    color: "primary",
    icon: "🦷",
    services: [
      {
        name: "Limpieza Dental Profesional",
        description: "Eliminación de placa y sarro para mantener una boca saludable",
        duration: "45 min",
        price: "Desde $50.000"
      },
      {
        name: "Chequeo y Diagnóstico",
        description: "Evaluación completa de la salud bucal con tecnología avanzada",
        duration: "30 min",
        price: "Desde $30.000"
      },
      {
        name: "Tratamiento de Caries",
        description: "Restauración de dientes afectados con materiales de alta calidad",
        duration: "60 min",
        price: "Desde $80.000"
      },
      {
        name: "Extracciones Simples",
        description: "Extracción segura de dientes dañados o problemáticos",
        duration: "45 min",
        price: "Desde $100.000"
      }
    ]
  },
  estetica: {
    title: "Estética Dental y Blanqueamiento",
    color: "secondary",
    icon: "✨",
    services: [
      {
        name: "Blanqueamiento Dental",
        description: "Sonrisa más brillante y blanca con tecnología profesional",
        duration: "90 min",
        price: "Desde $150.000"
      },
      {
        name: "Carillas de Porcelana",
        description: "Transformación completa de la sonrisa con carillas personalizadas",
        duration: "2 sesiones",
        price: "Desde $800.000"
      },
      {
        name: "Diseño de Sonrisa",
        description: "Planificación integral para la sonrisa de tus sueños",
        duration: "Consulta",
        price: "Desde $200.000"
      },
      {
        name: "Bonding Dental",
        description: "Corrección de imperfecciones menores de forma rápida",
        duration: "60 min",
        price: "Desde $120.000"
      }
    ]
  },
  ortodoncia: {
    title: "Ortodoncia y Rehabilitación",
    color: "accent",
    icon: "🪥",
    services: [
      {
        name: "Brackets Metálicos",
        description: "Ortodoncia tradicional para alinear perfectamente tus dientes",
        duration: "18-24 meses",
        price: "Desde $2.500.000"
      },
      {
        name: "Brackets Estéticos",
        description: "Ortodoncia discreta con brackets transparentes",
        duration: "18-24 meses",
        price: "Desde $3.200.000"
      },
      {
        name: "Invisalign",
        description: "Alineadores transparentes removibles para adultos",
        duration: "12-18 meses",
        price: "Desde $4.500.000"
      },
      {
        name: "Retenedores",
        description: "Mantenimiento de resultados después del tratamiento",
        duration: "Permanente",
        price: "Desde $150.000"
      }
    ]
  },
  especializada: {
    title: "Especialidades Avanzadas",
    color: "primary",
    icon: "🔬",
    services: [
      {
        name: "Endodoncia",
        description: "Tratamiento de conductos para salvar dientes dañados",
        duration: "90 min",
        price: "Desde $300.000"
      },
      {
        name: "Periodoncia",
        description: "Tratamiento de encías y enfermedades periodontales",
        duration: "60 min",
        price: "Desde $200.000"
      },
      {
        name: "Cirugía Oral",
        description: "Extracciones complejas y cirugías bucales",
        duration: "Varía",
        price: "Desde $400.000"
      },
      {
        name: "Implantes Dentales",
        description: "Reemplazo permanente de dientes perdidos",
        duration: "3-6 meses",
        price: "Desde $2.800.000"
      }
    ]
  }
};

function Services() {
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
            Nuestros Servicios Odontológicos
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl opacity-90 mb-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            Cuidamos tu sonrisa con tecnología de vanguardia y atención personalizada
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-sm"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <ClockIcon className="h-5 w-5" />
              <span>Horarios Flexibles</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Garantía de Calidad</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <HeartIcon className="h-5 w-5" />
              <span>Atención Personalizada</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Servicios por Categorías */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {Object.entries(servicesData).map(([category, categoryData], index) => (
            <motion.div
              key={category}
              className="mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.div className="text-center mb-12" variants={itemVariants}>
                <div className="text-6xl mb-4">{categoryData.icon}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
                  {categoryData.title}
                </h2>
                <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {categoryData.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-[var(--color-accent)]"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-[var(--color-text-dark)]">
                        {service.name}
                      </h3>
                      <span className="text-sm bg-[var(--color-accent)] text-white px-3 py-1 rounded-full">
                        {service.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-[var(--color-primary)]">
                        {service.price}
                      </span>
                      <Link
                        to="/guest-appointment"
                        className="bg-[var(--color-accent)] text-white px-6 py-2 rounded-full hover:bg-[var(--color-primary)] transition duration-300 font-semibold"
                      >
                        Agendar
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={itemVariants}>
            ¿Listo para Transformar tu Sonrisa?
          </motion.h2>
          <motion.p className="text-xl mb-8 opacity-90" variants={itemVariants}>
            Agenda tu cita hoy y recibe una consulta de evaluación gratuita
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <Link
              to="/guest-appointment"
              className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300"
            >
              Agendar Cita
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[var(--color-primary)] transition duration-300"
            >
              Contactar
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Información de Contacto */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">Ubicación</h3>
              <p className="text-gray-600">Armenia, Quindío<br />Centro Comercial</p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">Horarios</h3>
              <p className="text-gray-600">Lun - Vie: 8:00 AM - 6:00 PM<br />Sáb: 8:00 AM - 2:00 PM</p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">Contacto</h3>
              <p className="text-gray-600">+57 300 123 4567<br />info@odontologic.com</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services; 