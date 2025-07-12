import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactService } from '../../../services';
import { Form, FormField } from '../';
import { Alert } from '../../ui';

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: "0px 15px 30px rgba(0,0,0,0.1)",
    transition: { duration: 0.3 }
  },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await contactService.sendMessage(formData);
      
      // Mensaje de éxito
      setSubmitMessage('¡Gracias por tu mensaje! Te contactaremos pronto.');
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
      
    } catch (error) {
      // Mensaje de error
      setSubmitMessage(error.message || 'Error al enviar el mensaje. Inténtalo de nuevo.');
      
      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-8 shadow-lg"
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Alertas */}
      {submitMessage && (
        <Alert
          type={submitMessage.includes('¡Gracias') ? 'success' : 'error'}
          message={submitMessage}
          dismissible={true}
          onDismiss={() => setSubmitMessage('')}
          className="mb-6"
        />
      )}

      <Form onSubmit={handleSubmit} loading={isSubmitting}>
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Nombre Completo"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Tu nombre completo"
            required={true}
          />
          
          <FormField
            label="Correo Electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            required={true}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            label="Teléfono"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+57 300 123-4567"
            required={false}
          />
          
          <div className="w-full">
            <label htmlFor="subject" className="block text-sm font-semibold text-[var(--color-text-dark)] mb-1 tracking-wide">
              Asunto *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="block w-full rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 px-5 py-2.5 text-base border border-[var(--color-secondary)] bg-white focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/30"
            >
              <option value="">Selecciona un asunto</option>
              <option value="consulta">Consulta General</option>
              <option value="cita">Agendar Cita</option>
              <option value="emergencia">Emergencia Dental</option>
              <option value="presupuesto">Solicitar Presupuesto</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <FormField
          label="Mensaje"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Cuéntanos en qué podemos ayudarte..."
          required={true}
          rows={5}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-4 px-8 rounded-lg transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Enviando...
            </div>
          ) : (
            'Enviar Mensaje'
          )}
        </button>
      </Form>
    </motion.div>
  );
};

export default ContactForm; 