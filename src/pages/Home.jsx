// src/pages/Home.jsx
import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-6">
      {/* min-h-[calc(100vh-64px)] asume que tu navbar tiene una altura de 64px para que el contenido de Home ocupe el resto de la pantalla. Ajusta según la altura real de tu navbar. */}
      <h1 className="text-5xl font-extrabold text-blue-700 mb-6">
        ¡Bienvenido a Nuestra Página de Inicio!
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl leading-relaxed">
        Aquí encontrarás toda la información que necesitas sobre nuestros servicios odontológicos.
        Explora la página y descubre cómo podemos ayudarte a lograr una sonrisa saludable y hermosa.
      </p>
      <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
        Explorar Servicios
      </button>
    </div>
  );
}

export default Home;