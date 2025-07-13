import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook personalizado para detectar la dirección del scroll
 * y controlar la visibilidad del navbar siguiendo el patrón profesional:
 * - Ocultar al hacer scroll hacia abajo
 * - Mostrar inmediatamente al hacer scroll hacia arriba
 * - Siempre visible en la parte superior
 */
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);
  const currentScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    currentScrollY.current = window.scrollY;
    const isAtTop = currentScrollY.current < 100;
    
    // Siempre mostrar en la parte superior
    if (isAtTop) {
      setIsVisible(true);
      setScrollDirection('up');
      prevScrollY.current = currentScrollY.current;
      return;
    }
    
    // Determinar la dirección del scroll
    if (currentScrollY.current > prevScrollY.current) {
      // Scroll hacia abajo - ocultar navbar
      setScrollDirection('down');
      setIsVisible(false);
    } else if (currentScrollY.current < prevScrollY.current) {
      // Scroll hacia arriba - mostrar navbar inmediatamente
      setScrollDirection('up');
      setIsVisible(true);
    }
    
    prevScrollY.current = currentScrollY.current;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    scrollDirection,
    isVisible
  };
};

export default useScrollDirection; 