/*import React, { useState } from 'react';

const PaginacionEjemplo = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Cálculo de índices
  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Funciones de navegación
  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="controls">
        <button onClick={prevPage} disabled={currentPage === 0}>
          Back
        </button>
        
        <span> Página {currentPage + 1} de {totalPages} </span>

        <button onClick={nextPage} disabled={currentPage >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginacionEjemplo;*/