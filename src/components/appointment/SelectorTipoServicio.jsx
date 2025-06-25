import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

function SelectorTipoServicio({ tiposServicio, onSelect, selected }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CalendarIcon className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Selecciona un Tipo de Servicio
        </h2>
        <p className="text-gray-600">
          Elige el servicio específico que necesitas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tiposServicio.map((servicio) => (
          <motion.div
            key={servicio.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(servicio.id)}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selected === servicio.id
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {servicio.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {servicio.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>{formatDuration(servicio.duration)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(servicio.price)}
                  </div>
                  <div className="text-xs text-gray-500">Precio del servicio</div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duración estimada:</span>
                  <span className="font-medium">{formatDuration(servicio.duration)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {tiposServicio.length === 0 && (
        <div className="text-center py-8">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay tipos de servicio disponibles</p>
        </div>
      )}
    </div>
  );
}

export default SelectorTipoServicio; 