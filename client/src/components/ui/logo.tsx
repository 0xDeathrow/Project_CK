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
      {/* Hood/Cowl Outline */}
      <path 
        d="M50 5L20 40L25 85L50 95L75 85L80 40L50 5Z" 
        stroke={color} 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="opacity-90"
      />
      
      {/* Inner Hood Detail - Creating the depth */}
      <path 
        d="M50 15C40 15 35 25 35 35C35 50 50 60 50 60C50 60 65 50 65 35C65 25 60 15 50 15Z" 
        stroke={color} 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="opacity-80"
      />
      
      {/* Triangular Node Connection (The "Secret" inside) */}
      <g className="opacity-100">
        {/* Nodes */}
        <circle cx="50" cy="70" r="4" fill={color} />
        <circle cx="40" cy="55" r="4" fill={color} />
        <circle cx="60" cy="55" r="4" fill={color} />
        
        {/* Connections */}
        <line x1="40" y1="55" x2="60" y2="55" stroke={color} strokeWidth="2" />
        <line x1="40" y1="55" x2="50" y2="70" stroke={color} strokeWidth="2" />
        <line x1="60" y1="55" x2="50" y2="70" stroke={color} strokeWidth="2" />
      </g>
    </svg>
  );
};
