import React from 'react';

import { FaFile } from 'react-icons/fa'; // 'Fa' = Font Awesome

const ButtonCircle = ({ 
  icon, 
  size = 50, 
  color = '#ffffff', 
  bgColor = '#2563eb', 
  onClick 
}) => {
  const buttonStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: bgColor,
    border: 'none',
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontSize: `${size * 0.5}px`,
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
    },
    ':active': {
      transform: 'scale(0.95)'
    }
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {icon || <FaFile/>}
    </button>
  );
};

export default ButtonCircle;