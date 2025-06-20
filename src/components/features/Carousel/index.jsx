import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import image1 from '../../../assets/1.jpg';
import image2 from '../../../assets/2.jpg';
import image3 from '../../../assets/3.jpg';
import image4 from '../../../assets/4.jpg';

const images = [image1, image2, image3, image4];
const slideTexts = [
  {
    title: 'Bienvenido a Odontologic',
    desc: 'Tecnología, calidez y excelencia para tu sonrisa.',
  },
  {
    title: 'Cuidamos tu salud bucal',
    desc: 'Tratamientos modernos y personalizados.',
  },
  {
    title: 'Equipo profesional',
    desc: 'Dentistas expertos comprometidos con tu bienestar.',
  },
  {
    title: 'Agenda tu cita hoy',
    desc: '¡Da el primer paso hacia una sonrisa saludable!',
  },
];

const Carousel = () => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);

  const getSlideStyle = (index) => {
    const currentDragOffset = x.get();
    const slideWidth = carouselRef.current?.offsetWidth || 0;
    if (slideWidth === 0) return { scale: 1, opacity: 1 };
    const targetXForIndex = -index * slideWidth;
    const diff = Math.abs(currentDragOffset - targetXForIndex);
    const distanceFactor = Math.min(1, diff / slideWidth);
    const scaleValue = 1 - (distanceFactor * 0.15);
    const opacityValue = 1 - (distanceFactor * 0.4);
    return { scale: scaleValue, opacity: opacityValue };
  };

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const goToSlide = (index) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      setCurrentIndex(index);
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
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <motion.div
      className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-2xl bg-[var(--color-primary-darker)] animate-fade-in-up"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
    >
      <motion.div
        ref={carouselRef}
        className="flex cursor-grab items-center"
        whileTap={{ cursor: "grabbing" }}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        style={{ x }}
        onDragEnd={(event, info) => {
          const velocity = info.velocity.x;
          const currentOffset = x.get();
          const slideWidth = carouselRef.current.offsetWidth;
          let targetIndex = currentIndex;
          if (velocity < -500) {
            targetIndex = Math.min(images.length - 1, currentIndex + 1);
          } else if (velocity > 500) {
            targetIndex = Math.max(0, currentIndex - 1);
          } else {
            targetIndex = Math.round(currentOffset / -slideWidth);
            targetIndex = Math.max(0, Math.min(images.length - 1, targetIndex));
          }
          goToSlide(targetIndex);
        }}
      >
        {images.map((image, index) => {
          const { scale: slideScale, opacity: slideOpacity } = getSlideStyle(index);
          const isActive = index === currentIndex;
          return (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full h-[320px] sm:h-[400px] md:h-[500px] flex items-center justify-center relative"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                scale: slideScale,
                opacity: slideOpacity,
                borderRadius: '24px',
                boxShadow: isActive ? '0 8px 32px 0 rgba(32,201,151,0.25)' : '',
                zIndex: isActive ? 2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Overlay oscuro para mejor contraste */}
              <div className="absolute inset-0 bg-[var(--color-primary-darker)]/80 rounded-3xl"></div>
              {/* Overlay de texto animado */}
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: isActive ? 0.2 : 0 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-white drop-shadow-lg animate-fade-in-up">
                  {slideTexts[index]?.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 font-light mb-2 animate-fade-in-up">
                  {slideTexts[index]?.desc}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Botones de navegación */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-4 rounded-full shadow-xl hover:bg-[var(--color-accent)]/80 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 z-20"
        aria-label="Anterior"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-4 rounded-full shadow-xl hover:bg-[var(--color-accent)]/80 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 z-20"
        aria-label="Siguiente"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

      {/* Indicadores (dots) animados */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-4 z-20">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none ${
              index === currentIndex
                ? 'bg-[var(--color-accent)] scale-125 shadow-[var(--color-accent)]/40'
                : 'bg-[var(--color-secondary)]/40 hover:bg-[var(--color-accent)]/60'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
            animate={index === currentIndex ? { scale: 1.25 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          ></motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Carousel; 