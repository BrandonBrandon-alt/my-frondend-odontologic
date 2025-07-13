import React from 'react';
import useScrollToTop from '../../../hooks/useScrollToTop';

/**
 * Componente que hace scroll automático al inicio de la página
 * cada vez que cambia de ruta
 */
const ScrollToTopOnRouteChange = () => {
  // Usar el hook personalizado
  useScrollToTop();

  return null; // Este componente no renderiza nada visual
};

export default ScrollToTopOnRouteChange; 