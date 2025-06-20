import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { LoadingSpinner } from '../../ui';

function ProtectedRoute({ allowedRoles }) {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-background-light text-text-dark text-xl">
        <LoadingSpinner size="lg" />
        <span className="ml-4">Cargando autenticación...</span>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    console.warn(`Acceso denegado para el rol '${user.role}' a la ruta protegida. Redirigiendo a /unauthorized.`);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute; 