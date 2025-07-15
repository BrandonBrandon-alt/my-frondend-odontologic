import React from "react";
import DentistsTable from "../../components/dentists/DentistsTable"; 
export default function AdminDentists() {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md"> 
            <DentistsTable />
        </div>
    );
}