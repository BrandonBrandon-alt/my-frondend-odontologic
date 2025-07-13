import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import {
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const WhyChooseUsSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: <ShieldCheckIcon className="w-12 h-12 text-[var(--color-accent)]" />,
      title: "Seguridad Garantizada",
      description: "Tu información personal y médica está protegida con los más altos estándares de seguridad y confidencialidad."
    },
    {
      icon: <ClockIcon className="w-12 h-12 text-[var(--color-primary)]" />,
      title: "Atención Rápida",
      description: "Agenda tu cita en minutos y recibe atención oportuna sin largas esperas."
    },
    {
      icon: <UserGroupIcon className="w-12 h-12 text-[var(--color-secondary)]" />,
      title: "Equipo Profesional",
      description: "Contamos con dentistas certificados y personal capacitado para brindarte la mejor atención."
    },
    {
      icon: <SparklesIcon className="w-12 h-12 text-[var(--color-accent)]" />,
      title: "Tecnología Avanzada",
      description: "Utilizamos equipos de última generación para diagnósticos precisos y tratamientos efectivos."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[var(--color-background-light)] to-white dark:from-[var(--color-background)] dark:to-[var(--color-background)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            En Odontologic, nos comprometemos a brindarte la mejor experiencia dental con tecnología avanzada, 
            profesionales expertos y un enfoque centrado en tu bienestar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant="elevated"
                className="p-10 flex flex-col items-center text-center animate-fade-in-up"
                icon={feature.icon}
                title={feature.title}
                subtitle={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 