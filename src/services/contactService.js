import axiosInstance from '../utils/axiosInstance';

const contactService = {
  /**
   * Envía un mensaje de contacto
   * @param {Object} messageData - Datos del mensaje
   * @param {string} messageData.name - Nombre completo
   * @param {string} messageData.email - Email
   * @param {string} [messageData.phone] - Teléfono (opcional)
   * @param {string} messageData.subject - Asunto del mensaje
   * @param {string} messageData.message - Contenido del mensaje
   * @returns {Promise<Object>} Respuesta del servidor
   */
  sendMessage: async (messageData) => {
    try {
      const response = await axiosInstance.post('/contact/send-message', messageData);
      return response.data;
    } catch (error) {
      // Manejar errores específicos
      if (error.response) {
        // Error del servidor (400, 429, 500, etc.)
        throw new Error(error.response.data.message || 'Error al enviar el mensaje');
      } else if (error.request) {
        // Error de red
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      } else {
        // Error general
        throw new Error('Error inesperado al enviar el mensaje');
      }
    }
  }
};

export default contactService; 