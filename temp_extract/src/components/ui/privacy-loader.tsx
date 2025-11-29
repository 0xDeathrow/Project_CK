import React, { useEffect, useState } from 'react';

interface PrivacyLoaderProps {
  onComplete: () => void;
}

export const PrivacyLoader: React.FC<PrivacyLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'eye' | 'strike' | 'complete'>('eye');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('strike'), 1800);
    const timer2 = setTimeout(() => setPhase('complete'), 3600);
    const timer3 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-background to-background/95 flex items-center justify-center backdrop-blur-sm">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] bg-[length:32px_32px]" />
      </div>

      {/* Main animation container */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Eye animation */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Eye container */}
          <div className={`relative transition-all duration-1000 ${
            phase === 'eye' ? 'scale-100 opacity-100' : 'scale-95 opacity-40'
          }`}>
            {/* Eye outline */}
            <div className="w-24 h-12 border-2 border-primary/60 rounded-full relative overflow-hidden bg-background/20 backdrop-blur-sm">
              {/* Iris */}
              <div className={`absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-br from-primary/80 to-primary/40 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                phase === 'eye' ? 'animate-subtle-glow scale-100' : 'scale-75 opacity-60'
              }`}>
                {/* Pupil */}
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-background rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                
                {/* Iris reflection */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-primary/30 rounded-full" />
              </div>
              
              {/* Eyelid animation for blinking */}
              <div className={`absolute inset-0 bg-background transition-all duration-300 ${
                phase === 'eye' ? 'animate-subtle-blink' : ''
              }`} style={{
                clipPath: phase === 'eye' ? 'inset(0 0 85% 0)' : 'inset(0 0 100% 0)'
              }} />
            </div>
            
            {/* Scanning lines effect */}
            <div className={`absolute inset-0 pointer-events-none ${
              phase === 'eye' ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan-line" />
            </div>
          </div>

          {/* Strike through animation */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ${
            phase === 'strike' || phase === 'complete' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}>
            {/* Strike line */}
            <div className={`w-0 h-0.5 bg-gradient-to-r from-destructive/80 via-destructive to-destructive/80 shadow-glow transition-all duration-1000 ${
              phase === 'strike' || phase === 'complete' ? 'w-40' : 'w-0'
            }`} />
            
            {/* Impact effect */}
            <div className={`absolute w-2 h-2 bg-destructive rounded-full transition-all duration-500 ${
              phase === 'strike' || phase === 'complete' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <div className="absolute inset-0 bg-destructive rounded-full animate-ping opacity-30" />
            </div>
          </div>

          {/* Shield overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 delay-300 ${
            phase === 'complete' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}>
            <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text animation */}
        <div className="text-center space-y-4">
          <div className={`transition-all duration-700 ${
            phase === 'eye' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-4xl font-bold tracking-tight mb-2">CLOAK</h1>
            <p className="text-muted-foreground">Initializing privacy layer...</p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${
            phase === 'strike' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-primary font-medium">Blocking surveillance...</p>
          </div>

          <div className={`transition-all duration-700 delay-400 ${
            phase === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-primary font-medium">Privacy secured ✓</p>
          </div>
        </div>

        {/* Loading progress indicator */}
        <div className="w-48 h-0.5 bg-muted rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full transition-all duration-2500 ease-out ${
            phase === 'complete' ? 'w-full' : phase === 'strike' ? 'w-2/3' : 'w-1/3'
          }`} />
        </div>
      </div>

      {/* Fade out overlay */}
      <div className={`absolute inset-0 bg-background transition-all duration-700 ${
        phase === 'complete' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} />
    </div>
  );
};
