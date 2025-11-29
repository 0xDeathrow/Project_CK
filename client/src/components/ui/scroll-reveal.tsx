import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  animation?: 'professional-fade' | 'timeline-left' | 'timeline-right' | 'subtle-slide' | 'staggered';
  duration?: number;
  staggerIndex?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'professional-fade',
  direction = 'up',
  duration = 0.6,
  staggerIndex = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) {
      // Initial hidden state based on animation type
      switch (animation) {
        case 'timeline-left': return 'opacity-0 translate-x-[-32px]';
        case 'timeline-right': return 'opacity-0 translate-x-[32px]';
        case 'subtle-slide': return 'opacity-0 translate-y-[16px]';
        case 'staggered': return 'opacity-0 translate-y-[24px]';
        default: return 'opacity-0 translate-y-6';
      }
    }
    
    switch (animation) {
      case 'timeline-left': return 'animate-timeline-left';
      case 'timeline-right': return 'animate-timeline-right';
      case 'subtle-slide': return 'animate-subtle-slide-up';
      case 'staggered': return 'animate-staggered-appear';
      default: return 'animate-professional-fade-up';
    }
  };

  const getStaggerClass = () => {
    return staggerIndex > 0 ? `stagger-${Math.min(staggerIndex, 6)}` : '';
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${getStaggerClass()} ${className}`}
      style={{
        animationDuration: `${duration}s`,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};
