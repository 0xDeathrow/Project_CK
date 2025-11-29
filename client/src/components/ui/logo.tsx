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
      {/* Minimalist Hood Silhouette */}
      {/* Left side of hood */}
      <path 
        d="M50 10C30 10 15 30 15 55V90H40L50 80" 
        stroke={color} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Right side of hood - slightly offset/disconnected for style */}
      <path 
        d="M50 10C70 10 85 30 85 55V90H60L50 80" 
        stroke={color} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Inner "Void" - Minimal Visor Line */}
      <path 
        d="M35 50H65" 
        stroke={color} 
        strokeWidth="6" 
        strokeLinecap="round"
        className="opacity-80"
      />
      
      {/* Tech accent dot */}
      <circle cx="50" cy="65" r="4" fill={color} className="opacity-60" />
    </svg>
  );
};
