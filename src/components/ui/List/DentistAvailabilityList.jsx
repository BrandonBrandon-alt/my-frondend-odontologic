import React, { useState, useEffect } from 'react';
import DentistAvailabilityCard from '../Card/DentistAvailabilityCard';

const ITEMS_PER_PAGE = 6;

const DentistAvailabilityList = ({ dentist, availabilities }) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [dentist]);

  const totalPages = Math.ceil((availabilities || []).length / ITEMS_PER_PAGE);
  const paginated = (availabilities || []).slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  if (!dentist) {
    return <p className="text-gray-600">Selecciona un dentista para ver sus horarios</p>;
  }

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4">Disponibilidades de {dentist.name}</h2>

      {availabilities.length === 0 ? (
        <p className="text-gray-500">Este dentista no tiene horarios disponibles</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
            {paginated.map((item) => (
              <DentistAvailabilityCard key={item.id} item={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                className="px-4 py-2 bg-[var(--color-accent)] text-sm rounded hover:bg-[var(--color-primary)] text-white disabled:opacity-50"
                disabled={page === 0}
              >
                Anterior
              </button>
              <span className="text-sm text-gray-700">
                Página {page + 1} de {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                className="px-4 py-2 bg-[var(--color-accent)] text-sm rounded hover:bg-[var(--color-primary)] text-white disabled:opacity-50"
                disabled={page === totalPages - 1}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DentistAvailabilityList;
