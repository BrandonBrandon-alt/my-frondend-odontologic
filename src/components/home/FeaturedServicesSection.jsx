import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import {
  SparklesIcon,
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const FeaturedServicesSection = () => {
  const services = [
    {
      icon: <UserGroupIcon className="w-12 h-12 text-[var(--color-primary)]" />,
      title: "Odontología General",
      description: "Revisiones completas, limpiezas profesionales y tratamientos básicos para mantener tu salud bucal.",
      borderColor: "border-[var(--color-primary)]",
      link: "/services#general"
    },
    {
      icon: <SparklesIcon className="w-12 h-12 text-[var(--color-secondary)]" />,
      title: "Estética Dental",
      description: "Blanqueamientos, carillas y tratamientos para lograr la sonrisa que siempre has deseado.",
      borderColor: "border-[var(--color-secondary)]",
      link: "/services#esthetic"
    },
    {
      icon: <HeartIcon className="w-12 h-12 text-[var(--color-accent)]" />,
      title: "Ortodoncia",
      description: "Alineación dental con brackets tradicionales o invisibles para una sonrisa perfecta.",
      borderColor: "border-[var(--color-accent)]",
      link: "/services#orthodontics"
    }
  ];

    return (
    <section className="py-16 bg-white dark:bg-[var(--color-background)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-6">
            Nuestros Servicios Destacados
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] dark:text-[var(--color-text-light)] max-w-3xl mx-auto leading-relaxed">
            Ofrecemos una amplia gama de servicios odontológicos con la más alta calidad y tecnología avanzada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
                >
              <Link to={service.link}>
                <Card
                  variant="elevated"
                  className={`p-10 rounded-2xl shadow-xl border-b-4 ${service.borderColor} hover:shadow-2xl transition duration-300 animate-fade-in-up`}
                  icon={service.icon}
                  title={service.title}
                  subtitle={service.description}
                />
                        </Link>
                    </motion.div>
          ))}
        </div>

                    <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/services"
            className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white text-white font-extrabold py-4 px-10 rounded-full shadow-xl transition duration-300 ease-in-out text-xl transform hover:scale-105"
          >
            Ver Todos los Servicios
                        </Link>
                    </motion.div>
                </div>
        </section>
    );
};

export default FeaturedServicesSection; 