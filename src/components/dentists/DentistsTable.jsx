import React, { useState, useEffect } from 'react';
import Table from '../ui/Table/Table.jsx';
import { fetchDentists } from '../../services/dentistsService';

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
    {header: 'CC' , accessor: 'id_number'},
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {header: 'Role' , accessor: 'role'},
    { header: 'Status', accessor: 'status' },
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
