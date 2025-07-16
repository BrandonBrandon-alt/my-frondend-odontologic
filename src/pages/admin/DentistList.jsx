import React from "react";

import DentistsTable from "../../components/ui/Table/DentistsTable";

export default function DentistList() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Lista de Dentistas</h1>
            <DentistsTable />
        </div>
    );
}