import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook personalizado para hacer scroll al inicio de la página
 * cada vez que cambia la ruta
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Función para hacer scroll al inicio
    const scrollToTop = () => {
      // Intentar con scrollTo primero
      if (window.scrollTo) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Fallback para navegadores más antiguos
        window.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      scrollToTop();
      console.log('useScrollToTop: Navegando a', pathname);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  // También exportar la función para uso manual
  const manualScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return { manualScrollToTop };
};

export default useScrollToTop; 