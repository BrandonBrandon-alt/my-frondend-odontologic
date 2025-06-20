import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services'; // Importa tu servicio de autenticación

// Crea el contexto
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Almacenará el objeto { id, name, email, role, status }
  const [loading, setLoading] = useState(true); // Para manejar el estado inicial de carga

  // Función para inicializar el estado de autenticación
  const initializeAuth = () => {
    setLoading(true);
    const currentUser = authService.getCurrentUser(); // Lee del localStorage
    if (currentUser) {
      setIsLoggedIn(true);
      setUser(currentUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setLoading(false);
  };

  // Efecto para inicializar el estado y escuchar cambios en localStorage
  useEffect(() => {
    initializeAuth();

    // Escucha el evento 'storage' para cambios en OTRAS PESTAÑAS/VENTANAS
    const handleStorageChange = () => {
      console.log('AuthContext: localStorage changed in another tab. Re-initializing auth state.');
      initializeAuth();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Se ejecuta una sola vez al montar

  // Función para manejar el login (llama a authService y actualiza el estado del contexto)
  const loginContext = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials); // Llama al servicio
      // El servicio ya guarda en localStorage. Ahora, actualiza el estado del contexto.
      setIsLoggedIn(true);
      setUser(authService.getCurrentUser()); // Vuelve a leer del localStorage para asegurar consistencia
      return response; // Devuelve la respuesta para que el Login.jsx la use para el mensaje/redirección
    } catch (error) {
      console.error('AuthContext: Error during login:', error);
      setIsLoggedIn(false);
      setUser(null);
      throw error; // Propaga el error para que el componente Login lo maneje
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el logout (llama a authService y actualiza el estado del contexto)
  const logoutContext = async () => {
    setLoading(true);
    try {
      await authService.logout(); // Llama al servicio
      // El servicio ya limpia localStorage. Ahora, actualiza el estado del contexto.
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('AuthContext: Error during logout:', error);
      // Aún si hay error en el backend, limpia el estado local para consistencia
      setIsLoggedIn(false);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // --- NUEVA FUNCIÓN: `updateUserContext` ---
  // Permite que otros componentes actualicen el objeto 'user' en el contexto
  const updateUserContext = (updatedUserData) => {
    // Actualiza el estado local 'user' en el contexto, fusionando la data existente con la nueva
    setUser(prevUser => ({ ...prevUser, ...updatedUserData }));

    // También actualiza localStorage para mantener la consistencia y para la sincronización entre pestañas
    const currentUserInStorage = authService.getCurrentUser();
    if (currentUserInStorage) {
      localStorage.setItem('currentUser', JSON.stringify({ ...currentUserInStorage, ...updatedUserData }));
    }
  };

  // Valor que será proporcionado a los componentes consumidores
  const authContextValue = {
    isLoggedIn,
    user, // Contiene id, name, email, role, status
    loading,
    login: loginContext, // Proporciona la función de login
    logout: logoutContext, // Proporciona la función de logout
    updateUserContext, // <-- ¡Añade esta nueva función aquí!
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};