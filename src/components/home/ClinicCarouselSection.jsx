import React from 'react';
import { motion } from 'framer-motion';
import { Carousel } from '../';

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

function ClinicCarouselSection() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-12 drop-shadow-md"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={itemVariants}
                >
                    Conoce Nuestra Clínica
                </motion.h2>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                    <Carousel />
                </motion.div>
            </div>
        </section>
    );
}

export default ClinicCarouselSection; 