// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Importa tus componentes de página principales
import { Navbar } from './components';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ActivateAccount from './pages/ActivateAccount';
import SolicitarReset from './pages/SolicitarReset';
import CambiarPasswordReset from './pages/CambiarPasswordReset';
import { Footer } from './components/ui';

// Importa tu AuthProvider y el ProtectedRoute
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components';

// Importa las páginas de Dashboard específicas por rol
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DentistDashboard from './pages/dashboards/DentistDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import PatientProfile from './pages/patient/PatientProfile';
import ChangePassword from './pages/patient/ChangePassword';

// Importa la página de Unauthorized
import Unauthorized from './pages/Unauthorized';
import ResendActivation from './pages/ResendActivation';

// Importa los nuevos componentes DentistProfile y AdminProfile
import DentistProfile from './pages/dentist/DentistProfile';
import AdminProfile from './pages/admin/AdminProfile';

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

function AppRoutes() {
  const location = useLocation();
  const privateRoutes = [
    '/admin-dashboard',
    '/dentist-dashboard',
    '/patient-dashboard',
    '/dashboard',
    '/patient-profile',
    '/change-password',
  ];
  const hideFooter = privateRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate-account" element={<ActivateAccount />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/solicitar-reset" element={<SolicitarReset />} />
          <Route path="/cambiar-password-reset" element={<CambiarPasswordReset />} />
          <Route path="/resend-activation" element={<ResendActivation />} />

          {/* Rutas Protegidas por Rol */}
          <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/patient-profile" element={<PatientProfile />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['dentist', 'admin']} />}>
            <Route path="/dentist-dashboard" element={<DentistDashboard />} />
            <Route path="/dentist-profile" element={<DentistProfile />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
          </Route>
          {/* Ruta de cambio de contraseña accesible para todos los roles */}
          <Route element={<ProtectedRoute allowedRoles={['user', 'dentist', 'admin']} />}>
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/* Ruta Catch-all para 404 Not Found */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-red-100 text-red-700 text-4xl font-bold">
              404 - Página no encontrada
            </div>
          } />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdW4mcrAAAAAC9sk9VBvPegcralRA6ur9jJFvpx">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;