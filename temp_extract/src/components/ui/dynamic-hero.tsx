import React, { useEffect, useRef, useState } from 'react';

interface DynamicHeroProps {
  children: React.ReactNode;
  className?: string;
}

export const DynamicHero: React.FC<DynamicHeroProps> = ({ children, className = '' }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic layered background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer 1: Grid pattern with parallax */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--primary) / 0.1) 0%, transparent 50%)`,
          }}
        >
          <div className="w-full h-full grid-bg" />
        </div>

        {/* Layer 2: Floating geometric shapes */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px) translateX(${mousePosition.x * 20}px)`,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full animate-parallax-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Layer 3: Gradient orbs that follow mouse */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            transform: `translate(${mousePosition.x * 100}px, ${mousePosition.y * 50}px)`,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, hsl(var(--accent-foreground)) 0%, transparent 70%)`,
            transform: `translate(${mousePosition.x * -50}px, ${mousePosition.y * 100}px)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>

      {/* Content with layered animation */}
      <div 
        className="relative z-10"
        style={{
          transform: `translateY(${scrollY * -0.2}px)`,
        }}
      >
        {children}
      </div>

      {/* Interactive scan lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          style={{
            top: `${30 + mousePosition.y * 40}%`,
            animation: 'sweepLine 4s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{
            left: `${20 + mousePosition.x * 60}%`,
            animation: 'sweepLine 6s ease-in-out infinite reverse',
          }}
        />
      </div>
    </div>
  );
};
