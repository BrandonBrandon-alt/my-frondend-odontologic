// src/pages/dashboards/PatientDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services';

function PatientDashboard() {
  const currentUser = authService.getCurrentUser();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-green-800 mb-6 animate-fade-in-down">
          Mi Panel de Paciente
        </h1>
        <p className="text-xl text-green-700 mb-10 animate-fade-in-up">
          ¡Hola, <span className="font-semibold">{currentUser?.name || 'Paciente'}</span>!
          Aquí puedes gestionar tus citas y ver tu información.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta de Próximas Citas */}
          <Link
            to="/patient/my-appointments"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"> appointments 📅</span>
            <h2 className="text-2xl font-bold text-green-700 mb-2 group-hover:text-secondary transition-colors duration-300">
              Mis Citas
            </h2>
            <p className="text-text-dark text-center">
              Consulta, agenda o cancela tus citas.
            </p>
          </Link>

          {/* Tarjeta de Historial Médico */}
          <Link
            to="/patient/medical-history"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📚</span>
            <h2 className="text-2xl font-bold text-green-700 mb-2 group-hover:text-secondary transition-colors duration-300">
              Mi Historial Médico
            </h2>
            <p className="text-text-dark text-center">
              Accede a tu historial de tratamientos y diagnósticos.
            </p>
          </Link>

          {/* Tarjeta de Pagos/Facturas */}
          <Link
            to="/patient/billing"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">💳</span>
            <h2 className="text-2xl font-bold text-green-700 mb-2 group-hover:text-secondary transition-colors duration-300">
              Mis Facturas
            </h2>
            <p className="text-text-dark text-center">
              Revisa tus estados de cuenta y pagos pendientes.
            </p>
          </Link>

          {/* Tarjeta de Información Personal */}
          <Link
            to="/patient/profile"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
          >
            <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">👤</span>
            <h2 className="text-2xl font-bold text-green-700 mb-2 group-hover:text-secondary transition-colors duration-300">
              Mi Perfil
            </h2>
            <p className="text-text-dark text-center">
              Actualiza tu información de contacto y preferencias.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;