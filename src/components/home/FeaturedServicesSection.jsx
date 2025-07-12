import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.15,
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
        scale: 1.04,
        y: -8,
        boxShadow: "0px 20px 32px rgba(0,0,0,0.13), 0px 0px 0px 4px var(--color-accent-light)",
        transition: { duration: 0.3 }
    },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.6 } },
    hover: { scale: 1.07, boxShadow: "0px 8px 24px rgba(215, 47, 139, 0.25)" },
    tap: { scale: 0.96 },
};

function FeaturedServicesSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-[var(--color-background-light)] to-[var(--color-secondary)]/10">
            <motion.div
                className="container mx-auto px-6 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-16 drop-shadow-md"
                    variants={itemVariants}
                >
                    Nuestros Servicios Especializados
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Servicio 1 */}
                    <motion.div
                        className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-xl border-b-4 border-[var(--color-primary)] hover:shadow-2xl transition duration-300 animate-fade-in-up"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div className="text-[var(--color-primary)] text-6xl mb-4 drop-shadow-lg">🦷</div>
                        <h3 className="text-[var(--color-text-dark)] text-2xl font-bold mb-3">Odontología General y Preventiva</h3>
                        <p className="text-[var(--color-text-dark)] leading-relaxed text-base mb-2">
                            Chequeos regulares, limpiezas profundas, tratamientos de caries y más para mantener tu salud bucal.
                        </p>
                        <Link to="/services#general" className="mt-4 text-[var(--color-accent)] hover:text-[var(--color-primary-darker)] transition duration-200 font-semibold">
                            Saber más
                        </Link>
                    </motion.div>
                    {/* Servicio 2 */}
                    <motion.div
                        className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-xl border-b-4 border-[var(--color-secondary)] hover:shadow-2xl transition duration-300 animate-fade-in-up"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div className="text-[var(--color-secondary)] text-6xl mb-4 drop-shadow-lg">✨</div>
                        <h3 className="text-[var(--color-text-dark)] text-2xl font-bold mb-3">Estética Dental y Blanqueamiento</h3>
                        <p className="text-[var(--color-text-dark)] leading-relaxed text-base mb-2">
                            Transforma tu sonrisa con blanqueamiento dental profesional, carillas de porcelana y diseño de sonrisa.
                        </p>
                        <Link to="/services#estetica" className="mt-4 text-[var(--color-accent)] hover:text-[var(--color-primary-darker)] transition duration-200 font-semibold">
                            Saber más
                        </Link>
                    </motion.div>
                    {/* Servicio 3 */}
                    <motion.div
                        className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-xl border-b-4 border-[var(--color-accent)] hover:shadow-2xl transition duration-300 animate-fade-in-up"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <div className="text-[var(--color-accent)] text-6xl mb-4 drop-shadow-lg">🪥</div>
                        <h3 className="text-[var(--color-text-dark)] text-2xl font-bold mb-3">Ortodoncia y Rehabilitación</h3>
                        <p className="text-[var(--color-text-dark)] leading-relaxed text-base mb-2">
                            Soluciones modernas para alinear tus dientes y restaurar tu sonrisa con tecnología de punta.
                        </p>
                        <Link to="/services#ortodoncia" className="mt-4 text-[var(--color-accent)] hover:text-[var(--color-primary-darker)] transition duration-200 font-semibold">
                            Saber más
                        </Link>
                    </motion.div>
                </div>
                <motion.div className="mt-12" variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Link
                        to="/services"
                        className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white text-white font-extrabold py-4 px-10 rounded-full shadow-xl transition duration-300 ease-in-out text-xl border-2 border-white/20 hover:border-[var(--color-accent)]"
                    >
                        Ver Todos Nuestros Servicios
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default FeaturedServicesSection; 