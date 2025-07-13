import React from 'react';
import { motion } from 'framer-motion';
import AgendarCitaButton from '../ui/Button/AgendarCitaButton';

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

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.6 } },
    hover: { scale: 1.07, boxShadow: "0px 8px 24px rgba(215, 47, 139, 0.25)" },
    tap: { scale: 0.96 },
};

function CallToActionSection() {
    return (
        <section className="py-24 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white text-center shadow-2xl">
            <motion.div
                className="container mx-auto px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.h2 className="text-3xl md:text-4xl font-extrabold mb-8 drop-shadow-lg" variants={itemVariants}>
                    Da el Primer Paso Hacia una Sonrisa Saludable
                </motion.h2>
                <motion.p className="text-lg opacity-90 mb-12 max-w-3xl mx-auto font-light drop-shadow-md" variants={itemVariants}>
                    ¡Estamos listos para atenderte! Agenda tu cita y experimenta la diferencia Odontologic.
                </motion.p>
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <AgendarCitaButton
                        className="inline-block bg-white text-[var(--color-primary)] font-extrabold py-4 px-10 rounded-full shadow-xl transition duration-300 ease-in-out text-xl border-2 border-white/20 hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)]"
                    >
                        ¡Agenda tu cita ahora!
                    </AgendarCitaButton>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default CallToActionSection; 