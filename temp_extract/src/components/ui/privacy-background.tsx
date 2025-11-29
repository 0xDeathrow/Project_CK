import React, { useEffect, useRef, useState } from 'react';

interface PrivacyBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const PrivacyBackground: React.FC<PrivacyBackgroundProps> = ({ 
  className = '', 
  intensity = 'medium' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      type: 'scan' | 'data' | 'node';
    }> = [];

    const scanLines: Array<{
      y: number;
      speed: number;
      opacity: number;
      direction: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initElements = () => {
      // Initialize scan lines
      for (let i = 0; i < 3; i++) {
        scanLines.push({
          y: Math.random() * canvas.height,
          speed: 0.5 + Math.random() * 0.5,
          opacity: 0.1 + Math.random() * 0.2,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }

      // Initialize particles
      const particleCount = intensity === 'low' ? 20 : intensity === 'medium' ? 40 : 60;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: Math.random() * 200,
          maxLife: 200 + Math.random() * 100,
          type: ['scan', 'data', 'node'][Math.floor(Math.random() * 3)] as 'scan' | 'data' | 'node'
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw scan lines
      scanLines.forEach((line) => {
        line.y += line.speed * line.direction;
        
        if (line.y < 0 || line.y > canvas.height) {
          line.direction *= -1;
          line.y = Math.max(0, Math.min(canvas.height, line.y));
        }
        
        // Draw scan line
        const gradient = ctx.createLinearGradient(0, line.y - 1, 0, line.y + 1);
        gradient.addColorStop(0, `hsla(210, 40%, 55%, 0)`);
        gradient.addColorStop(0.5, `hsla(210, 40%, 55%, ${line.opacity})`);
        gradient.addColorStop(1, `hsla(210, 40%, 55%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, line.y - 1, canvas.width, 2);
      });

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.life++;
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Boundary bounce
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Reset particle if life exceeded
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
        
        const lifeRatio = particle.life / particle.maxLife;
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.3;
        
        switch (particle.type) {
          case 'scan':
            // Scanning effect particles
            ctx.fillStyle = `hsla(210, 40%, 55%, ${alpha})`;
            ctx.fillRect(particle.x - 0.5, particle.y - 0.5, 1, 1);
            break;
            
          case 'data':
            // Data stream particles
            ctx.fillStyle = `hsla(217, 32%, 25%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'node':
            // Network nodes
            ctx.fillStyle = `hsla(210, 40%, 55%, ${alpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
      });

      // Draw network connections
      particles.forEach((particle, i) => {
        if (particle.type !== 'node') return;
        
        particles.forEach((other, j) => {
          if (i >= j || other.type !== 'node') return;
          
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = `hsla(210, 40%, 55%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      // Mouse interaction effect
      if (mousePosition.x && mousePosition.y) {
        const mouseX = mousePosition.x * canvas.width;
        const mouseY = mousePosition.y * canvas.height;
        
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 150
        );
        gradient.addColorStop(0, 'hsla(210, 40%, 55%, 0.05)');
        gradient.addColorStop(1, 'hsla(210, 40%, 55%, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initElements();
    animate();

    const handleResize = () => {
      resizeCanvas();
      particles.length = 0;
      scanLines.length = 0;
      initElements();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, mousePosition]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-0 ${className}`}
        style={{ 
          background: 'transparent',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Additional CSS-based effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Vertical scanning lines */}
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan-vertical" />
        <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan-vertical-delayed" />
        
        {/* Privacy detection grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full bg-[radial-gradient(circle_at_2px_2px,hsl(var(--primary))_1px,transparent_0)] bg-[length:60px_60px] animate-grid-pulse" />
        </div>
      </div>
    </>
  );
};
