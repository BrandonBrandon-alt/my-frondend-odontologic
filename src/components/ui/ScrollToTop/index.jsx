import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import RippleEffect from '../RippleEffect';
import Tooltip from '../Tooltip';

/**
 * Componente ScrollToTop que aparece cuando el usuario hace scroll
 * y permite volver al inicio de la página
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detectar cuando mostrar el botón (después de 300px de scroll)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Función para hacer scroll al inicio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animaciones
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Tooltip content="Volver al inicio de la página" position="left" delay={300}>
          <RippleEffect>
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-20 right-6 z-50 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-md border border-white/20"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              aria-label="Volver al inicio"
            >
              <ChevronUpIcon className="h-6 w-6" />
            </motion.button>
          </RippleEffect>
        </Tooltip>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 