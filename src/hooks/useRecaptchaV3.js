import { useState, useEffect, useCallback } from 'react';

const SCRIPT_ID = 'recaptcha-v3-script';

export const useRecaptchaV3 = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Este useEffect se encarga de gestionar el ciclo de vida del script
  useEffect(() => {
    // Comprueba si el script ya fue inyectado por otro componente para no duplicarlo
    if (document.getElementById(SCRIPT_ID)) {
      setIsScriptLoaded(true);
      return;
    }

    // Crea el elemento script
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    // La función que se ejecutará solo cuando el script haya cargado y ejecutado con éxito
    script.onload = () => {
      setIsScriptLoaded(true);
    };

    // Manejo de errores en caso de que el script no pueda cargar
    script.onerror = () => {
      console.error('No se pudo cargar el script de reCAPTCHA.');
      setIsScriptLoaded(false);
    };

    // Añade el script al cuerpo del documento
    document.body.appendChild(script);

    // Función de limpieza: se ejecuta cuando el componente que usa el hook se desmonta
    return () => {
      const scriptElement = document.getElementById(SCRIPT_ID);
      if (scriptElement) {
        // En algunas SPAs, es buena práctica limpiar para evitar efectos secundarios
        // document.body.removeChild(scriptElement); 
      }
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const executeRecaptcha = useCallback(async (action) => {
    if (!isScriptLoaded || !window.grecaptcha) {
      console.error('reCAPTCHA script no está listo o no ha cargado.');
      throw new Error('reCAPTCHA no está listo.');
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        try {
          window.grecaptcha.execute(
            import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY, 
            { action }
          ).then(resolve).catch(reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }, [isScriptLoaded]);

  return { executeRecaptcha, isScriptLoaded };
};