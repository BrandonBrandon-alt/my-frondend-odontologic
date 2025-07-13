import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../context/ThemeContext';
import RippleEffect from '../RippleEffect';
import Tooltip from '../Tooltip';

/**
 * Componente toggle para cambiar entre modo oscuro y claro
 */
const ThemeToggle = ({ className = "", size = "md" }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Configuración de tamaños
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95, rotate: -5 }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1, y: 0 },
    animate: { 
      rotate: isDarkMode ? 180 : 0, 
      scale: 1,
      y: isDarkMode ? -2 : 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    }
  };

  return (
    <Tooltip 
      content={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      position="bottom"
      delay={300}
    >
      <RippleEffect>
        <motion.button
          onClick={toggleTheme}
          className={`
            ${sizeClasses[size]}
            ${className}
            relative rounded-xl bg-white dark:bg-white
            border-2 border-gray-200 dark:border-gray-300
            shadow-lg hover:shadow-xl
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
            backdrop-blur-sm
            overflow-hidden
          `}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {/* Efecto de brillo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent" />
          
          {/* Icono principal */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            {isDarkMode ? (
              <SunIcon className={`${iconSizes[size]} text-amber-600 drop-shadow-sm`} />
            ) : (
              <MoonIcon className={`${iconSizes[size]} text-slate-700 drop-shadow-sm`} />
            )}
          </motion.div>
          
          {/* Efecto de partículas */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-1 left-1 w-1 h-1 bg-amber-400 rounded-full animate-ping" />
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-slate-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.button>
      </RippleEffect>
    </Tooltip>
  );
};

export default ThemeToggle; 