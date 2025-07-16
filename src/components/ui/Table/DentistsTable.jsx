import React, { useState, useEffect } from 'react';
import Table from './Table.jsx';
import { fetchDentists } from '../../../services/dentistsService.js';

export default function DentistsTable() {
  const [dentists, setDentists] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });

  const getDentists = async (page) => {
    try {
      const res = await fetchDentists(page, pagination.limit);
      setDentists(res.data);
      setPagination({
        page: res.page,
        totalPages: res.totalPages,
        total: res.total,
        limit: pagination.limit,
      });
    } catch (err) {
      console.error('Error fetching dentists:', err);
    }
  };

  useEffect(() => {
    getDentists(pagination.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      getDentists(newPage);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'CC', accessor: 'id_number' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Role', accessor: 'role' },
    {
      header: 'Status',
      accessor: (row) => {
        const base = 'px-2 py-1 rounded-full text-xs font-semibold w-fit capitalize';
        const colorMap = {
          active: 'bg-[var(--success)] text-white',
          locked: 'bg-yellow-400 text-white',
          inactive: 'bg-red-500 text-white',
        };
        const colorClass = colorMap[row.status] || 'bg-gray-300 text-gray-800';

        return <span className={`${base} ${colorClass}`}>{row.status}</span>;
      },
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dentists</h2>
      <Table
        columns={columns}
        data={dentists}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
