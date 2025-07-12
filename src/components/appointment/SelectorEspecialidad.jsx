import React from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/outline';

function SelectorEspecialidad({ especialidades, onSelect, selected }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <UserIcon className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Selecciona una Especialidad
        </h2>
        <p className="text-gray-600">
          Elige la especialidad médica que necesitas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {especialidades.map((especialidad) => {
          // AHORA: usa 'isActive' del DTO de salida
          // especialidad.isActive ya será un booleano (true o false)
          const isActive = especialidad.isActive; 

          return (
            <motion.div
              key={especialidad.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(especialidad.id)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selected === especialidad.id
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selected === especialidad.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <UserIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {especialidad.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {especialidad.description}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isActive // Usa la variable isActive aquí (que ya es un booleano)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isActive ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {especialidades.length === 0 && (
        <div className="text-center py-8">
          <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay especialidades disponibles</p>
        </div>
      )}
    </div>
  );
}

export default SelectorEspecialidad;
