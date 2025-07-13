import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Importa tus componentes de layout y UI
import { MainLayout, ProtectedRoute } from './components';
import { LoadingSpinner } from './components/ui';

// Importa tus providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// --- LAZY LOADING PAGES (sin cambios) ---
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
const PatientAppointment = lazy(() => import('./pages/PatientAppointment'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));

// Componente para scroll automático
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      console.log('App ScrollToTop: Navegando a', pathname);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

// Componentes simples (dummies)
const NotFound = () => <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-red-100 text-red-700 text-4xl font-bold">404 - Página no encontrada</div>;

// Elimino el componente temporal PatientDashboard


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ScrollToTop />
          {/* 1. MainLayout ahora envuelve TODAS las rutas, asegurando que Navbar y Footer estén siempre presentes. */}
          <MainLayout>
            <Suspense fallback={<div className="flex items-center justify-center h-screen"><LoadingSpinner /></div>}>
              {/* 2. Usamos un solo componente <Routes> para toda la aplicación. */}
              <Routes>
              {/* --- RUTAS PÚBLICAS --- */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/activate-account" element={<ActivateAccount />} />
              <Route path="/solicitar-reset" element={<SolicitarReset />} />
              <Route path="/cambiar-password-reset" element={<CambiarPasswordReset />} />
              <Route path="/resend-activation" element={<ResendActivation />} />
              <Route path="/guest-appointment" element={<GuestAppointment />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* --- RUTAS PROTEGIDAS (Dashboards y Perfiles) --- */}
              {/* Estas rutas ahora también estarán dentro de MainLayout */}
              
              <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/dashboard" element={<PatientDashboard />} /> {/* Alias común */}
                <Route path="/patient-profile" element={<PatientProfile />} />
                <Route path="/patient-appointment" element={<PatientAppointment />} />
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

              {/* 3. La ruta "catch-all" para 404 va al final para atrapar cualquier URL no coincidente. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;