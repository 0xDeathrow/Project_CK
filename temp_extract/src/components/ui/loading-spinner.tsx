import React from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = "" }) => {
  return (
    <div className={`animate-spin rounded-full border-2 border-muted border-t-primary ${className}`} />
  );
};
