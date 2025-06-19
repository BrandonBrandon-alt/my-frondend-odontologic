// src/components/layouts/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importa el hook useAuth

function ProtectedRoute({ allowedRoles }) {
  const { isLoggedIn, user, loading } = useAuth(); // Obtén el estado del contexto

  // 1. Manejo del estado de carga inicial del contexto de autenticación
  // Mientras se inicializa el contexto (leyendo de localStorage, etc.),
  // no sabemos si el usuario está logeado o qué rol tiene.
  if (loading) {
    // Puedes mostrar un spinner o un componente de carga aquí
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-background-light text-text-dark text-xl">
        Cargando autenticación...
      </div>
    );
  }

  // 2. Si el usuario no está logeado, redirigir a la página de login
  // Esto cubre el caso de que el token expiró o fue eliminado.
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // 'replace' evita añadir la ruta actual al historial
  }

  // 3. Si el usuario está logeado, pero su rol no está permitido para esta ruta
  // Asegúrate de que `user` no sea null antes de acceder a `user.role`
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    console.warn(`Acceso denegado para el rol '${user.role}' a la ruta protegida. Redirigiendo a /unauthorized.`);
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Si todo está bien (logeado y con rol permitido), renderiza el contenido de la ruta anidada
  return <Outlet />;
}

export default ProtectedRoute;