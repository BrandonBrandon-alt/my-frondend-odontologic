import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';
const AUTH_BASE_PATH = ''; // Si tus rutas de autenticación no tienen un prefijo extra después de /api

export const authService = {
  // ======================= REGISTRO =======================
  register: async (userData) => {
    try {
      const response = await axiosInstance.post(`${AUTH_BASE_PATH}/registro`, userData);
      return response.data;
    } catch (error) {
      console.error('Error en authService.register:', error.response?.data || error.message);
      throw error; // Relanza el error para que el componente lo maneje
    }
  },

  // ======================= LOGIN =======================
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(`${AUTH_BASE_PATH}/login`, credentials);
      const { token, refreshToken, user } = response.data; // user es lo que viene de tu backend

      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Decodifica el token para obtener el payload (id, email, role, status)
      const decodedUser = jwtDecode(token);

      // Opcional: Puedes guardar el objeto de usuario completo del backend o solo los campos decodificados.
      // Si el backend ya envía un objeto 'user' limpio, podrías usar ese directamente.
      // Si no, 'decodedUser' es lo que necesitas para role y quizás email/id.
      // Para el nombre, tu backend envía `user: { ...user.toJSON(), password: undefined }`.
      // Si el nombre del usuario NO está en el payload del token (que es común),
      // lo obtendremos del objeto `user` devuelto por el backend.
      const userInfo = {
        id: decodedUser.id,
        name: user.name, // Obtener el nombre del objeto 'user' del backend
        email: decodedUser.email,
        role: decodedUser.role,
        status: decodedUser.status,
      };

      localStorage.setItem('currentUser', JSON.stringify(userInfo)); // Guarda la info del usuario

      return { ...response.data, user: userInfo }; // Devuelve la respuesta original más la info de usuario decodificada
    } catch (error) {
      console.error('Error en authService.login:', error.response?.data || error.message);
      throw error;
    }
  },


  // ======================= ACTIVACIÓN DE CUENTA =======================
  activateAccount: async (email, code) => {
    try {
      const response = await axiosInstance.post(`${AUTH_BASE_PATH}/activar`, { email, code });
      return response.data;
    } catch (error) {
      console.error('Error en authService.activateAccount:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= REENVÍO DE CÓDIGO DE ACTIVACIÓN =======================
  resendActivationCode: async (email) => {
    try {
      const response = await axiosInstance.post(`${AUTH_BASE_PATH}/reenviar-activacion`, { email });
      return response.data;
    } catch (error) {
      console.error('Error en authService.resendActivationCode:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= SOLICITUD DE CÓDIGO DE RECUPERACIÓN =======================
  requestPasswordReset: async (email) => {
    try {
      const response = await axiosInstance.post(`${AUTH_BASE_PATH}/solicitar-reset`, { email });
      return response.data;
    } catch (error) {
      console.error('Error en authService.requestPasswordReset:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= REENVÍO DE CÓDIGO DE RECUPERACIÓN =======================
  resendPasswordResetCode: async (email) => {
    try {
      const response = await axiosInstance.post(`${AUTH_BASE_PATH}/reenviar-reset`, { email });
      return response.data;
    } catch (error) {
      console.error('Error en authService.resendPasswordResetCode:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= CAMBIO DE CONTRASEÑA POR CÓDIGO DE RECUPERACIÓN =======================
  resetPassword: async (code, newPassword) => {
    try {
      const response = await axiosInstance.post(`${AUTH_BASE_PATH}/cambiar-password-reset`, { password_reset_code: code, newPassword });
      return response.data;
    } catch (error) {
      console.error('Error en authService.resetPassword:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= VERIFICAR CÓDIGO DE RECUPERACIÓN =======================
  verifyResetCode: async (email, code) => {
    try {
      const response = await axiosInstance.post(`${AUTH_BASE_PATH}/verificar-reset`, { email, code });
      return response.data;
    } catch (error) {
      console.error('Error en authService.verifyResetCode:', error.response?.data || error.message);
      throw error;
    }
  },

  // ======================= LOGOUT =======================
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await axiosInstance.post(`${AUTH_BASE_PATH}/logout`, { refreshToken });
      }
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser'); // ¡Borra también la información del usuario!
      return { message: "Sesión cerrada exitosamente" };
    } catch (error) {
      console.error('Error en authService.logout:', error.response?.data || error.message);
      // Aunque haya un error en el backend, es crucial limpiar los tokens del frontend
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser'); // ¡Borra también la información del usuario!
      throw error;
    }
  },

  // Función auxiliar para obtener el usuario actual del localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

};