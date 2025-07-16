import React from 'react';

const DentistSidebar = ({ dentists, selectedId, onSelect }) => {
  return (
    <div className="w-60">
      <h3 className="text-lg font-semibold mb-4">Dentistas</h3>
      <ul className="space-y-2">
        {dentists.map((dentist) => (
          <li
            key={dentist.id}
            onClick={() => onSelect(dentist.id)}
            className={`cursor-pointer px-4 py-2 rounded 
              ${selectedId === dentist.id ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-800'}
              hover:bg-[var(--color-primary)] hover:text-white transition`}
          >
            {dentist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DentistSidebar;
