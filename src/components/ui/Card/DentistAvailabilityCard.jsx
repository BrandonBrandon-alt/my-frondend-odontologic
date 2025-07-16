import React from 'react';

const DentistAvailabilityCard = ({ item }) => {
  const { date, start_time, end_time, especialidad } = item;

  return (
    <div className="border border-[var(--color-primary-darker)] rounded-lg p-4 mb-4 bg-gray-50 shadow-lg">
      <p className="text-sm"><span className="font-semibold">Fecha:</span> {date}</p>
      <p className="text-sm"><span className="font-semibold">Especialidad:</span> {especialidad.name}</p>
      <p className="text-sm"><span className="font-semibold">Horario:</span> {start_time} - {end_time}</p>
      <button className="mt-3 px-4 py-1.5 bg-[var(--success)] text-white rounded hover:bg-green-700 transition">
        Editar
      </button>
    </div>
  );
};

export default DentistAvailabilityCard;
