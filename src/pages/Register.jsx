// src/pages/Register.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir

function Register() {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    email: '',
    password: '',
    phone: '',
  });

  // Estado para mensajes de carga, éxito y error
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook para la navegación programática

  // Manejador de cambios para los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpia mensajes de error/éxito al empezar a escribir
    if (message || error) {
      setMessage('');
      setError('');
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/registro', { // Asegúrate de que esta URL coincida con la de tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) { // Si la respuesta es exitosa (código 2xx)
        setMessage(data.message || 'Registro exitoso. Revisa tu correo para activar tu cuenta.');
        // Opcional: Limpiar el formulario o redirigir
        setFormData({ name: '', idNumber: '', email: '', password: '', phone: '' });
        // Redirigir al usuario a la página de login o a una de éxito
        setTimeout(() => {
          navigate('/login'); // Redirige a la página de login después de un breve retraso
        }, 3000);
      } else { // Si la respuesta es un error (código 4xx o 5xx)
        setError(data.error || 'Ocurrió un error inesperado durante el registro.');
      }
    } catch (err) {
      console.error('Error de red o del servidor:', err);
      setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Variantes de Framer Motion para la animación del formulario
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <h2 className="text-3xl font-bold text-text-dark text-center mb-6">Regístrate</h2>
        <p className="text-center text-gray-600 mb-8">Crea tu cuenta para acceder a nuestros servicios.</p>

        {/* Mensajes de feedback */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div>
            <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Identificación
            </label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              pattern="^[0-9]{8,10}$" // Validación básica de HTML5
              title="Debe tener entre 8 y 10 dígitos numéricos"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Ej. 123456789"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Ej. correo@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6" // Validación básica de HTML5
              maxLength="20"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel" // Usar "tel" para mejor experiencia móvil
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="^[0-9]{10}$" // Validación básica de HTML5
              title="Debe tener 10 dígitos numéricos"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Ej. 3001234567"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // Deshabilita el botón durante la carga
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-primary' // Tus colores de acento y primary
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition duration-300`}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-secondary">
            Inicia Sesión aquí
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
