import React from "react";
import DentistsTable from "../../components/ui/Table/DentistsTable";
import DentistAvailability from "../../components/dentists/DentistAvailability";
import {
    UserGroupIcon,
    CalendarDaysIcon,

} from '@heroicons/react/24/outline';
import { DashboardCard } from "../../pages/dashboards/AdminDashboard";


export default function AdminDentists() {
    return (

        <div className="justify-center items-center flex flex-col p-10">

            <h1 className="text-2xl font-bold mb-4">Administración de Dentistas</h1>

        <div className=" p-10  flex flex-row gap-6 flex-wrap justify-center">
            <DashboardCard
                to="/admin/dentists/list"
                icon={< UserGroupIcon className="w-7 h-7 text-[var(--color-accent)]" />}
                title="Lista de Dentistas"
                description="Aquí puedes ver y gestionar todos los dentistas registrados en el sistema.">
            </DashboardCard>


            <DashboardCard
                to="/admin/dentists/availability"
                icon={< CalendarDaysIcon className="w-7 h-7 text-[var(--color-accent)]" />}
                title="Disponibilidad de Dentistas"
                description="Aquí puedes ver y gestionar la disponibilidad de los dentistas para citas.">
            </DashboardCard>

        </div>
         </div>
    );
}