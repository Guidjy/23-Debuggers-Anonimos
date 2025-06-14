import React, { useState, useEffect } from 'react';

const ProgressBar = ({ percentage, color = '#4CAF50', height = 20 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const containerStyle = {
    height: height,
    width: '70%',
    backgroundColor: '#e0e0e0',
    borderRadius: height / 2,
    overflow: 'hidden'
  };

  const fillerStyle = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: color,
    borderRadius: 'inherit',
    transition: 'width 0.5s ease-in-out'
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}></div>
    </div>
  );
};

export default ProgressBar;