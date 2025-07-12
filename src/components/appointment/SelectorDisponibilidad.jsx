import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';

function SelectorDisponibilidad({ disponibilidades, onSelect, selected }) {
  // Estado para la fecha activa/seleccionada para mostrar sus disponibilidades
  const [activeDate, setActiveDate] = useState(null);

  const formatTime = (time) => {
    // Asume que 'time' viene en formato HH:MM (e.g., "09:00")
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDateShort = (date) => {
    // Formato más corto para las pestañas (ej: "Lun, 22 Jun")
    return new Date(date).toLocaleDateString('es-CO', {
      weekday: 'short', // 'lun', 'mar'
      month: 'short',   // 'ene', 'feb'
      day: 'numeric',
    });
  };

  const formatDateLong = (date) => {
    // Formato largo para el título del día seleccionado
    return new Date(date).toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const groupByDate = (disponibilidades) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer a medianoche para comparar solo fechas

    // Filtrar para obtener solo disponibilidades de hoy en adelante
    const futureDisponibilidades = disponibilidades.filter(disp => {
      // Importante: Añadir 'T00:00:00' para evitar problemas de zona horaria
      // donde 'YYYY-MM-DD' se interpreta como medianoche UTC, que podría ser el día anterior.
      const dispDate = new Date(`${disp.date}T00:00:00`);
      return dispDate >= today;
    });

    const grouped = {};
    futureDisponibilidades.forEach(disp => {
      const date = disp.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(disp);
    });
    
    // Ordenar las fechas y luego los horarios dentro de cada fecha
    return Object.keys(grouped).sort().reduce((obj, key) => {
      obj[key] = grouped[key].sort((a, b) => a.start_time.localeCompare(b.start_time));
      return obj;
    }, {});
  };

  const groupedDisponibilidades = groupByDate(disponibilidades);
  const dates = Object.keys(groupedDisponibilidades);

  // Establecer la primera fecha como activa por defecto al cargar o si cambian las disponibilidades
  useEffect(() => {
    if (dates.length > 0 && !activeDate) {
      setActiveDate(dates[0]);
    } else if (dates.length > 0 && !dates.includes(activeDate)) {
        // Si la fecha activa actual ya no existe, selecciona la primera disponible
        setActiveDate(dates[0]);
    } else if (dates.length === 0) {
        setActiveDate(null);
    }
  }, [disponibilidades, dates, activeDate]);


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

      {dates.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {/* Contenedor de Pestañas de Fechas */}
          <div className="flex overflow-x-auto pb-2 scrollbar-hide"> {/* scrollbar-hide para ocultar scroll nativo */}
            <div className="flex space-x-3 justify-center md:justify-start flex-nowrap">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setActiveDate(date)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ease-in-out
                    ${activeDate === date
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {formatDateShort(date)}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido de las Disponibilidades para la Fecha Activa */}
          <AnimatePresence mode="wait">
            {activeDate && (
              <motion.div
                key={activeDate} // Cambia la key para animar la entrada/salida cuando cambia la fecha
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <span>{formatDateLong(activeDate)}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {groupedDisponibilidades[activeDate].map((disponibilidad) => (
                    <motion.div
                      key={disponibilidad.id}
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelect(disponibilidad.id)}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out flex flex-col justify-between
                        ${selected === disponibilidad.id
                          ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-xl ring-2 ring-primary-500'
                          : 'border-gray-200 bg-white text-gray-800 hover:border-primary-300 hover:shadow-lg'
                        }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-5 h-5 text-primary-600" />
                            <span className="font-semibold text-lg">
                              {formatTime(disponibilidad.start_time)} - {formatTime(disponibilidad.end_time)}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 pt-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <UserIcon className="w-5 h-5 text-gray-500" />
                            <span className="text-base font-medium">
                              {disponibilidad.dentist.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {disponibilidad.especialidad.name}
                          </div>
                        </div>
                      </div>
                      {selected === disponibilidad.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4"
                        >
                          <div className="bg-primary-600 text-white text-center text-sm font-semibold py-2 rounded-md shadow">
                            Horario Seleccionado
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
  );
}

export default SelectorDisponibilidad;
