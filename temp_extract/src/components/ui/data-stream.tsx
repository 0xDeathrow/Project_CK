import React, { useEffect, useState } from 'react';

interface DataStreamProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  speed?: 'slow' | 'medium' | 'fast';
  density?: 'low' | 'medium' | 'high';
}

export const DataStream: React.FC<DataStreamProps> = ({
  className = '',
  direction = 'horizontal',
  speed = 'medium',
  density = 'medium'
}) => {
  const [streams, setStreams] = useState<Array<{ id: string; delay: number; size: number }>>([]);

  const getStreamCount = () => {
    switch (density) {
      case 'low': return 3;
      case 'medium': return 6;
      case 'high': return 12;
      default: return 6;
    }
  };

  const getAnimationDuration = () => {
    switch (speed) {
      case 'slow': return '6s';
      case 'medium': return '3s';
      case 'fast': return '1.5s';
      default: return '3s';
    }
  };

  useEffect(() => {
    const streamCount = getStreamCount();
    const newStreams = Array.from({ length: streamCount }, (_, i) => ({
      id: `stream-${i}`,
      delay: i * 0.5,
      size: Math.random() * 3 + 1
    }));
    setStreams(newStreams);
  }, [density]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {streams.map((stream) => (
        <div
          key={stream.id}
          className={`absolute bg-gradient-to-r from-transparent via-primary to-transparent opacity-30 ${
            direction === 'horizontal' ? 'w-20 h-0.5 top-1/2 -translate-y-1/2' : 'w-0.5 h-20 left-1/2 -translate-x-1/2'
          }`}
          style={{
            animation: `dataFlow ${getAnimationDuration()} linear infinite`,
            animationDelay: `${stream.delay}s`,
            height: direction === 'horizontal' ? `${stream.size}px` : '20px',
            width: direction === 'vertical' ? `${stream.size}px` : '20px',
            top: direction === 'horizontal' ? `${Math.random() * 100}%` : '0',
            left: direction === 'vertical' ? `${Math.random() * 100}%` : '0',
          }}
        />
      ))}
    </div>
  );
};
