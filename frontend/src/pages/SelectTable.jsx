import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectTable = () => {
  const navigate = useNavigate();

  // Tables from 1 to 20
  const tables = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleSelect = (tableNumber) => {
    // Navigate to admin menu page with the table number as query param
    navigate(`/admin/menu?table=${tableNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Select Table</h1>
      <div className="grid grid-cols-5 gap-6">
        {tables.map((num) => (
          <button
            key={num}
            onClick={() => handleSelect(num)}
            className="w-20 h-20 bg-blue-500 text-white rounded-lg text-2xl font-semibold hover:bg-blue-600 transition"
            aria-label={`Select table ${num}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectTable;
