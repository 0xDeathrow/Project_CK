import React from 'react';
import { cn } from '@/lib/utils';

interface GeometricCardProps {
  children: React.ReactNode;
  className?: string;
  shape?: 'hexagon' | 'diamond' | 'neural' | 'asymmetric';
  variant?: 'default' | 'holographic' | 'neural' | 'morphing';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GeometricCard: React.FC<GeometricCardProps> = ({
  children,
  className = '',
  shape = 'neural',
  variant = 'default',
  size = 'md'
}) => {
  const getShapeClass = () => {
    switch (shape) {
      case 'hexagon': return 'hexagon-container animate-hexagon-breathe';
      case 'diamond': return 'diamond-container animate-diamond-spin';
      case 'neural': return 'neural-container animate-geometric-pulse';
      case 'asymmetric': return 'asymmetric-container animate-morphing-float';
      default: return 'neural-container animate-geometric-pulse';
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'holographic': return 'holographic-border animate-hologram-shift';
      case 'neural': return 'animate-neural-pulse shadow-neural';
      case 'morphing': return 'animate-morphing-float shadow-hologram';
      default: return 'bg-gradient-accent border border-border';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'p-4';
      case 'md': return 'p-6';
      case 'lg': return 'p-8';
      case 'xl': return 'p-12';
      default: return 'p-6';
    }
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden backdrop-blur-sm',
        getShapeClass(),
        getVariantClass(),
        getSizeClass(),
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Additional visual effects */}
      {variant === 'neural' && (
        <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      )}
      
      {variant === 'holographic' && (
        <>
          <div className="absolute inset-0 bg-gradient-neural opacity-20 animate-hologram-shift pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        </>
      )}
    </div>
  );
};
