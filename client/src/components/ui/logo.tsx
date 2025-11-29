import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  color?: string;
}

export const CloakLogo: React.FC<LogoProps> = ({ className, color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("w-full h-full", className)}
    >
      {/* Graphical Hooded Figure - Less Technical, More Iconic */}
      
      {/* Outer Hood Shape - Smooth, graphical curve */}
      <path 
        d="M50 10C30 10 20 30 20 55C20 75 30 90 50 90C70 90 80 75 80 55C80 30 70 10 50 10Z" 
        stroke={color} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Inner Cowl/Visor - Creating the face void */}
      <path 
        d="M50 28C42 28 35 35 35 50C35 62 42 68 50 68C58 68 65 62 65 50C65 35 58 28 50 28Z" 
        stroke={color} 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="opacity-90"
      />
      
      {/* Central 'Eye' / Focus Point - Solid and clear */}
      <circle cx="50" cy="48" r="5" fill={color} />
      
      {/* Subtle Shadow Fill for depth without lines */}
      <path 
        d="M50 28C42 28 35 35 35 50C35 62 42 68 50 68C58 68 65 62 65 50C65 35 58 28 50 28Z" 
        fill={color}
        className="opacity-10"
      />
    </svg>
  );
};
