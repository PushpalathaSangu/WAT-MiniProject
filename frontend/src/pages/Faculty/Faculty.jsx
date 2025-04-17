import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Faculty() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/create-wat');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div 
        className="border rounded-lg shadow-lg p-8 max-w-md w-full cursor-pointer hover:shadow-xl transition"
        onClick={handleCardClick}
      >
        <h3 className="text-2xl font-semibold text-center">➕ Create WAT</h3>
        <p className="text-gray-500 text-center mt-2">Click to start creating a Weekly Assessment Test</p>
      </div>
    </div>
  );
}
