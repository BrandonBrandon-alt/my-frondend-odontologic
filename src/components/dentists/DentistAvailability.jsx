import React, { useState, useEffect, useMemo } from 'react';
import DentistSidebar from './DentistSidebar';
import DentistAvailabilityList from '../ui/List/DentistAvailabilityList';
import axiosInstance from '../../utils/axiosInstance'; // Ajusta según tu estructura

const DentistAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDentistId, setSelectedDentistId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Llamada a la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/disponibilidad');
        setAvailabilities(response.data.data); // Asegúrate de que el backend devuelva .data
      } catch (err) {
        setError('Error al cargar la disponibilidad');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dentists = useMemo(() => {
    const map = new Map();
    availabilities.forEach(({ dentist }) => {
      if (!map.has(dentist.id)) {
        map.set(dentist.id, dentist.name);
      }
    });
    return Array.from(map, ([id, name]) => ({ id, name }));
  }, [availabilities]);

  const filteredAvailabilities = availabilities.filter(
    item => item.dentist.id === selectedDentistId
  );

  if (loading) return <div className="p-8 text-gray-500">Cargando disponibilidad...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="flex gap-8 p-8">
      <DentistSidebar
        dentists={dentists}
        selectedId={selectedDentistId}
        onSelect={setSelectedDentistId}
      />
      <DentistAvailabilityList
        dentist={dentists.find(d => d.id === selectedDentistId)}
        availabilities={filteredAvailabilities}
      />
    </div>
  );
};

export default DentistAvailability;
