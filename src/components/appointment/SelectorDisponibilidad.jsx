import React from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';

function SelectorDisponibilidad({ disponibilidades, onSelect, selected }) {
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

  const groupByDate = (disponibilidades) => {
    const grouped = {};
    disponibilidades.forEach(disp => {
      const date = disp.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(disp);
    });
    return grouped;
  };

  const groupedDisponibilidades = groupByDate(disponibilidades);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <ClockIcon className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Selecciona un Horario
        </h2>
        <p className="text-gray-600">
          Elige la fecha y hora que mejor te convenga
        </p>
      </div>

      <div className="space-y-6">
        {Object.keys(groupedDisponibilidades).length > 0 ? (
          Object.entries(groupedDisponibilidades).map(([date, disponibilidadesDelDia]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span>{formatDate(date)}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {disponibilidadesDelDia.map((disponibilidad) => (
                  <motion.div
                    key={disponibilidad.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(disponibilidad.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selected === disponibilidad.id
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-gray-900">
                            {formatTime(disponibilidad.start_time)} - {formatTime(disponibilidad.end_time)}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <UserIcon className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {disponibilidad.dentist.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {disponibilidad.especialidad.name}
                        </div>
                      </div>

                      {selected === disponibilidad.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-2"
                        >
                          <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full text-center">
                            Seleccionado
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <ClockIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay disponibilidades para esta especialidad</p>
            <p className="text-sm text-gray-400 mt-2">
              Intenta con otra fecha o especialidad
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectorDisponibilidad; 