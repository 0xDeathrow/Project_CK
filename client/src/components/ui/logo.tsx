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
      {/* SLEEK TECHNICAL MINIMALIST LOGO */}
      
      {/* The "Shroud" - Sharp, geometric, angular container */}
      {/* Left Shard */}
      <path 
        d="M50 10 L20 85 L50 75 Z" 
        fill={color} 
        className="opacity-90"
      />
      
      {/* Right Shard - Slightly separated for 'tech' feel */}
      <path 
        d="M50 10 L80 85 L50 75 Z" 
        fill={color} 
        className="opacity-90"
      />

      {/* The "Hidden Core" - A distinct tech element floating in the negative space below */}
      {/* This represents the 'Alpha' or 'Funds' being protected inside/under the cloak */}
      <circle cx="50" cy="60" r="5" fill="white" stroke={color} strokeWidth="2" />

      {/* Tech Accent Lines - Subtle details to reinforce 'Technical' aspect */}
      <path 
        d="M50 10 V25" 
        stroke="white" 
        strokeWidth="1" 
        className="opacity-50"
      />
    </svg>
  );
};
