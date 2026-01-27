import React from 'react';
import './Spinner.scss'; // Подключаем стили

type Props = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
};

const Spinner: React.FC<Props> = ({ size = 'medium', color = '#007bff', className = '' }) => {
  return (
    <div className={`spinner-wrapper ${className}`}>
      <div
        className={`spinner spinner--${size}`}
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default Spinner;
