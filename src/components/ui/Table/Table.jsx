import React from 'react';

export default function Table({
  columns = [],
  data = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[var(--border-primary)] shadow-sm bg-[var(--bg-secondary)]">
      <table className="min-w-full text-sm text-left text-[var(--text-primary)]">
        <thead className="bg-[var(--color-primary)] text-[var(--color-text-on-accent)] uppercase text-xs font-bold">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-5 py-3 border-b border-[var(--border-secondary)]">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[var(--border-primary)]">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-4 text-center text-[var(--text-muted)] italic"
              >
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-[var(--color-secondary)] transition-colors duration-200"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-5 py-3 text-sm">
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-[var(--border-primary)] bg-[var(--bg-primary)]">
        <p className="text-xs text-[var(--text-muted)]">
          Página {currentPage} de {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1 text-xs rounded bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)] hover:text-white  transition"
          >
            Anterior
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 text-xs rounded bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)] hover:text-white  transition"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
