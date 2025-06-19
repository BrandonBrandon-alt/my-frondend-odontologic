// src/pages/dashboards/DentistDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services';

function DentistDashboard() {
  const currentUser = authService.getCurrentUser();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-6 animate-fade-in-down">
          Panel del Odontólogo
        </h1>
        <p className="text-xl text-blue-700 mb-10 animate-fade-in-up">
          Bienvenido(a), <span className="font-semibold">{currentUser?.name || 'Dr./Dra.'}</span>.
          Aquí tienes tus herramientas de trabajo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta de Agenda de Citas */}
          <Link
            to="/dentist/my-appointments"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🗓️</span>
            <h2 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-accent transition-colors duration-300">
              Mi Agenda de Citas
            </h2>
            <p className="text-text-dark text-center">
              Gestiona tus próximas citas y disponibilidad.
            </p>
          </Link>

          {/* Tarjeta de Historial de Pacientes */}
          <Link
            to="/dentist/patients"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📋</span>
            <h2 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-accent transition-colors duration-300">
              Historial de Pacientes
            </h2>
            <p className="text-text-dark text-center">
              Consulta el historial clínico y de tratamientos de tus pacientes.
            </p>
          </Link>

          {/* Tarjeta de Gestión de Disponibilidad */}
          <Link
            to="/dentist/availability"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">⏰</span>
            <h2 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-accent transition-colors duration-300">
              Mi Disponibilidad
            </h2>
            <p className="text-text-dark text-center">
              Define tus horarios de atención y días libres.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DentistDashboard;