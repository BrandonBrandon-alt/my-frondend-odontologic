import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  UserIcon, 
  CalendarIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  MapPinIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

function ConfirmacionCita({ selecciones, datosPaciente, especialidades, tiposServicio, disponibilidades }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  // Obtener datos de las selecciones
  const especialidadSeleccionada = especialidades.find(esp => esp.id === selecciones.especialidadId);
  const tipoServicioSeleccionado = tiposServicio.find(ts => ts.id === selecciones.tipoServicioId);
  const disponibilidadSeleccionada = disponibilidades.find(disp => disp.id === selecciones.disponibilidadId);

  const secciones = [
    {
      titulo: 'Información del Paciente',
      icono: UserIcon,
      items: [
        { label: 'Nombre', value: datosPaciente.name },
        { label: 'Email', value: datosPaciente.email || 'No especificado' },
        { label: 'Teléfono', value: datosPaciente.phone },
        ...(datosPaciente.id_number ? [{ label: 'Identificación', value: datosPaciente.id_number }] : []),
      ]
    },
    {
      titulo: 'Detalles del Servicio',
      icono: CalendarIcon,
      items: [
        { label: 'Especialidad', value: especialidadSeleccionada?.name },
        { label: 'Tipo de Servicio', value: tipoServicioSeleccionado?.name },
        { label: 'Duración', value: tipoServicioSeleccionado ? formatDuration(tipoServicioSeleccionado.duration) : '' },
        { label: 'Precio', value: tipoServicioSeleccionado ? formatPrice(tipoServicioSeleccionado.price) : '' },
      ]
    },
    {
      titulo: 'Horario de la Cita',
      icono: ClockIcon,
      items: [
        { label: 'Fecha', value: disponibilidadSeleccionada ? formatDate(disponibilidadSeleccionada.date) : '' },
        { label: 'Hora', value: disponibilidadSeleccionada ? `${formatTime(disponibilidadSeleccionada.start_time)} - ${formatTime(disponibilidadSeleccionada.end_time)}` : '' },
        { label: 'Dentista', value: disponibilidadSeleccionada?.dentist.name },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Confirma tu Cita
        </h2>
        <p className="text-gray-600">
          Revisa toda la información antes de confirmar
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Secciones de información */}
        {secciones.map((seccion, index) => (
          <motion.div
            key={seccion.titulo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <seccion.icono className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {seccion.titulo}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seccion.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600">
                    {item.label}
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">
                    {item.value || 'No especificado'}
                  </dd>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Notas adicionales */}
        {datosPaciente.notes && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Notas Adicionales
              </h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {datosPaciente.notes}
            </p>
          </motion.div>
        )}

        {/* Información importante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Información Importante
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Recibirás confirmación por correo electrónico</li>
                <li>• Llega 10 minutos antes de tu cita</li>
                <li>• Trae tu documento de identidad</li>
                <li>• Si tienes estudios previos, tráelos</li>
                <li>• En caso de cancelación, hazlo con 24h de anticipación</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Resumen de precio */}
        {tipoServicioSeleccionado && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Total a Pagar
                </h3>
                <p className="text-primary-100 text-sm">
                  Precio del servicio seleccionado
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {formatPrice(tipoServicioSeleccionado.price)}
                </div>
                <div className="text-primary-100 text-sm">
                  {formatDuration(tipoServicioSeleccionado.duration)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default ConfirmacionCita; 