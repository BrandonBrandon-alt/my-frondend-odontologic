// src/pages/dashboards/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services';

function AdminDashboard() {
  const currentUser = authService.getCurrentUser();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-primary mb-6 animate-fade-in-down">
          Panel de Administración
        </h1>
        <p className="text-xl text-text-dark mb-10 animate-fade-in-up">
          Bienvenido, <span className="font-semibold">{currentUser?.name || 'Administrador'}</span>.
          Aquí puedes gestionar todos los aspectos de la clínica.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta de Gestión de Usuarios */}
          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</span>
            <h2 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
              Gestión de Usuarios
            </h2>
            <p className="text-text-dark text-center">
              Administra pacientes, dentistas y otros roles.
            </p>
          </Link>

          {/* Tarjeta de Gestión de Dentistas */}
          <Link
            to="/admin/dentists"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🦷👩‍⚕️</span>
            <h2 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
              Gestión de Dentistas
            </h2>
            <p className="text-text-dark text-center">
              Administra la información y disponibilidad de los profesionales.
            </p>
          </Link>

          {/* Tarjeta de Gestión de Citas */}
          <Link
            to="/admin/appointments"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📅</span>
            <h2 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
              Gestión de Citas
            </h2>
            <p className="text-text-dark text-center">
              Supervisa y modifica todas las citas agendadas.
            </p>
          </Link>

          {/* Tarjeta de Reportes y Estadísticas */}
          <Link
            to="/admin/reports"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</span>
            <h2 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
              Reportes y Estadísticas
            </h2>
            <p className="text-text-dark text-center">
              Accede a métricas y análisis de la clínica.
            </p>
          </Link>

          {/* Tarjeta de Configuración del Sistema */}
          <Link
            to="/admin/settings"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">⚙️</span>
            <h2 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
              Configuración
            </h2>
            <p className="text-text-dark text-center">
              Ajusta los parámetros generales del sistema.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;