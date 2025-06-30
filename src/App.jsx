// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de layout y UI
import { MainLayout, ProtectedRoute } from './components';
import { LoadingSpinner } from './components/ui';

// Importa tu AuthProvider
import { AuthProvider } from './context/AuthContext';

// --- LAZY LOADING PAGES ---
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const ActivateAccount = lazy(() => import('./pages/ActivateAccount'));
const SolicitarReset = lazy(() => import('./pages/SolicitarReset'));
const CambiarPasswordReset = lazy(() => import('./pages/CambiarPasswordReset'));
const AdminDashboard = lazy(() => import('./pages/dashboards/AdminDashboard'));
const DentistDashboard = lazy(() => import('./pages/dashboards/DentistDashboard'));
const PatientDashboard = lazy(() => import('./pages/dashboards/PatientDashboard'));
const PatientProfile = lazy(() => import('./pages/patient/PatientProfile'));
const ChangePassword = lazy(() => import('./pages/patient/ChangePassword'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const ResendActivation = lazy(() => import('./pages/ResendActivation'));
const DentistProfile = lazy(() => import('./pages/dentist/DentistProfile'));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'));
const GuestAppointment = lazy(() => import('./pages/GuestAppointment'));

// Componentes simples (dummies) para rutas que aún no tienes completas
const About = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-background-light text-text-dark text-3xl font-bold">
    Página de Acerca de
  </div>
);
const Contact = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-background-light text-text-dark text-3xl font-bold">
    Página de Contacto
  </div>
);

// Componente para agrupar las rutas que usan el MainLayout
const PublicRoutesLayout = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activate-account" element={<ActivateAccount />} />
      <Route path="/solicitar-reset" element={<SolicitarReset />} />
      <Route path="/cambiar-password-reset" element={<CambiarPasswordReset />} />
      <Route path="/resend-activation" element={<ResendActivation />} />
      <Route path="/guest-appointment" element={<GuestAppointment />} />
       {/* Un catch-all para esta sección del layout */}
      <Route path="*" element={
        <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-red-100 text-red-700 text-4xl font-bold">
          404 - Página no encontrada
        </div>
      } />
    </Routes>
  </MainLayout>
);


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><LoadingSpinner /></div>}>
          <Routes>
            {/* Rutas Públicas con Layout (Navbar y Footer) */}
            <Route path="/*" element={<PublicRoutesLayout />} />

            {/* Rutas sin Layout (o con un layout diferente) */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Rutas Protegidas por Rol (sin el MainLayout general) */}
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
            <Route element={<ProtectedRoute allowedRoles={['user', 'dentist', 'admin']} />}>
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
