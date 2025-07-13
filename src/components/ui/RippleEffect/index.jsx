import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente RippleEffect que agrega un efecto de onda al hacer clic
 */
const RippleEffect = ({ children, className = "", ...props }) => {
  const [ripples, setRipples] = useState([]);
  const rippleRef = useRef(null);

  const createRipple = (event) => {
    const rect = rippleRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const id = Date.now();

    const newRipple = {
      id,
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remover el ripple después de la animación
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);
  };

  return (
    <div
      ref={rippleRef}
      className={`relative overflow-hidden ${className}`}
      onClick={createRipple}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            initial={{
              x: ripple.x,
              y: ripple.y,
              width: 0,
              height: 0,
              opacity: 1,
            }}
            animate={{
              width: ripple.size,
              height: ripple.size,
              x: ripple.x - ripple.size / 2,
              y: ripple.y - ripple.size / 2,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RippleEffect; 