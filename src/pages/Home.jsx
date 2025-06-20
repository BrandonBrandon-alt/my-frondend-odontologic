import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Carousel, Card } from '../components'; // Asumimos que este componente existe y es funcional
import { useAuth } from '../context/AuthContext';

function Home() {
    // Variantes para animar la aparición de secciones completas
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                when: "beforeChildren", // Anima el contenedor antes que sus hijos
                staggerChildren: 0.15, // Retraso entre la animación de cada hijo
                duration: 0.6,
                ease: "easeOut"
            },
        },
    };

    // Variantes para animar elementos individuales dentro de una sección
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
    };

    // Variantes para botones interactivos
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 10, delay: 0.6 } },
        hover: { scale: 1.07, boxShadow: "0px 8px 24px rgba(215, 47, 139, 0.25)" },
        tap: { scale: 0.96 },
    };

    // Variantes para tarjetas de servicios/razones
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

    return (
        // Contenedor principal de la página con estilos globales
        <div className="bg-[var(--color-background-light)] min-h-screen text-[var(--color-text-dark)] font-inter">
            {/* Hero Section - Más impactante y moderno */}
            <motion.section
                className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-accent)] text-white py-36 md:py-56 flex items-center justify-center overflow-hidden shadow-2xl"
                style={{ minHeight: 'calc(100vh - 64px)' }} // Ajusta la altura para que ocupe casi toda la pantalla
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Fondo abstracto con formas sutiles y un overlay para contraste */}
                {/* Patrón de fondo sutil con degradado radial */}
                <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.7)_100%)]"></div>
                {/* Imagen de fondo (asegúrate de tener una imagen en public/images/hero-bg.jpg o ajusta la ruta) */}
                {/* Esta imagen debe ser visualmente atractiva y relevante para una clínica dental */}
                <div className="absolute top-0 left-0 w-full h-full object-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}></div>
                {/* Overlay de color primario sutil para integrar la imagen con el diseño y mejorar la legibilidad del texto */}
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
                        <Link
                            to="/appointment"
                            className="inline-block bg-accent text-white font-extrabold py-5 px-12 rounded-full shadow-2xl hover:bg-[var(--color-accent)] hover:text-white transition duration-300 ease-in-out text-xl transform hover:-translate-y-1 border-2 border-white/20 hover:border-[var(--color-accent)]"
                        >
                            ¡Reserva tu Consulta Gratuita!
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Sección del Carrusel - Integración con el diseño */}
            <section className="py-24 bg-[var(--color-background-light)]"> {/* Fondo ligero para el carrusel */}
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-12 drop-shadow-md"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }} // Anima cuando el 30% de la sección está visible
                        variants={itemVariants}
                    >
                        Conoce Nuestra Clínica
                    </motion.h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }} // Anima cuando el 50% del carrusel está visible
                        variants={itemVariants}
                    >
                        <Carousel /> {/* Tu componente Carousel mejorado */}
                    </motion.div>
                </div>
            </section>

            {/* Servicios Destacados Section - Mejorado con cards y animación */}
            <section className="py-24 bg-gradient-to-b from-[var(--color-background-light)] to-[var(--color-secondary)]/10"> {/* Degradado sutil */}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"> {/* Más espacio entre tarjetas */}
                        {/* Tarjeta de Servicio 1 */}
                        <motion.div
                            className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-xl border-b-4 border-[var(--color-primary)] hover:shadow-2xl transition duration-300 animate-fade-in-up"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-[var(--color-primary)] text-6xl mb-4 drop-shadow-lg">🦷</div> {/* Icono con color primario */}
                            <h3 className="text-[var(--color-text-dark)] text-2xl font-bold mb-3">Odontología General y Preventiva</h3>
                            <p className="text-[var(--color-text-dark)] leading-relaxed text-base mb-2">
                                Chequeos regulares, limpiezas profundas, tratamientos de caries y más para mantener tu salud bucal.
                            </p>
                            <Link to="/services#general" className="mt-4 text-[var(--color-accent)] hover:text-[var(--color-primary-darker)] transition duration-200 font-semibold">
                                Saber más
                            </Link>
                        </motion.div>
                        {/* Tarjeta de Servicio 2 */}
                        <motion.div
                            className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-xl border-b-4 border-[var(--color-secondary)] hover:shadow-2xl transition duration-300 animate-fade-in-up"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-[var(--color-secondary)] text-6xl mb-4 drop-shadow-lg">✨</div> {/* Icono con color secundario */}
                            <h3 className="text-[var(--color-text-dark)] text-2xl font-bold mb-3">Estética Dental y Blanqueamiento</h3>
                            <p className="text-[var(--color-text-dark)] leading-relaxed text-base mb-2">
                                Transforma tu sonrisa con blanqueamiento dental profesional, carillas de porcelana y diseño de sonrisa.
                            </p>
                            <Link to="/services#estetica" className="mt-4 text-[var(--color-accent)] hover:text-[var(--color-primary-darker)] transition duration-200 font-semibold">
                                Saber más
                            </Link>
                        </motion.div>
                        {/* Tarjeta de Servicio 3 */}
                        <motion.div
                            className="bg-[var(--color-background-light)] p-10 rounded-2xl shadow-xl border-b-4 border-[var(--color-accent)] hover:shadow-2xl transition duration-300 animate-fade-in-up"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="text-[var(--color-accent)] text-6xl mb-4 drop-shadow-lg">🪥</div> {/* Icono con color accent */}
                            <h3 className="text-[var(--color-text-dark)] text-2xl font-bold mb-3">Ortodoncia y Rehabilitación</h3>
                            <p className="text-[var(--color-text-dark)] leading-relaxed text-base mb-2">
                                Soluciones modernas para alinear tus dientes y restaurar tu sonrisa con tecnología de punta.
                            </p>
                            <Link to="/services#ortodoncia" className="mt-4 text-[var(--color-accent)] hover:text-[var(--color-primary-darker)] transition duration-200 font-semibold">
                                Saber más
                            </Link>
                        </motion.div>
                        {/* Puedes añadir más tarjetas de servicios aquí si tienes más servicios destacados */}
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

            {/* ¿Por Qué Elegirnos? Section - Estilo de tarjeta más atractivo */}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"> {/* Más espacio entre tarjetas */}
                        {/* Cards de razones */}
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

            {/* Call to Action Section (CTA) - Un cierre fuerte y motivador */}
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
                        <Link
                            to="/contact"
                            className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-primary)] hover:text-white text-white font-extrabold py-5 px-12 rounded-full shadow-2xl transition duration-300 ease-in-out text-xl border-2 border-white/20 hover:border-[var(--color-accent)]"
                        >
                            ¡Contáctanos Ahora!
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Footer - Información básica y enlaces de utilidad */}
            <footer className="bg-[var(--color-primary)] text-white py-8 shadow-inner">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm opacity-80 mb-2">&copy; {new Date().getFullYear()} Odontologic - Tu Clínica Dental en Armenia, Quindío.</p>
                    <div className="flex justify-center space-x-4 text-sm opacity-80">
                        <Link to="/privacy" className="hover:opacity-100 transition duration-200">Política de Privacidad</Link>
                        <span>|</span> {/* Separador visual */}
                        <Link to="/terms" className="hover:opacity-100 transition duration-200">Términos de Servicio</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
