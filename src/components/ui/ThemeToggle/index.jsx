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
  const { isDark, toggleTheme } = useTheme();

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
      rotate: isDark ? 180 : 0, 
      scale: 1,
      y: isDark ? -2 : 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    }
  };

  return (
    <Tooltip 
      content={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      position="bottom"
      delay={300}
    >
      <RippleEffect>
        <motion.button
          onClick={toggleTheme}
          className={`
            ${sizeClasses[size]}
            ${className}
            relative rounded-full
            bg-[linear-gradient(135deg,_var(--color-primary)_0%,_var(--color-accent)_100%)]
            dark:bg-[linear-gradient(135deg,_var(--color-background-dark)_60%,_var(--color-accent)_100%)]
            border-2 border-[var(--border-primary)] dark:border-[var(--border-primary)]
            shadow-lg hover:shadow-xl
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2
            overflow-hidden
          `}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {/* Fondo animado con branding */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isDark ? 0.95 : 0.8 }}
            transition={{ duration: 0.5 }}
            style={{ pointerEvents: 'none', background: isDark
              ? 'linear-gradient(135deg, var(--color-background-dark) 60%, var(--color-accent) 100%)'
              : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)'
            }}
          />
          {/* Icono principal con transición */}
          <motion.div
            className="relative flex items-center justify-center z-10"
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: isDark ? 180 : 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {!isDark ? (
                <span className="relative flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-yellow-300/40 blur-[2px] animate-pulse" style={{ zIndex: 0 }} />
                  <SunIcon className={`${iconSizes[size]} drop-shadow-lg`} style={{ color: '#FFD600', zIndex: 1 }} />
                </span>
              ) : (
                <MoonIcon className={`${iconSizes[size]} drop-shadow-lg`} style={{ color: 'var(--color-primary)' }} />
              )}
            </motion.div>
          </motion.div>
          {/* Efecto de destello al cambiar, usando branding */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDark ? 0.18 : 0.13 }}
            transition={{ duration: 0.4 }}
            style={{ background: isDark
              ? 'radial-gradient(circle at 70% 30%, var(--color-accent)33 0%, transparent 70%)'
              : 'radial-gradient(circle at 30% 70%, var(--color-accent)33 0%, transparent 70%)'
            }}
          />
        </motion.button>
      </RippleEffect>
    </Tooltip>
  );
};

export default ThemeToggle; 