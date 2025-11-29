import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  threshold?: number;
}

export const RevealOnScroll: React.FC<RevealProps> = ({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.8,
  yOffset = 50,
  threshold = 0.2
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: `-${threshold * 100}%` }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier for smooth "luxury" feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export const ParallaxElement: React.FC<ParallaxProps> = ({ 
  children, 
  className, 
  offset = 50 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  // Add spring physics for smoother parallax
  const ySpring = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: ySpring }}>
        {children}
      </motion.div>
    </div>
  );
};

export const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: 0.1, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TechGlowCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={cn("group relative rounded-xl bg-card border border-white/5 p-1 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full w-full bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-white/5 group-hover:border-primary/20 transition-colors duration-300">
        {children}
      </div>
      {/* Moving light effect on border */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full group-hover:animate-scan-line" />
      </div>
    </div>
  );
};
