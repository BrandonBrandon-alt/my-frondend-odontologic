// src/components/MessageBox.jsx
import React from 'react';

// Props:
// - type: 'success', 'error', 'warning' para diferentes estilos
// - message: El texto del mensaje
const MessageBox = ({ type, message }) => {
  if (!message) return null; // No renderiza si no hay mensaje

  let bgColor, borderColor, textColor;

  switch (type) {
    case 'success':
      bgColor = 'bg-green-100';
      borderColor = 'border-green-400';
      textColor = 'text-green-700';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      borderColor = 'border-red-400';
      textColor = 'text-red-700';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      borderColor = 'border-yellow-400';
      textColor = 'text-yellow-700';
      break;
    default:
      bgColor = 'bg-blue-100'; // Default a un color neutro si no hay tipo
      borderColor = 'border-blue-400';
      textColor = 'text-blue-700';
  }

  return (
    <div className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded relative mb-4`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default MessageBox;
