import React from 'react';
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

function WhyChooseUsSection() {
    return (
        <section className="py-24 bg-[var(--color-background-light)]">
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
                    ¿Por Qué Confiar en Odontologic?
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <motion.div className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center animate-fade-in-up" variants={cardVariants} whileHover="hover">
                        <div className="text-[var(--color-primary)] text-6xl mb-4 drop-shadow-lg">👨‍⚕️</div>
                        <h3 className="text-[var(--color-text-dark)] text-xl font-bold mb-2">Equipo Profesional y Dedicado</h3>
                        <p className="text-[var(--color-text-dark)] text-base leading-relaxed">Dentistas expertos con años de experiencia comprometidos con tu bienestar.</p>
                    </motion.div>
                    <motion.div className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center animate-fade-in-up" variants={cardVariants} whileHover="hover">
                        <div className="text-[var(--color-secondary)] text-6xl mb-4 drop-shadow-lg">💡</div>
                        <h3 className="text-[var(--color-text-dark)] text-xl font-bold mb-2">Tecnología de Última Generación</h3>
                        <p className="text-[var(--color-text-dark)] text-base leading-relaxed">Equipos avanzados para diagnósticos precisos y tratamientos eficientes.</p>
                    </motion.div>
                    <motion.div className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center animate-fade-in-up" variants={cardVariants} whileHover="hover">
                        <div className="text-[var(--color-accent)] text-6xl mb-4 drop-shadow-lg">😊</div>
                        <h3 className="text-[var(--color-text-dark)] text-xl font-bold mb-2">Atención Personalizada y Cálida</h3>
                        <p className="text-[var(--color-text-dark)] text-base leading-relaxed">Planes de tratamiento diseñados a tu medida en un ambiente cómodo y amigable.</p>
                    </motion.div>
                    <motion.div className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center animate-fade-in-up" variants={cardVariants} whileHover="hover">
                        <div className="text-[var(--color-primary)] text-6xl mb-4 drop-shadow-lg">📍</div>
                        <h3 className="text-[var(--color-text-dark)] text-xl font-bold mb-2">Ubicación Céntrica en Armenia</h3>
                        <p className="text-[var(--color-text-dark)] text-base leading-relaxed">Encuéntranos fácilmente en una zona accesible de Armenia, Quindío.</p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default WhyChooseUsSection; 