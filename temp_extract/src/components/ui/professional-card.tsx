import React from 'react';
import { cn } from '@/lib/utils';

interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'gradient' | 'subtle';
  hover?: boolean;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  children,
  className = '',
  variant = 'glass',
  hover = true
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'glass': return 'glass-card';
      case 'gradient': return 'gradient-border bg-card';
      case 'subtle': return 'bg-card border border-border';
      default: return 'glass-card';
    }
  };

  return (
    <div 
      className={cn(
        'rounded-lg p-6',
        getVariantClass(),
        hover && 'hover-lift',
        className
      )}
    >
      {children}
    </div>
  );
};
