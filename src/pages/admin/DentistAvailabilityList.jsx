import React from 'react';

import DentistAvailability from "../../components/dentists/DentistAvailability";

export default function DentistAvailabilityList() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Disponibilidad de Dentistas</h1>
            <DentistAvailability />
        </div>
    );
}