import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';

// Datos de ejemplo para las diapositivas del carrusel
const images = [
    image1,
    image2,
    image3,
    image4,
];

const Carousel = () => {
    const carouselRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const x = useMotionValue(0);

    // Efecto de escala y opacidad para las diapositivas
    // Calcula la escala y opacidad basándose en la distancia de cada slide al centro.
    // Esto es un poco más complejo pero da un efecto mucho más cool.
    const getSlideStyle = (index) => {
        // Distancia actual del arrastre desde el inicio (en píxeles)
        const currentDragOffset = x.get();
        // Ancho de una sola diapositiva
        const slideWidth = carouselRef.current?.offsetWidth || 0;

        // Si slideWidth es 0, retornamos valores por defecto para evitar divisiones por cero
        if (slideWidth === 0) {
            return { scale: 1, opacity: 1 };
        }

        // Posición ideal de la diapositiva actual (cuando está centrada)
        const targetXForIndex = -index * slideWidth;

        // Diferencia entre la posición actual del carrusel y la posición ideal de esta diapositiva
        const diff = Math.abs(currentDragOffset - targetXForIndex);

        // Calcula un factor basado en la distancia. Cuanto más lejos, más pequeño el factor.
        const distanceFactor = Math.min(1, diff / slideWidth);

        // Escala: 1 si está centrada, se reduce a 0.85 cuando está más lejos
        const scaleValue = 1 - (distanceFactor * 0.15); // Reduce en un 15%
        // Opacidad: 1 si está centrada, se reduce a 0.6 cuando está más lejos
        const opacityValue = 1 - (distanceFactor * 0.4); // Reduce en un 40%

        return { scale: scaleValue, opacity: opacityValue };
    };


    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                // Asegúrate de que `scrollWidth` considere todos los elementos hijos, no solo el visible.
                // Ya que `flex-shrink-0` hace que cada imagen ocupe su propio ancho.
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        updateWidth(); // Llama al inicio
        window.addEventListener('resize', updateWidth); // Actualiza al redimensionar la ventana

        return () => window.removeEventListener('resize', updateWidth);
    }, [images]); // Dependencia de `images` para recalcular si cambian las imágenes

    const goToSlide = (index) => {
        if (carouselRef.current) {
            const slideWidth = carouselRef.current.offsetWidth;
            setCurrentIndex(index);
            // Anima la posición X para un desplazamiento suave
            x.set(-index * slideWidth, { transition: { type: "spring", stiffness: 200, damping: 30 } });
        }
    };

    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        goToSlide(nextIndex);
    };

    const goToPrev = () => {
        const nextIndex = (currentIndex - 1 + images.length) % images.length;
        goToSlide(nextIndex);
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [currentIndex, images.length]); // Dependencia de `images.length` para reinicio si cambian las imágenes

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-2xl bg-gray-900"> {/* Fondo oscuro y sombra más pronunciada */}
            <motion.div
                ref={carouselRef}
                className="flex cursor-grab items-center" // Centra verticalmente las imágenes si no llenan el alto
                whileTap={{ cursor: "grabbing" }}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                style={{ x }}
                onDragEnd={(event, info) => {
                    const offset = info.offset.x;
                    const velocity = info.velocity.x;
                    const currentOffset = x.get();
                    const slideWidth = carouselRef.current.offsetWidth;

                    let targetIndex = currentIndex;
                    if (velocity < -500) {
                        targetIndex = Math.min(images.length - 1, currentIndex + 1);
                    } else if (velocity > 500) {
                        targetIndex = Math.max(0, currentIndex - 1);
                    } else {
                        // Calcula el índice basado en la posición actual del arrastre
                        targetIndex = Math.round(currentOffset / -slideWidth);
                        targetIndex = Math.max(0, Math.min(images.length - 1, targetIndex));
                    }
                    goToSlide(targetIndex); // Usa la función goToSlide para animar el snap
                }}
            >
                {images.map((image, index) => {
                    // Obtiene los estilos de escala y opacidad para cada slide individualmente
                    const { scale: slideScale, opacity: slideOpacity } = getSlideStyle(index);

                    return (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 w-full h-[500px] flex items-center justify-center relative"
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                scale: slideScale, // Aplica la escala calculada
                                opacity: slideOpacity, // Aplica la opacidad calculada
                                borderRadius: '8px', // Bordes ligeramente redondeados
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }} // Transición suave para escala y opacidad
                        >
                            {/* Overlay sutil para mejorar la legibilidad de texto si lo agregas */}
                            <div className="absolute inset-0 bg-black opacity-20"></div>
                            {/* Aquí podrías agregar títulos o descripciones para cada slide */}
                            <div className="relative z-10 text-white text-3xl font-bold drop-shadow-lg">
                                {/* Título de la imagen si lo tienes */}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Controles de navegación */}
            <button
                onClick={goToPrev}
                className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-4 rounded-full hover:bg-opacity-40 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 z-10"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-4 rounded-full hover:bg-opacity-40 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 z-10"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            {/* Paginación (puntos) */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                            index === currentIndex ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-75 hover:bg-opacity-100'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;