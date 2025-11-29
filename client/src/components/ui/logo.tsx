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
      {/* Professional Tech/Privacy Logo */}
      
      {/* Outer Shield/Hood Hexagon Container */}
      <path 
        d="M50 5L85 25V65L50 95L15 65V25L50 5Z" 
        stroke={color} 
        strokeWidth="4" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
        className="opacity-100"
      />

      {/* Inner Hood Contour - Abstracting the figure */}
      <path 
        d="M50 20L70 35V60L50 75L30 60V35L50 20Z" 
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        className="opacity-60"
      />

      {/* The "Core" / Eye / Node - The ZK Proof */}
      <rect 
        x="46" 
        y="44" 
        width="8" 
        height="8" 
        transform="rotate(45 50 48)"
        fill={color} 
        className="animate-pulse"
      />
      
      {/* Data Lines connecting to core */}
      <path 
        d="M50 75V85" 
        stroke={color} 
        strokeWidth="2" 
        className="opacity-40"
      />
       <path 
        d="M30 60L22 65" 
        stroke={color} 
        strokeWidth="2" 
        className="opacity-40"
      />
       <path 
        d="M70 60L78 65" 
        stroke={color} 
        strokeWidth="2" 
        className="opacity-40"
      />
    </svg>
  );
};
