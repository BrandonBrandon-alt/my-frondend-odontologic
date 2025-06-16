// src/components/Carousel.jsx
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

    // useMotionValue para rastrear el valor X del arrastre
    const x = useMotionValue(0);

    // useTransform para escalar y ajustar opacidad de las diapositivas inactivas
    const scale = useTransform(x, (latestX) => {
        // Escala para simular profundidad
        const currentSlideOffset = latestX % width;
        return 1 - (Math.abs(currentSlideOffset) / width) * 0.1; // Reduce escala en 10%
    });

    const opacity = useTransform(x, (latestX) => {
        // Opacidad para desvanecer diapositivas inactivas
        const currentSlideOffset = latestX % width;
        return 1 - (Math.abs(currentSlideOffset) / width) * 0.5; // Reduce opacidad en 50%
    });

    // Calcula el ancho desplazable total del carrusel
    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    // Función para ir a la siguiente diapositiva
    const goToNext = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % images.length;
            x.set(-nextIndex * carouselRef.current.offsetWidth); // Ajusta la posición X
            return nextIndex;
        });
    };

    // Función para ir a la diapositiva anterior
    const goToPrev = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex - 1 + images.length) % images.length;
            x.set(-nextIndex * carouselRef.current.offsetWidth); // Ajusta la posición X
            return nextIndex;
        });
    };

    // Función para ir a una diapositiva específica por su índice
    const goToSlide = (index) => {
        setCurrentIndex(index);
        x.set(-index * carouselRef.current.offsetWidth); // Ajusta la posición X
    };

    // Opcional: Auto-play
    useEffect(() => {
        const interval = setInterval(goToNext, 5000); // Cambia cada 5 segundos
        return () => clearInterval(interval);
    }, [currentIndex]); // Reinicia el intervalo cada vez que cambia la diapositiva

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-xl">
            <motion.div
                ref={carouselRef}
                className="flex cursor-grab"
                whileTap={{ cursor: "grabbing" }}
                drag="x" // Permite arrastrar solo en el eje X
                dragConstraints={{ right: 0, left: -width }} // Limita el arrastre al ancho del carrusel
                style={{ x }} // Conecta el valor de movimiento `x` al estilo CSS `transformX`
                onDragEnd={(event, info) => {
                    // Lógica para "snap" a la diapositiva más cercana al soltar
                    const offset = info.offset.x;
                    const velocity = info.velocity.x;
                    const currentOffset = x.get();
                    const slideWidth = carouselRef.current.offsetWidth;

                    let targetIndex = currentIndex;
                    if (velocity < -500) { // Deslizar rápido a la izquierda
                        targetIndex = Math.min(images.length - 1, currentIndex + 1);
                    } else if (velocity > 500) { // Deslizar rápido a la derecha
                        targetIndex = Math.max(0, currentIndex - 1);
                    } else { // Deslizar lento o soltar
                        targetIndex = Math.round(currentOffset / -slideWidth);
                        targetIndex = Math.max(0, Math.min(images.length - 1, targetIndex)); // Asegura que el índice esté dentro de los límites
                    }
                    setCurrentIndex(targetIndex);
                    x.set(-targetIndex * slideWidth, { transition: { type: "spring", stiffness: 200, damping: 30 } }); // Anima al snap
                }}
            >
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="flex-shrink-0 w-full h-[500px] flex items-center justify-center"
                        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    // Aplica transformaciones de escala y opacidad para los elementos no centrales
                    // Nota: Esto es un poco más complejo si quieres que solo la *actual* sea 100% y las demás se escalen/desvanezcan
                    // Para simplificar, podríamos aplicar esto si no queremos arrastre y solo click
                    // o usar `x.onChange` para calcular el transform para cada slide individualmente.
                    // Por ahora, solo el contenedor principal se arrastra.
                    >
                        {/* Contenido opcional dentro de cada diapositiva */}
                    </motion.div>
                ))}
            </motion.div>

            {/* Controles de navegación */}
            <button
                onClick={goToPrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors z-10"
            >
                &#10094; {/* Icono de flecha izquierda */}
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors z-10"
            >
                &#10095; {/* Icono de flecha derecha */}
            </button>

            {/* Paginación (puntos) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-75'
                            } transition-colors`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;