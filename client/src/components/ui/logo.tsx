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
      {/* Tech Hooded Figure */}
      
      {/* Hood Outline - Geometric/Tech style */}
      <path 
        d="M50 5L20 35V85L50 95L80 85V35L50 5Z" 
        stroke={color} 
        strokeWidth="4" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
        className="opacity-100"
      />

      {/* Inner Cowl/Visor Opening */}
      <path 
        d="M50 20L70 40V70L50 80L30 70V40L50 20Z" 
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square" 
        strokeLinejoin="miter"
        className="opacity-60"
      />

      {/* Shoulders / Robe detail */}
      <path 
        d="M20 85L10 95" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="square"
      />
      <path 
        d="M80 85L90 95" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="square"
      />

      {/* The "Eye" / Tech Core - Hidden inside */}
      <circle 
        cx="50" 
        cy="50" 
        r="4" 
        fill={color} 
        className="animate-pulse"
      />
      
      {/* Circuit lines connecting to the eye */}
      <path 
        d="M50 50L50 65" 
        stroke={color} 
        strokeWidth="1.5" 
        className="opacity-50"
      />
      <path 
        d="M50 65L35 75" 
        stroke={color} 
        strokeWidth="1.5" 
        className="opacity-50"
      />
      <path 
        d="M50 65L65 75" 
        stroke={color} 
        strokeWidth="1.5" 
        className="opacity-50"
      />
    </svg>
  );
};
