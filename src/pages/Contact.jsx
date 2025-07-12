import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { ContactForm } from '../components/forms';

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

// Datos ficticios de la clínica
const clinicData = {
  name: "Clínica Dental Sonrisa Perfecta",
  address: "Calle 123 #45-67, Barrio Centro",
  city: "Bogotá, Colombia",
  phone: "+57 (1) 234-5678",
  whatsapp: "+57 300 123-4567",
  email: "contacto@sonrisaperfecta.com",
  emergency: "+57 300 999-8888",
  website: "www.sonrisaperfecta.com",
  hours: {
    monday: "8:00 AM - 6:00 PM",
    tuesday: "8:00 AM - 6:00 PM",
    wednesday: "8:00 AM - 6:00 PM",
    thursday: "8:00 AM - 6:00 PM",
    friday: "8:00 AM - 5:00 PM",
    saturday: "8:00 AM - 2:00 PM",
    sunday: "Cerrado"
  },
  services: [
    "Odontología General",
    "Ortodoncia",
    "Endodoncia",
    "Periodoncia",
    "Estética Dental",
    "Cirugía Oral",
    "Implantes Dentales"
  ],
  team: [
    "Dr. Carlos Mendoza - Odontólogo General",
    "Dra. Ana García - Ortodoncista",
    "Dr. Luis Rodríguez - Endodoncista",
    "Dra. María López - Periodoncista"
  ]
};

function Contact() {

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
            Contáctanos
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl opacity-90 mb-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            Estamos aquí para cuidar de tu sonrisa. ¡Agenda tu cita hoy mismo!
          </motion.p>
        </div>
      </motion.section>

      {/* Información de Contacto */}
      <motion.section
        className="py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Información de la Clínica */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">
                Información de la Clínica
              </h2>
              
              <div className="space-y-6">
                {/* Nombre y Dirección */}
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="flex items-start space-x-4">
                    <BuildingOfficeIcon className="w-8 h-8 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                        {clinicData.name}
                      </h3>
                      <div className="flex items-start space-x-2">
                        <MapPinIcon className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-1" />
                        <div>
                          <p className="text-[var(--color-text-secondary)]">
                            {clinicData.address}
                          </p>
                          <p className="text-[var(--color-text-secondary)]">
                            {clinicData.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contacto */}
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                    Información de Contacto
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-5 h-5 text-[var(--color-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">
                        {clinicData.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-[var(--color-accent)]" />
                      <span className="text-[var(--color-text-secondary)]">
                        WhatsApp: {clinicData.whatsapp}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-[var(--color-primary)]" />
                      <span className="text-[var(--color-text-secondary)]">
                        {clinicData.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ShieldCheckIcon className="w-5 h-5 text-red-500" />
                      <span className="text-[var(--color-text-secondary)]">
                        Emergencias: {clinicData.emergency}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Horarios */}
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <ClockIcon className="w-6 h-6 text-[var(--color-primary)]" />
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                      Horarios de Atención
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">Lunes - Jueves:</span>
                      <span className="font-medium">{clinicData.hours.monday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">Viernes:</span>
                      <span className="font-medium">{clinicData.hours.friday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">Sábado:</span>
                      <span className="font-medium">{clinicData.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">Domingo:</span>
                      <span className="font-medium text-red-500">{clinicData.hours.sunday}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Formulario de Contacto */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">
                Envíanos un Mensaje
              </h2>
              
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Equipo Médico */}
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
                className="bg-[var(--color-background-light)] rounded-xl p-6 text-center shadow-lg"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  {member}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Servicios Ofrecidos */}
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
              Servicios que Ofrecemos
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Cuidamos tu sonrisa con tecnología de vanguardia y atención personalizada
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {clinicData.services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🦷</span>
                </div>
                <h3 className="font-semibold text-[var(--color-text-primary)]">
                  {service}
                </h3>
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
            ¿Listo para tu próxima cita?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            variants={itemVariants}
          >
            Agenda tu consulta hoy mismo y descubre cómo podemos transformar tu sonrisa
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <button className="bg-white text-[var(--color-primary)] font-bold py-4 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Agendar Cita
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-[var(--color-primary)] transition-all duration-200">
              Llamar Ahora
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Contact; 