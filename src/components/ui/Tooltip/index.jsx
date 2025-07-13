import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente Tooltip que muestra información contextual
 */
const Tooltip = ({ 
  children, 
  content, 
  position = "top", 
  delay = 500,
  className = "",
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let x = 0;
    let y = 0;

    switch (position) {
      case "top":
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case "bottom":
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.bottom + 8;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      case "right":
        x = triggerRect.right + 8;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      default:
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top - tooltipRect.height - 8;
    }

    // Asegurar que el tooltip no se salga de la pantalla
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (x < 8) x = 8;
    if (x + tooltipRect.width > viewportWidth - 8) {
      x = viewportWidth - tooltipRect.width - 8;
    }
    if (y < 8) y = 8;
    if (y + tooltipRect.height > viewportHeight - 8) {
      y = viewportHeight - tooltipRect.height - 8;
    }

    setTooltipPosition({ x, y });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible]);

  const tooltipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: position === "top" ? 10 : position === "bottom" ? -10 : 0,
      x: position === "left" ? 10 : position === "right" ? -10 : 0,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2
      }
    },
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className="fixed z-[70] bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg max-w-xs"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {content}
            {/* Flecha del tooltip */}
            <div
              className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                position === "top" ? "top-full left-1/2 -translate-x-1/2" :
                position === "bottom" ? "bottom-full left-1/2 -translate-x-1/2" :
                position === "left" ? "left-full top-1/2 -translate-y-1/2" :
                "right-full top-1/2 -translate-y-1/2"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip; 