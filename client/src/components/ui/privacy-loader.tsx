import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface PrivacyLoaderProps {
  onComplete: () => void;
}

export const PrivacyLoader: React.FC<PrivacyLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'exposed' | 'cloaking' | 'secured' | 'breaking'>('exposed');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('cloaking'), 1500);
    const timer2 = setTimeout(() => setPhase('secured'), 3000);
    const timer3 = setTimeout(() => setPhase('breaking'), 3800);
    const timer4 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-colors duration-1000 ${
      phase === 'exposed' ? 'bg-destructive/5' : 'bg-background'
    }`}>
      
      {/* Grid Pattern - Fades out on break */}
      <motion.div 
        animate={{ opacity: phase === 'breaking' ? 0 : 0.1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8">
        
        {/* Central Animation Container */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
          
          {/* PHASE 1: EXPOSED */}
          <AnimatePresence mode="wait">
            {phase === 'exposed' && (
              <motion.div
                key="exposed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <AlertTriangle className="w-24 h-24 text-destructive animate-pulse" />
                  <div className="absolute inset-0 border border-destructive/50 rounded-full animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PHASE 2, 3, 4: THE LOGO */}
          {(phase === 'cloaking' || phase === 'secured' || phase === 'breaking') && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.5, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: phase === 'breaking' ? 20 : (phase === 'secured' ? 1.2 : 1),
                y: 0,
                filter: phase === 'secured' ? 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' : 'none'
              }}
              transition={{ 
                duration: phase === 'breaking' ? 0.8 : 0.8, 
                ease: phase === 'breaking' ? "easeIn" : "backOut" 
              }}
            >
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                
                {/* Left Shard */}
                <motion.path 
                  d="M50 5 L 10 90 L 50 75" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-foreground"
                  animate={{ 
                    x: phase === 'breaking' ? -200 : 0,
                    opacity: phase === 'breaking' ? 0 : 1 
                  }}
                  transition={{ duration: 0.6, ease: "anticipate" }}
                />

                {/* Right Shard */}
                <motion.path 
                  d="M50 5 L 90 90 L 50 75" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-foreground"
                  animate={{ 
                    x: phase === 'breaking' ? 200 : 0,
                    opacity: phase === 'breaking' ? 0 : 1 
                  }}
                  transition={{ duration: 0.6, ease: "anticipate" }}
                />

                {/* Inner Core - Fades/Explodes on break */}
                <motion.g
                  animate={{ 
                    scale: phase === 'breaking' ? 5 : 1,
                    opacity: phase === 'breaking' ? 0 : 1 
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <path 
                    d="M50 25 L 70 75 L 50 65 L 30 75 L 50 25 Z" 
                    fill="currentColor"
                    className="opacity-20 text-foreground"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="5" 
                    fill="currentColor" 
                    className="text-foreground"
                  />
                  <path 
                    d="M50 50 V 75" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="opacity-60 text-foreground"
                  />
                </motion.g>

              </svg>
            </motion.div>
          )}
        </div>

        {/* Text Status Updates - Fade out on break */}
        <motion.div 
          animate={{ opacity: phase === 'breaking' ? 0 : 1 }}
          className="h-20 flex flex-col items-center justify-start text-center space-y-2"
        >
          <AnimatePresence mode="wait">
            
            {phase === 'exposed' && (
              <motion.div
                key="text-exposed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-destructive font-mono tracking-widest"
              >
                <span className="block text-sm mb-1 opacity-70">SYSTEM ALERT</span>
                <span className="text-xl font-bold">PUBLIC LEDGER DETECTED</span>
              </motion.div>
            )}

            {phase === 'cloaking' && (
              <motion.div
                key="text-cloaking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-foreground font-mono tracking-widest"
              >
                <span className="block text-sm mb-1 opacity-70">INITIALIZING ZK-PROOFS</span>
                <span className="text-xl font-bold">ENCRYPTING ASSETS...</span>
              </motion.div>
            )}

            {phase === 'secured' && (
              <motion.div
                key="text-secured"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-mono tracking-widest"
              >
                <span className="block text-sm mb-1 opacity-70">STATUS</span>
                <span className="text-xl font-bold text-white drop-shadow-glow">CONNECTION SECURED</span>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
        
        {/* Loading Bar - Fade out on break */}
        <motion.div 
          animate={{ opacity: phase === 'breaking' ? 0 : 1 }}
          className="w-64 h-1 bg-secondary/30 rounded-full overflow-hidden mt-8"
        >
           <motion.div 
             className="h-full bg-white shadow-[0_0_10px_white]"
             initial={{ width: "0%" }}
             animate={{ 
               width: phase === 'exposed' ? "30%" : phase === 'cloaking' ? "80%" : "100%",
               backgroundColor: phase === 'exposed' ? "var(--destructive)" : "white"
             }}
             transition={{ duration: 1 }}
           />
        </motion.div>

      </div>
    </div>
  );
};
