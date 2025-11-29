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
      {/* "Stealth Vector" Logo */}
      {/* Concept: An abstract 'A' shape (for Alpha/Anon) that forms a sleek, sharp hood. */}
      {/* Resembles a stealth bomber or cursor, emphasizing speed and tech. */}

      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Main Hood Silhouette - Sharp, aggressive angles */}
      <path 
        d="M50 5 L 90 90 L 50 75 L 10 90 L 50 5 Z" 
        stroke={color} 
        strokeWidth="5" 
        strokeLinejoin="round" 
        strokeLinecap="round"
        fill="none"
        className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      />

      {/* Inner "Visor" / Core Logic - The hidden element */}
      <path 
        d="M50 25 L 70 75 L 50 65 L 30 75 L 50 25 Z" 
        fill={color}
        className="opacity-20"
      />

      {/* The "Singularity" Dot - High contrast focus point */}
      <circle 
        cx="50" 
        cy="50" 
        r="5" 
        fill={color} 
        className="animate-pulse"
      />
      
      {/* Tech Accent: Data Line descending */}
      <path 
        d="M50 50 V 75" 
        stroke={color} 
        strokeWidth="2" 
        className="opacity-60"
      />
    </svg>
  );
};
