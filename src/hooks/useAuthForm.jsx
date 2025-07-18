import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecaptchaV3 } from './useRecaptchaV3'; // Importamos el nuevo hook

/**
 * Hook de autenticación mejorado para reCAPTCHA v3.
 * @param {Object} initialState - Estado inicial del formulario.
 * @param {Function} authAction - La acción a ejecutar (ej. login, register).
 * @param {Object} [options] - Opciones como la ruta de redirección.
 * @returns {Object} - Estado y manejadores para el formulario.
 */
export const useAuthForm = (initialState, authAction, options = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // 1. INTEGRAMOS EL HOOK DE RECAPTCHA AQUÍ DENTRO
  const { executeRecaptcha, isScriptLoaded } = useRecaptchaV3();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (message) setMessage(null);
  };

  // 2. handleSubmit AHORA ORQUESTA TODO
  const handleSubmit = async (e, actionName) => {
    e.preventDefault();
    
    if (!isScriptLoaded) {
      setError('El servicio de seguridad (reCAPTCHA) aún no ha cargado. Inténtalo en un momento.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // 3. OBTENEMOS EL TOKEN JUSTO ANTES DE ENVIAR
      const captchaToken = await executeRecaptcha(actionName);

      // Validación explícita del token
      if (!captchaToken || typeof captchaToken !== 'string' || captchaToken.trim() === '') {
        setError('No se pudo obtener el token de seguridad. Por favor, recarga la página e inténtalo de nuevo.');
        setLoading(false);
        return;
      }

      // 4. LLAMAMOS A LA ACCIÓN DE AUTENTICACIÓN CON TODOS LOS DATOS
      const response = await authAction({ ...formData, captchaToken });
      setMessage(response.message || 'Operación exitosa.');

      // Lógica de redirección (sin cambios)
      let finalPath = options.redirectPath;
      if (!finalPath) {
        const userRole = response.user?.role;
        finalPath = '/';
        if (userRole === 'admin') finalPath = '/admin-dashboard';
        else if (userRole === 'dentist') finalPath = '/dentist-dashboard';
        else if (userRole === 'user') finalPath = '/patient-dashboard';
      }
      
      // Si la redirección es a activate-account, pasamos el email
      if (finalPath === '/activate-account') {
        setTimeout(() => {
          navigate(finalPath, { state: { email: formData.email } }); 
        }, 1500);
      } else {
        // Corrección: usa finalPath en lugar de dashboardPath
        setTimeout(() => {
          navigate(finalPath); 
        }, 1500);
      }

    } catch (err) {
      console.error('Error en la acción de autenticación:', err);
      // Mejorar el mensaje de error para casos de captcha
      let errorMessage = err.response?.data?.error || err.message || 'Ocurrió un error inesperado.';
      if (errorMessage && (errorMessage.toLowerCase().includes('captcha') || errorMessage.toLowerCase().includes('token'))) {
        errorMessage = 'Error de seguridad: ' + errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    message,
    isScriptLoaded, // Devolvemos esto para poder deshabilitar el botón si es necesario
    handleChange,
    handleSubmit,
    setError,
  };
};