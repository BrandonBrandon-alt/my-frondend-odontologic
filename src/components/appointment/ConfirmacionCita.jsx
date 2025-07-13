import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  UserIcon, 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, // Asegúrate de que este ícono sea útil o elimínalo si no se usa
  DocumentTextIcon
} from '@heroicons/react/24/outline';
// CurrencyDollarIcon eliminado, ya no se usa.
const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function ConfirmacionCita({ selecciones, datosPaciente, especialidades, tiposServicio, disponibilidades }) {
  // formatPrice eliminado, ya no se usa.
  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat('es-CO', {
  //     style: 'currency',
  //     currency: 'COP',
  //     minimumFractionDigits: 0,
  //   }).format(price);
  // };

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
  // Ahora usaremos `isActive` en especialidad y `is_active` en disponibilidad y tipo de servicio si viene del DTO
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
        // Línea de Precio eliminada
        // { label: 'Precio', value: tipoServicioSeleccionado ? formatPrice(tipoServicioSeleccionado.price) : '' },
      ]
    },
    {
      titulo: 'Horario de la Cita',
      icono: ClockIcon,
      items: [
        { label: 'Fecha', value: disponibilidadSeleccionada ? formatDate(disponibilidadSeleccionada.date) : '' },
        { label: 'Hora', value: disponibilidadSeleccionada ? `${formatTime(disponibilidadSeleccionada.start_time)} - ${formatTime(disponibilidadSeleccionada.end_time)}` : '' },
        { label: 'Dentista', value: disponibilidadSeleccionada?.dentist?.name || 'No especificado' }, // Uso de optional chaining para dentist.name
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircleIcon className="w-12 h-12 text-[var(--color-success)] mx-auto mb-4" />
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] text-center mb-4" variants={textVariants}>
          Selecciona una Especialidad
        </motion.h2>
        <p className="text-[var(--color-text-secondary)]">
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
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-[var(--color-background-light)] dark:bg-[var(--color-background)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <seccion.icono className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                {seccion.titulo}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {seccion.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col">
                  <dt className="text-sm font-medium text-[var(--color-text-secondary)] mb-0.5">
                    {item.label}
                  </dt>
                  <dd className="text-base text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] font-semibold">
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
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-[var(--color-background-light)] dark:bg-[var(--color-background)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <DocumentTextIcon className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                Notas Adicionales
              </h3>
            </div>
            <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
              {datosPaciente.notes}
            </p>
          </motion.div>
        )}

        {/* Información importante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-white dark:bg-[var(--color-background)] border border-[var(--border-primary)] rounded-lg p-4 mb-4 transition-colors duration-200"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-7 h-7 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold text-[var(--color-accent)] mb-2">
                Información Importante
              </h4>
              <ul className="text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] space-y-1">
                <li>• Recibirás confirmación por correo electrónico.</li>
                <li>• Llega 10 minutos antes de tu cita.</li>
                <li>• Trae tu documento de identidad.</li>
                <li>• Si tienes estudios previos, tráelos.</li>
                <li>• En caso de cancelación, hazlo con 24h de anticipación.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Resumen de precio: ESTE BLOQUE HA SIDO ELIMINADO COMPLETAMENTE */}
        {/* {tipoServicioSeleccionado && (
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
        )} */}
      </motion.div>
    </div>
  );
}

export default ConfirmacionCita;
