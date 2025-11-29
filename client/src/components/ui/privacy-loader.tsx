import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloakLogo } from '@/components/ui/logo';
import { Lock, Shield, AlertTriangle } from 'lucide-react';

interface PrivacyLoaderProps {
  onComplete: () => void;
}

export const PrivacyLoader: React.FC<PrivacyLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'exposed' | 'cloaking' | 'secured'>('exposed');

  useEffect(() => {
    // Timeline
    const timer1 = setTimeout(() => setPhase('cloaking'), 1500);
    const timer2 = setTimeout(() => setPhase('secured'), 3000);
    const timer3 = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden">
      
      {/* Background Ambience - Changes with phase */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        phase === 'exposed' ? 'bg-destructive/5' : 'bg-background'
      }`} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-8">
        
        {/* Central Animation Container */}
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
          
          {/* PHASE 1: EXPOSED (Red Glitch) */}
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
                  {/* Glitch Effect Circles */}
                  <div className="absolute inset-0 border border-destructive/50 rounded-full animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="absolute inset-0 border border-destructive/30 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PHASE 2 & 3: CLOAK LOGO (The Savior) */}
          <AnimatePresence>
            {(phase === 'cloaking' || phase === 'secured') && (
              <motion.div
                key="cloak"
                initial={{ opacity: 0, scale: 1.5, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: phase === 'secured' ? 1.2 : 1, 
                  y: 0,
                  filter: phase === 'secured' ? 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' : 'none'
                }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-32 h-32 text-foreground relative">
                   <CloakLogo />
                   {/* Shield Forming Animation */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                     <motion.circle 
                        cx="50" cy="50" r="48" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                     />
                   </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Status Updates */}
        <div className="h-20 flex flex-col items-center justify-start text-center space-y-2">
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
        </div>
        
        {/* Loading Bar */}
        <div className="w-64 h-1 bg-secondary/30 rounded-full overflow-hidden mt-8">
           <motion.div 
             className="h-full bg-white shadow-[0_0_10px_white]"
             initial={{ width: "0%" }}
             animate={{ 
               width: phase === 'exposed' ? "30%" : phase === 'cloaking' ? "80%" : "100%",
               backgroundColor: phase === 'exposed' ? "var(--destructive)" : "white"
             }}
             transition={{ duration: 1 }}
           />
        </div>

      </div>
    </div>
  );
};
