import React from 'react';

interface GridBackgroundProps {
  className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 grid-bg opacity-20 ${className}`}>
      <div className="absolute inset-0 bg-gradient-subtle" />
    </div>
  );
};
