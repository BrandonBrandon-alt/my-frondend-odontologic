import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import ContactForm from '../components/forms/ContactForm';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const contactInfo = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Teléfono",
      content: "+57 300 123 4567",
      link: "tel:+573001234567"
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: "Email",
      content: "info@odontologic.com",
      link: "mailto:info@odontologic.com"
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: "Dirección",
      content: "Calle 15 #23-45, Armenia, Quindío",
      link: "https://maps.google.com"
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: "Horarios",
      content: "Lun-Vie: 8:00 AM - 6:00 PM",
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] dark:bg-[var(--color-background)] text-[var(--color-text-light)]">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para ayudarte con cualquier consulta o cita que necesites. 
            Nuestro equipo está listo para brindarte la mejor atención.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                variant="elevated"
                className="p-6 text-center"
                icon={info.icon}
                title={info.title}
                subtitle={
                  info.link ? (
                    <a
                      href={info.link}
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                    >
                      {info.content}
                    </a>
                  ) : (
                    info.content
                  )
                }
              />
            </motion.div>
          ))}
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact; 