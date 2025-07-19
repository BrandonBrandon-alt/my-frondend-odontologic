import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactService } from '../../../services';
import Card from '../../ui/Card';
import { Input } from '../../ui';
import { Button } from '../../ui';
import { Alert } from '../../ui';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaRegCommentDots, FaRegEdit } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (message) setMessage(null);
    setFormErrors(prev => ({ ...prev, [name]: null })); // Clear specific error on change
  };

  const validate = () => {
    const errors = {};
    // Validación de nombre
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (formData.name.length > 100) {
      errors.name = 'El nombre no puede exceder 100 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.name)) {
      errors.name = 'El nombre solo puede contener letras y espacios';
    }
    // Validación de email
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'El email no tiene un formato válido';
    } else if (formData.email.length > 255) {
      errors.email = 'El email es demasiado largo';
    }
    // Validación de teléfono (opcional)
    if (formData.phone && formData.phone.length > 20) {
      errors.phone = 'El teléfono es demasiado largo';
    } else if (formData.phone && !/^[\+]?([0-9\s\-\(\)]*)$/.test(formData.phone)) {
      errors.phone = 'El teléfono no tiene un formato válido';
    }
    // Validación de asunto
    const validSubjects = ['consulta', 'cita', 'emergencia', 'presupuesto', 'otro'];
    if (!formData.subject) {
      errors.subject = 'El asunto es requerido';
    } else if (!validSubjects.includes(formData.subject)) {
      errors.subject = 'El asunto seleccionado no es válido';
    }
    // Validación de mensaje
    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    } else if (formData.message.length > 1000) {
      errors.message = 'El mensaje no puede exceder 1000 caracteres';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setLoading(true);
    try {
      await contactService.sendMessage(formData);
      setMessage('¡Mensaje enviado exitosamente! Te responderemos pronto.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setFormErrors({});
    } catch (err) {
      setError(err.message || 'Error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Teléfono",
      content: "+57 300 123 4567",
      link: "tel:+573001234567"
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email",
      content: "info@odontologic.com",
      link: "mailto:info@odontologic.com"
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: "Dirección",
      content: "Calle 15 #23-45, Armenia, Quindío",
      link: "https://maps.google.com"
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
            Contáctanos
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            ¿Tienes alguna pregunta o necesitas agendar una cita? Estamos aquí para ayudarte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card
              variant="elevated"
              className="p-8"
              title="Información de Contacto"
              subtitle="Estamos aquí para ayudarte con cualquier consulta o cita que necesites."
            >
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0 text-[var(--color-accent)]">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-dark)]">{info.title}</h3>
                      <a
                        href={info.link}
                        className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                      >
                        {info.content}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card
              variant="elevated"
              className="p-8"
              title="Envíanos un Mensaje"
              subtitle="Completa el formulario y te responderemos lo antes posible."
            >
              {message && <Alert type="success" message={message} />}
              {error && <Alert type="error" message={error} />}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      startIcon={<FaUser className="h-5 w-5 text-gray-400" />}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Tu correo electrónico"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      startIcon={<FaEnvelope className="h-5 w-5 text-gray-400" />}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Tu teléfono (opcional)"
                      value={formData.phone}
                      onChange={handleChange}
                      startIcon={<FaPhone className="h-5 w-5 text-gray-400" />}
                      maxLength={20}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Asunto del mensaje
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-[var(--color-background)] text-[var(--color-text-dark)] placeholder-[var(--color-text-muted)] transition-all duration-200"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consulta">Consulta</option>
                      <option value="cita">Cita</option>
                      <option value="emergencia">Emergencia</option>
                      <option value="presupuesto">Presupuesto</option>
                      <option value="otro">Otro</option>
                    </select>
                    {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Tu mensaje..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-[var(--color-background)] text-[var(--color-text-dark)] placeholder-[var(--color-text-muted)] transition-all duration-200 resize-none"
                  />
                  <FaRegEdit className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm; 