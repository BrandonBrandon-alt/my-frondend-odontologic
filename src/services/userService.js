// src/services/userService.js
import axiosInstance from '../utils/axiosInstance'; // Importa la instancia de Axios configurada

// CAMBIO AQUÍ: Ahora el prefijo es 'user'
const USER_BASE_PATH = 'user'; // <--- ¡CAMBIADO A 'user'!

export const userService = {
  // ======================= OBTENER PERFIL DE USUARIO =======================
  getProfile: async () => {
    try {
      // Con USER_BASE_PATH = 'user', esto ahora se resolverá a '/api/user/perfil'
      const response = await axiosInstance.get(`${USER_BASE_PATH}/perfil`);
      return response.data.user;
    } catch (error) {
      console.error('Error en userService.getProfile:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= ACTUALIZAR PERFIL =======================
  updateProfile: async (userData) => {
    try {
      const response = await axiosInstance.patch(`${USER_BASE_PATH}/perfil`, userData);
      return response.data.user;
    } catch (error) {
      console.error('Error en userService.updateProfile:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= CAMBIO DE CONTRASEÑA (AUTENTICADO) =======================
  changePassword: async ({ currentPassword, newPassword }) => { // <-- ¡CAMBIO CLAVE AQUÍ! Ahora espera ambos campos
    try {
      // Envía un objeto que contiene ambas propiedades al backend
      const response = await axiosInstance.post(`${USER_BASE_PATH}/cambiar-password`, { currentPassword, newPassword });
      return response.data;
    } catch (error) {
      console.error('Error en userService.changePassword:', error.response?.data || error.message);
      throw error;
    }
  },


};