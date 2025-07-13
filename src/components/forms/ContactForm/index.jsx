import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactService } from '../../../services';
import Card from '../../ui/Card';
import { Input } from '../../ui';
import { Button } from '../../ui';
import { Alert } from '../../ui';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (message) setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

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
    } catch (err) {
      setError(err.message || 'Error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Teléfono",
      content: "+57 300 123 4567",
      link: "tel:+573001234567"
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: "Email",
      content: "info@odontologic.com",
      link: "mailto:info@odontologic.com"
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
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
                  <Input
                    type="text"
                    name="name"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Tu correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Tu teléfono (opcional)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Asunto del mensaje"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Tu mensaje..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-[var(--color-background)] text-[var(--color-text-dark)] placeholder-[var(--color-text-muted)] transition-all duration-200 resize-none"
                  />
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