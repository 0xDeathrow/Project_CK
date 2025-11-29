import React, { useEffect, useRef, useState } from 'react';

interface AdvancedScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'timeline-left' | 'timeline-right' | 'professional-fade' | 'subtle-slide' | 'staggered' | 'spiral' | 'morph' | 'parallax';
  duration?: number;
  staggerIndex?: number;
  parallaxSpeed?: number;
}

export const AdvancedScrollReveal: React.FC<AdvancedScrollRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'professional-fade',
  duration = 0.8,
  staggerIndex = 0,
  parallaxSpeed = 0.5
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const handleScroll = () => {
      if (!ref.current) return;
      
      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for parallax effects
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    if (ref.current) {
      observer.observe(ref.current);
    }

    if (animation === 'parallax') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, animation]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'timeline-left': return 'opacity-0 translate-x-[-100px]';
        case 'timeline-right': return 'opacity-0 translate-x-[100px]';
        case 'subtle-slide': return 'opacity-0 translate-y-[40px]';
        case 'staggered': return 'opacity-0 translate-y-[60px] scale-90';
        case 'spiral': return 'opacity-0 rotate-[-180deg] scale-10';
        case 'morph': return 'opacity-0 scale-70 rotate-[-5deg] blur-sm';
        case 'parallax': return 'opacity-0';
        default: return 'opacity-0 translate-y-8';
      }
    }
    
    switch (animation) {
      case 'timeline-left': return 'animate-slide-in-left';
      case 'timeline-right': return 'animate-slide-in-right';
      case 'subtle-slide': return 'animate-slide-up-stagger';
      case 'staggered': return 'animate-elastic-scale';
      case 'spiral': return 'animate-spiral-in';
      case 'morph': return 'animate-morph-scale';
      case 'parallax': return 'animate-slide-up-reveal';
      default: return 'animate-fade-in-up';
    }
  };

  const getStaggerClass = () => {
    return staggerIndex > 0 ? `stagger-${Math.min(staggerIndex, 6)}` : '';
  };

  const getParallaxTransform = () => {
    if (animation !== 'parallax') return {};
    
    const translateY = scrollProgress * 50 * parallaxSpeed;
    return {
      transform: `translateY(${translateY}px)`,
    };
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${getStaggerClass()} ${className}`}
      style={{
        animationDuration: `${duration}s`,
        animationFillMode: 'forwards',
        ...getParallaxTransform(),
      }}
    >
      {children}
    </div>
  );
};

// Section transition component for smooth page flow
interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  transitionType?: 'slide' | 'wipe' | 'reveal' | 'mask';
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className = '',
  transitionType = 'slide'
}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransitionClass = () => {
    switch (transitionType) {
      case 'wipe': return isInView ? 'animate-slide-up-reveal' : 'opacity-0';
      case 'reveal': return isInView ? 'animate-morph-scale' : 'opacity-0 scale-95';
      case 'mask': return isInView ? 'animate-typewriter-reveal' : 'opacity-0';
      default: return isInView ? 'animate-slide-up-stagger' : 'opacity-0 translate-y-20';
    }
  };

  return (
    <div
      ref={ref}
      className={`section-divider ${getTransitionClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// Parallax background component
interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollProgress = -rect.top * speed;
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transform: `translateY(${scrollY}px)`,
      }}
    >
      {children}
    </div>
  );
};
