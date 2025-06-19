// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de página principales
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ActivateAccount from './pages/ActivateAccount';
import SolicitarReset from './pages/SolicitarReset';
import CambiarPasswordReset from './pages/CambiarPasswordReset';

// Importa tu AuthProvider y el ProtectedRoute
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layouts/ProtectedRoute';

// Importa las páginas de Dashboard específicas por rol
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DentistDashboard from './pages/dashboards/DentistDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';

// Importa la página de Unauthorized
import Unauthorized from './pages/Unauthorized'; // <-- ¡IMPORTANTE!

// Componentes simples (dummies) para rutas que aún no tienes completas
const About = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-background-light text-text-dark text-3xl font-bold">
    Página de Acerca de
  </div>
);
const Contact = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-background-light text-text-dark text-3xl font-bold">
    Página de Contacto
  </div>
);

// Asegúrate de que tengas tus componentes de dashboard reales en estas rutas:
// src/pages/dashboards/AdminDashboard.jsx
// src/pages/dashboards/DentistDashboard.jsx
// src/pages/dashboards/PatientDashboard.jsx
// Si aún no los tienes, puedes poner un dummy temporalmente, pero la idea es que sean específicos.

function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider envuelve toda la aplicación para que todos los componentes hijos
          tengan acceso al estado de autenticación. */}
      <AuthProvider>
        <Navbar />

        {/* El `main` con `flex-grow` es una buena práctica para diseños "sticky footer" */}
        <main className="flex-grow">
          <Routes>
            {/* Rutas Públicas (accesibles por todos, logeados o no) */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate-account" element={<ActivateAccount />} />
            <Route path="/unauthorized" element={<Unauthorized />} /> {/* <-- Ruta para acceso denegado */}
            <Route path="/solicitar-reset" element={<SolicitarReset />} />
            <Route path="/cambiar-password-reset" element={<CambiarPasswordReset />} />

            {/*
              Rutas Protegidas por Rol
              La ruta padre `Route element={<ProtectedRoute allowedRoles={...} />}`
              actúa como un "guardia" para todas sus rutas anidadas.
            */}

            {/* Dashboard del Paciente (rol: 'user', también accesible por 'admin' si es deseable) */}
            <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/dashboard" element={<PatientDashboard />} /> {/* Ruta general para dashboard */}
            </Route>

            {/* Dashboard del Dentista (rol: 'dentist', también accesible por 'admin') */}
            <Route element={<ProtectedRoute allowedRoles={['dentist', 'admin']} />}>
              <Route path="/dentist-dashboard" element={<DentistDashboard />} />
            </Route>

            {/* Dashboard del Administrador (rol: 'admin' - ¡el más restrictivo!) */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Ruta Catch-all para 404 Not Found */}
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-red-100 text-red-700 text-4xl font-bold">
                404 - Página no encontrada
              </div>
            } />
          </Routes>
        </main>

        {/* Si tienes un Footer, también puede ir aquí, dentro del AuthProvider */}
        {/* <Footer /> */}

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;