import React, { useEffect, useRef } from 'react';

interface NeuralBackgroundProps {
  className?: string;
  particleCount?: number;
}

export const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ 
  className = '', 
  particleCount = 50 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          connections: []
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        particle.connections = [];
        
        // Find connections
        particles.forEach((other, j) => {
          if (i !== j) {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              particle.connections.push(j);
            }
          }
        });
      });
      
      // Draw connections
      ctx.strokeStyle = 'hsla(0, 0%, 45%, 0.1)';
      ctx.lineWidth = 1;
      particles.forEach((particle, i) => {
        particle.connections.forEach(connectionIndex => {
          const connected = particles[connectionIndex];
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(connected.x, connected.y);
          ctx.stroke();
        });
      });
      
      // Draw particles
      ctx.fillStyle = 'hsla(0, 0%, 45%, 0.3)';
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};
