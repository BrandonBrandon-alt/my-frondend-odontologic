import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Asegúrate de que esta sea la URL correcta de tu backend

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token de acceso a las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // O sessionStorage, dependiendo de tu manejo de tokens
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar la expiración del token y refrescarlo (opcional pero recomendado)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Si el error es 401 (Unauthorized) y no es una solicitud de refresh token ya intentada
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marca la solicitud para no reintentar infinitamente

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Llama al endpoint de refresh token de tu backend
          const response = await axios.post(`${API_BASE_URL}/token`, { refreshToken });
          const newAccessToken = response.data.token;

          localStorage.setItem('accessToken', newAccessToken); // Guarda el nuevo token

          // Re-intenta la solicitud original con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('No se pudo refrescar el token:', refreshError);
          // Si el refresh token falla, redirigir al login o limpiar tokens
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          // Puedes disparar un evento o un callback para redirigir al login
          window.location.href = '/login'; // Ejemplo: redirigir
          return Promise.reject(refreshError);
        }
      } else {
        // No hay refresh token, redirigir al login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;