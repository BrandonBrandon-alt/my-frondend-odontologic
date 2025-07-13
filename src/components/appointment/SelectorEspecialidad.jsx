import React from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/outline';

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


function SelectorEspecialidad({ especialidades, onSelect, selected }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <UserIcon className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
       <motion.h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] text-center mb-4" variants={textVariants}>
          Selecciona una Especialidad
        </motion.h2>
        <p className="mt-2 text-center text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] text-sm">
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
              className={`min-h-[210px] w-full max-w-sm mx-auto flex flex-col justify-between p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selected === especialidad.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-lg'
                  : 'border-[var(--border-primary)] bg-[var(--color-background-light)] dark:bg-[var(--color-background)] hover:border-[var(--color-primary)]/50 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selected === especialidad.id
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-background-light)] dark:bg-[var(--color-background)] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    <UserIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1 truncate">
                    {especialidad.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {especialidad.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-end">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {isActive ? 'Disponible' : 'No disponible'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {especialidades.length === 0 && (
        <div className="text-center py-8">
          <UserIcon className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">No hay especialidades disponibles</p>
        </div>
      )}
    </div>
  );
}

export default SelectorEspecialidad;
