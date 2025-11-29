import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, animate, useTransform } from 'framer-motion';
import { CloakLogo } from '@/components/ui/logo';
import { AlertTriangle } from 'lucide-react';

interface PrivacyLoaderProps {
  onComplete: () => void;
}

export const PrivacyLoader: React.FC<PrivacyLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'exposed' | 'cloaking' | 'secured' | 'expanding'>('exposed');
  
  // Motion value for the portal mask radius (0 to 150 vmax)
  const maskRadius = useMotionValue(0);
  // Create the dynamic mask image string
  const maskImage = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${maskRadius}vmax, black ${maskRadius}vmax)`;

  // Transform maskRadius to size for the glowing ring
  const ringSize = useTransform(maskRadius, r => `${r * 2}vmax`);

  useEffect(() => {
    // Timeline
    const timer1 = setTimeout(() => setPhase('cloaking'), 1500);
    const timer2 = setTimeout(() => setPhase('secured'), 3000);
    
    // Start expansion after secured phase build-up
    const timer3 = setTimeout(() => {
      setPhase('expanding');
      // Animate the mask opening
      animate(maskRadius, 150, {
        duration: 1.5,
        ease: [0.645, 0.045, 0.355, 1.000], // cubic-bezier for smooth "portal" feel
        onComplete: () => onComplete()
      });
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete, maskRadius]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      style={{ 
        // Apply the mask only during the expanding phase to reveal content behind
        maskImage: phase === 'expanding' ? maskImage : 'none',
        WebkitMaskImage: phase === 'expanding' ? maskImage : 'none'
      }}
    >
      
      {/* Background Ambience - Changes with phase */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        phase === 'exposed' ? 'bg-destructive/5' : 'bg-background'
      }`} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* PORTAL GLOW RING - Visible during expansion */}
      {phase === 'expanding' && (
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-50"
          style={{ 
            width: ringSize, 
            height: ringSize,
            boxShadow: '0 0 50px 20px rgba(255, 255, 255, 0.8), inset 0 0 20px 10px rgba(255, 255, 255, 0.5)'
          }}
        />
      )}

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

          {/* PHASE 2, 3, 4: CLOAK LOGO (The Savior) */}
          <AnimatePresence>
            {(phase === 'cloaking' || phase === 'secured' || phase === 'expanding') && (
              <motion.div
                key="cloak"
                initial={{ opacity: 0, scale: 1.5, y: 20 }}
                animate={{ 
                  opacity: 1, // Keep logo visible even during expansion (it gets eaten by the portal)
                  scale: phase === 'secured' ? 1.2 : phase === 'expanding' ? 1.5 : 1, 
                  y: 0,
                  filter: phase === 'secured' ? 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' : 'none'
                }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-32 h-32 text-foreground relative">
                   <CloakLogo />
                   
                   {/* Shield Forming Animation */}
                   {phase === 'cloaking' && (
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
                   )}

                   {/* THE PORTAL NODE - Only visible in Secured/Expanding phase */}
                   {(phase === 'secured' || phase === 'expanding') && (
                     <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full z-20 pointer-events-none"
                        initial={{ width: 10, height: 10, opacity: 0 }}
                        animate={
                          phase === 'expanding' 
                            ? { width: 0, height: 0, opacity: 0 } // Vanish as the portal mask takes over
                            : { width: 12, height: 12, opacity: 1 }
                        }
                        transition={
                          phase === 'expanding' 
                            ? { duration: 0.2 } // Quick vanish
                            : { duration: 0.2 }
                        }
                     >
                        {/* Pulsing Core Effect in Secured Phase */}
                        {phase === 'secured' && (
                          <motion.div 
                            className="absolute inset-0 bg-white rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
                            transition={{ duration: 0.2, repeat: Infinity }} // Fast pulse
                          />
                        )}
                     </motion.div>
                   )}
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

            {(phase === 'secured' || phase === 'expanding') && (
              <motion.div
                key="text-secured"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: phase === 'expanding' ? 0 : 1, y: 0 }}
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
               backgroundColor: phase === 'exposed' ? "var(--destructive)" : "white",
               opacity: phase === 'expanding' ? 0 : 1
             }}
             transition={{ duration: 1 }}
           />
        </div>

      </div>
    </motion.div>
  );
};
