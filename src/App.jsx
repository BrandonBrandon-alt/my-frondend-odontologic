// src/App.jsx
import React from 'react'; // React ya no es necesario importarlo explícitamente en React 17+ y Babel 7.9+, pero es buena práctica.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Puedes crear componentes de página simples para las otras rutas
const About = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-green-100 text-green-800 text-3xl font-bold">
    Página de Acerca de
  </div>
);
const Contact = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-purple-100 text-purple-800 text-3xl font-bold">
    Página de Contacto
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
        {/* Puedes añadir una ruta para 404 Not Found si quieres */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-red-100 text-red-800 text-4xl font-bold">
            404 - Página no encontrada
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;