// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de página
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register'; // <-- Importa el nuevo componente Register

// Puedes crear componentes de página simples para las otras rutas
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
// Componente dummy para login, que necesitarás crear más adelante
const Login = () => (
  <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center text-text-dark">
      <h2 className="text-3xl font-bold mb-4">Página de Inicio de Sesión</h2>
      <p>Aquí irá tu formulario de inicio de sesión.</p>
      <Link to="/register" className="font-medium text-primary hover:text-secondary mt-4 block">
        ¿No tienes cuenta? Regístrate
      </Link>
    </div>
  </div>
);
// Componente dummy para dashboard
const Dashboard = () => (
  <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center text-text-dark">
      <h2 className="text-3xl font-bold mb-4">Bienvenido a tu Dashboard</h2>
      <p>Contenido del perfil de usuario.</p>
    </div>
  </div>
);


function App() {
  return (
    <BrowserRouter>
      {/* El Navbar se renderiza fuera de Routes, para que esté siempre presente */}
      <Navbar />

      <Routes>
        {/* Define tus rutas aquí */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} /> {/* <-- Nueva ruta para el registro */}
        <Route path="/login" element={<Login />} />       {/* <-- Ruta para login (dummy por ahora) */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* <-- Ruta para dashboard (dummy por ahora) */}

        {/* Ruta para 404 Not Found */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-red-100 text-red-700 text-4xl font-bold">
            404 - Página no encontrada
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
