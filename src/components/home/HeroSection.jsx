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

function HeroSection() {
    return (
        <motion.section
            className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-accent)] text-white py-36 md:py-56 flex items-center justify-center overflow-hidden shadow-2xl"
            style={{ minHeight: 'calc(100vh - 64px)' }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.7)_100%)]"></div>
            <div className="absolute top-0 left-0 w-full h-full object-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}></div>
            <div className="absolute inset-0 bg-[var(--color-primary)] bg-opacity-30"></div>

            <div className="relative z-10 container mx-auto text-center px-6">
                <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-8 tracking-tight drop-shadow-2xl"
                    variants={itemVariants}
                >
                    Sonrisas que Inspiran, Cuidados que Transforman
                </motion.h1>
                <motion.p
                    className="text-xl md:text-2xl opacity-90 mb-16 max-w-4xl mx-auto font-light drop-shadow-lg"
                    variants={itemVariants}
                >
                    En Odontologic, combinamos la última tecnología con un toque humano para ofrecerte una experiencia dental excepcional en el corazón de Armenia, Quindío.
                </motion.p>
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <AgendarCitaButton
                        className="inline-block bg-accent text-white font-extrabold py-5 px-12 rounded-full shadow-2xl hover:bg-[var(--color-accent)] hover:text-white transition duration-300 ease-in-out text-xl transform hover:-translate-y-1 border-2 border-white/20 hover:border-[var(--color-accent)]"
                    >
                        ¡Agenda tu cita gratis!
                    </AgendarCitaButton>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default HeroSection; 