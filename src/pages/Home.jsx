// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';

function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.6 } },
        hover: { scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)" },
        tap: { scale: 0.95 },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.03, boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.1)" },
    };

    return (
        <div className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <motion.section
                className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32 flex items-center justify-center overflow-hidden"
                style={{ minHeight: 'calc(100vh - 64px)' }}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Fondo con formas sutiles para un toque profesional - Color de fondo SVG */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,122.7C672,117,768,171,864,181.3C960,192,1056,155,1152,149.3C1248,144,1344,171,1392,184L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                    </svg>
                </div>

                <div className="relative z-10 container mx-auto text-center px-4">
                    <motion.h1
                        className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
                        variants={itemVariants}
                    >
                        Tu Sonrisa, Nuestra Prioridad
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Expertos en cuidado dental integral, combinando la más alta tecnología con un trato humano y cercano para toda tu familia.
                    </motion.p>
                    <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link
                            to="/contact"
                            className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-full shadow-xl hover:bg-background-light hover:scale-105 transition duration-300 ease-in-out text-lg"
                        >
                            Agenda Tu Cita Hoy
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Sección del Carrusel - Nuevo */}
            <section className="py-16 bg-white"> {/* Fondo blanco para resaltar el carrusel */}
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-extrabold text-text-dark mb-12">
                        Nuestros Valores en Imágenes
                    </h2>
                    <Carousel />
                </div>
            </section>

            {/* Servicios Destacados Section */}
            <section className="py-20 bg-background-light shadow-inner"> {/* Fondo con tu gris claro */}
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-extrabold text-text-dark mb-12">
                        Nuestros Servicios Principales
                    </h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        {/* Tarjeta de Servicio 1 */}
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md" /* Fondo de tarjeta blanco para contraste */
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-primary text-5xl mb-4">🦷</div> {/* Icono con tu azul principal */}
                            <h3 className="text-text-dark text-2xl font-semibold mb-3">Odontología General</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Chequeos regulares, limpiezas, empastes y tratamientos preventivos para mantener tu salud bucal.
                            </p>
                        </motion.div>
                        {/* Tarjeta de Servicio 2 */}
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-primary text-5xl mb-4">✨</div>
                            <h3 className="text-text-dark text-2xl font-semibold mb-3">Estética Dental</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Blanqueamiento, carillas y diseño de sonrisa para transformar tu apariencia.
                            </p>
                        </motion.div>
                        {/* Tarjeta de Servicio 3 */}
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow-md"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-primary text-5xl mb-4">💪</div>
                            <h3 className="text-text-dark text-2xl font-semibold mb-3">Implantes Dentales</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Soluciones permanentes para reemplazar dientes perdidos y restaurar la función.
                            </p>
                        </motion.div>
                    </motion.div>
                    <Link
                        to="/services"
                        className="inline-block mt-12 bg-accent hover:bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105" /* Botón CTA con tu rosa/magenta, hover a tu azul principal */
                    >
                        Ver Todos los Servicios
                    </Link>
                </div>
            </section>

            {/* ¿Por Qué Elegirnos? Section */}
            <section className="py-20 bg-white"> {/* Fondo blanco para mayor contraste */}
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-extrabold text-text-dark mb-12">
                        ¿Por Qué Elegirnos?
                    </h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        {/* Cards de razones */}
                        <motion.div className="bg-background-light p-6 rounded-lg shadow-md flex flex-col items-center" variants={cardVariants} whileHover="hover"> {/* Fondo de tarjeta gris claro */}
                            <div className="text-primary text-4xl mb-4">👨‍⚕️</div>
                            <h3 className="text-text-dark text-xl font-semibold mb-2">Profesionales Expertos</h3>
                            <p className="text-gray-600 text-sm">Equipo altamente cualificado y en constante formación.</p>
                        </motion.div>
                        <motion.div className="bg-background-light p-6 rounded-lg shadow-md flex flex-col items-center" variants={cardVariants} whileHover="hover">
                            <div className="text-primary text-4xl mb-4">💡</div>
                            <h3 className="text-text-dark text-xl font-semibold mb-2">Tecnología de Vanguardia</h3>
                            <p className="text-gray-600 text-sm">Equipos modernos para diagnósticos precisos y tratamientos eficaces.</p>
                        </motion.div>
                        <motion.div className="bg-background-light p-6 rounded-lg shadow-md flex flex-col items-center" variants={cardVariants} whileHover="hover">
                            <div className="text-primary text-4xl mb-4">😊</div>
                            <h3 className="text-text-dark text-xl font-semibold mb-2">Atención Personalizada</h3>
                            <p className="text-gray-600 text-sm">Un trato cercano y empático para cada paciente.</p>
                        </motion.div>
                        <motion.div className="bg-background-light p-6 rounded-lg shadow-md flex flex-col items-center" variants={cardVariants} whileHover="hover">
                            <div className="text-primary text-4xl mb-4">🏆</div>
                            <h3 className="text-text-dark text-xl font-semibold mb-2">Resultados Garantizados</h3>
                            <p className="text-gray-600 text-sm">Comprometidos con tu salud y la belleza de tu sonrisa.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary text-white py-10 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Odontologic. Todos los derechos reservados.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <Link to="/privacy" className="text-gray-300 hover:text-white transition duration-300">Política de Privacidad</Link>
                        <Link to="/terms" className="text-gray-300 hover:text-white transition duration-300">Términos de Servicio</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;