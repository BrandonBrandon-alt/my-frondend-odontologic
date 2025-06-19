import axiosInstance from '../utils/axiosInstance'; // Importa la instancia de Axios configurada
import { jwtDecode } from 'jwt-decode';

const USER_BASE_PATH = ''; // Si tus rutas de usuario no tienen un prefijo extra después de /api

export const userService = {
  // ======================= OBTENER PERFIL DE USUARIO =======================
  getProfile: async () => {
    try {
      const response = await axiosInstance.get(`${USER_BASE_PATH}/perfil`);
      return response.data.user; // El backend devuelve { user: {...} }
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
  changePassword: async (newPassword) => {
    try {
      const response = await axiosInstance.post(`${USER_BASE_PATH}/cambiar-password`, { newPassword });
      return response.data;
    } catch (error) {
      console.error('Error en userService.changePassword:', error.response?.data || error.message);
      throw error;
    }
  },
};