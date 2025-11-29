import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'tilt' | 'glow' | 'lift' | 'shimmer';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  variant = 'tilt',
  intensity = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'subtle': return 0.5;
      case 'medium': return 1;
      case 'strong': return 1.5;
      default: return 1;
    }
  };

  const getTransform = () => {
    if (!isHovered || variant !== 'tilt') return '';
    
    const multiplier = getIntensityMultiplier();
    const tiltX = (mousePosition.y - 0.5) * 10 * multiplier;
    const tiltY = (mousePosition.x - 0.5) * -10 * multiplier;
    
    return `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
  };

  const getGlowStyle = () => {
    if (!isHovered || variant !== 'glow') return {};
    
    const multiplier = getIntensityMultiplier();
    return {
      boxShadow: `0 0 ${20 * multiplier}px hsl(var(--primary) / 0.3), 0 0 ${40 * multiplier}px hsl(var(--primary) / 0.1)`,
    };
  };

  const getShimmerStyle = () => {
    if (!isHovered || variant !== 'shimmer') return {};
    
    return {
      background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.05) 50%, hsl(var(--card)) 100%)`,
    };
  };

  const getLiftStyle = () => {
    if (!isHovered || variant !== 'lift') return {};
    
    const multiplier = getIntensityMultiplier();
    return {
      transform: `translateY(-${8 * multiplier}px) scale(${1 + 0.02 * multiplier})`,
      boxShadow: `0 ${20 * multiplier}px ${40 * multiplier}px -10px hsl(var(--foreground) / 0.2)`,
    };
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'glass-card rounded-lg p-6 transition-all duration-300 ease-out transform-3d',
        'cursor-pointer select-none',
        className
      )}
      style={{
        transform: getTransform(),
        ...getGlowStyle(),
        ...getShimmerStyle(),
        ...getLiftStyle(),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shimmer overlay */}
      {variant === 'shimmer' && isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--primary) / 0.1) 0%, transparent 50%)`,
          }}
        />
      )}
    </div>
  );
};
