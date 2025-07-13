import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente ScrollProgress que muestra el progreso del scroll
 * en una barra en la parte superior de la página
 */
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  // Determinar el color basado en el progreso
  const getProgressColor = (progress) => {
    if (progress < 25) return 'from-green-400 to-green-500';
    if (progress < 50) return 'from-blue-400 to-blue-500';
    if (progress < 75) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[60]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: scrollProgress > 0 ? 1 : 0, y: scrollProgress > 0 ? 0 : -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`h-full bg-gradient-to-r ${getProgressColor(scrollProgress)} transition-all duration-300 ease-out`}
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default ScrollProgress; 