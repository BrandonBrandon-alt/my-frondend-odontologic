import React from 'react';
import { motion } from 'framer-motion';
import { UserIcon, EnvelopeIcon, PhoneIcon, IdentificationIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Input } from '../../components';

function FormularioPaciente({ datos, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...datos,
      [name]: value,
    });
  };

  const formatPhone = (value) => {
    // Solo permite números y máximo 10 dígitos
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 10);
  };

  const formatIdNumber = (value) => {
    // Solo permite números y máximo 10 dígitos
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 10);
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    handleChange({
      target: {
        name: 'phone',
        value: formatted,
      },
    });
  };

  const handleIdNumberChange = (e) => {
    const formatted = formatIdNumber(e.target.value);
    handleChange({
      target: {
        name: 'id_number',
        value: formatted,
      },
    });
  };

  return (
    <div className="relative w-full transition-colors duration-200">
      <div className="text-center mb-8">
        <UserIcon className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
          Datos del Paciente
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Ingresa tu información personal para crear la cita
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mb-2">
          {/* Nombre y correo */}
          <Input
            label="Nombre Completo"
            id="name"
            name="name"
            type="text"
            value={datos.name || ''}
            onChange={handleChange}
            required
            placeholder="Ej. Juan Pérez"
            startIcon={<UserIcon className="h-5 w-5 text-gray-400" />}
            helperText="Ingresa tu nombre completo"
          />
          <Input
            label="Correo Electrónico"
            id="email"
            name="email"
            type="email"
            value={datos.email || ''}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
            helperText="Ingresa un correo válido"
          />
          {/* Teléfono y cédula */}
          <Input
            label="Teléfono"
            id="phone"
            name="phone"
            type="tel"
            value={datos.phone || ''}
            onChange={handlePhoneChange}
            required
            placeholder="3001234567"
            startIcon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
            helperText="10 dígitos sin espacios"
            maxLength="10"
          />
          <Input
            label="Número de Identificación (Opcional)"
            id="id_number"
            name="id_number"
            type="text"
            value={datos.id_number || ''}
            onChange={handleIdNumberChange}
            placeholder="12345678"
            startIcon={<IdentificationIcon className="h-5 w-5 text-gray-400" />}
            helperText="Opcional - Entre 8 y 10 dígitos"
            maxLength="10"
          />
        </div>
        {/* Notas adicionales (ocupa todo el ancho) */}
        <div className="space-y-2">
          <Input
            label="Notas Adicionales (Opcional)"
            id="notes"
            name="notes"
            type="textarea"
            value={datos.notes || ''}
            onChange={handleChange}
            placeholder="Describe brevemente el motivo de tu consulta o cualquier información adicional que consideres importante..."
            startIcon={<DocumentTextIcon className="h-5 w-5 text-gray-400" />}
            helperText="Información adicional para el dentista"
            rows={4}
          />
        </div>
        {/* Información adicional (ocupa todo el ancho) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-[var(--color-background)] border border-[var(--border-primary)] rounded-lg p-4 mb-4 transition-colors duration-200"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center">
                <DocumentTextIcon className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[var(--color-accent)] mb-1">
                Información Importante
              </h4>
              <ul className="text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] space-y-1">
                <li>• Llega 10 minutos antes de tu cita</li>
                <li>• Trae tu documento de identidad</li>
                <li>• Si tienes estudios previos, tráelos</li>
                <li>• Recibirás confirmación por correo</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default FormularioPaciente; 