import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Lock, Zap, Network, Cpu, Globe } from 'lucide-react';
import { RevealOnScroll, ParallaxElement, StaggerContainer, StaggerItem, TechGlowCard } from '@/components/ui/motion-system';

import { CloakLogo } from '@/components/ui/logo';

export const HomePage: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Background parallax elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">
      
      {/* Global Animated Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Abstract Floating Shapes (Tech Feel) */}
      <motion.div 
        style={{ y: bgY1 }} 
        className="fixed top-20 right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none z-0" 
      />
      <motion.div 
        style={{ y: bgY2 }} 
        className="fixed bottom-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[80px] pointer-events-none z-0" 
      />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 relative inline-block"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-20 rounded-full" />
            <div className="w-32 h-32 md:w-48 md:h-48 relative z-10 drop-shadow-2xl mx-auto">
              <CloakLogo className="w-full h-full text-foreground" />
            </div>
          </motion.div>

          {/* Headline */}
          <StaggerContainer className="space-y-6 mb-12">
            <StaggerItem>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                PRIVACY <br /> REDEFINED
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                The next generation of <span className="text-primary font-medium">zero-knowledge</span> staking infrastructure. 
                Anonymous. Secure. Limitless.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-white transition-all duration-300 rounded-full group">
                  Launch App 
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 rounded-full backdrop-blur-sm">
                  Read Documentation
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </motion.div>
      </section>


      {/* ---------------- PRIVACY GAP (COMPARISON) ---------------- */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="mb-24 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              The Privacy Gap
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Two worlds. One choice.
            </p>
          </RevealOnScroll>

          <div className="relative">
            {/* Central Divider Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0">
              
              {/* LEFT SIDE: PUBLIC LEDGER */}
              <div className="lg:pr-16 lg:text-right">
                <RevealOnScroll>
                  <div className="mb-8 flex flex-col lg:items-end items-center">
                    <div className="p-4 rounded-full bg-destructive/10 text-destructive mb-4 inline-block">
                      <Globe className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-destructive mb-2 tracking-tight">PUBLIC LEDGER</h3>
                    <p className="text-destructive/60 font-mono text-sm uppercase tracking-widest">Exposure Level: Critical</p>
                  </div>

                  <div className="space-y-12">
                    {[
                      { title: "Wallet Visibility", status: "EXPOSED", desc: "Your entire transaction history is permanently recorded for anyone to see." },
                      { title: "Staking Pattern", status: "TRACEABLE", desc: "Validators and analytics firms build a profile of your economic behavior." },
                      { title: "Asset Flow", status: "MONITORED", desc: "Every movement of funds is tracked, linked, and analyzed." }
                    ].map((item, i) => (
                      <div key={i} className="group relative">
                        <div className="absolute top-0 right-0 lg:-right-16 w-3 h-3 rounded-full bg-destructive/30 mt-2 hidden lg:block group-hover:bg-destructive group-hover:scale-125 transition-all duration-300" />
                        <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-destructive transition-colors">{item.title}</h4>
                        <div className="inline-block px-2 py-1 rounded bg-destructive/10 text-destructive text-xs font-mono mb-2">{item.status}</div>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>

              {/* RIGHT SIDE: ZERO KNOWLEDGE */}
              <div className="lg:pl-16">
                <RevealOnScroll delay={0.2}>
                  <div className="mb-8 flex flex-col lg:items-start items-center">
                    <div className="p-4 rounded-full bg-primary/10 text-primary mb-4 inline-block shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">ZERO KNOWLEDGE</h3>
                    <p className="text-primary font-mono text-sm uppercase tracking-widest">Security Level: Maximum</p>
                  </div>

                  <div className="space-y-12">
                    {[
                      { title: "Cryptographic Shield", status: "SECURE", desc: "Mathematical proofs verify your stake without ever revealing your wallet address." },
                      { title: "Untraceable Actions", status: "PRIVATE", desc: "Break the link between your identity and your on-chain activity completely." },
                      { title: "Invisible Assets", status: "HIDDEN", desc: "Your funds remain yours, but their existence and movement are visible only to you." }
                    ].map((item, i) => (
                      <div key={i} className="group relative">
                         <div className="absolute top-0 left-0 lg:-left-16 w-3 h-3 rounded-full bg-primary/50 mt-2 hidden lg:block shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:scale-125 transition-all duration-300" />
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                        <div className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-xs font-mono mb-2">{item.status}</div>
                        <p className="text-foreground/80 leading-relaxed text-lg">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES GRID (Arcium Style) ---------------- */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="mb-24">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Infrastructure for the <br />
              <span className="text-muted-foreground">Invisible Economy</span>
            </h2>
            <div className="h-1 w-24 bg-primary/30 rounded-full" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-2">
              <RevealOnScroll delay={0.1}>
                <TechGlowCard className="h-[400px] flex flex-col justify-end">
                  <div className="absolute top-0 right-0 p-10 opacity-20">
                    <Shield className="w-64 h-64 stroke-[0.5]" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Zero-Knowledge Proofs</h3>
                    <p className="text-muted-foreground text-lg max-w-md">
                      Cryptographic verification without revealing the underlying data. Your stake remains mathematically proven yet completely invisible.
                    </p>
                  </div>
                </TechGlowCard>
              </RevealOnScroll>
            </div>

            {/* Feature 2 */}
            <div className="md:col-span-1">
              <RevealOnScroll delay={0.2}>
                <TechGlowCard className="h-[400px] flex flex-col justify-end">
                   <div className="absolute top-10 right-10 opacity-20">
                    <Lock className="w-32 h-32 stroke-[0.5]" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Untraceable</h3>
                    <p className="text-muted-foreground">
                      Break the link between your wallet and your validator. No on-chain footprint.
                    </p>
                  </div>
                </TechGlowCard>
              </RevealOnScroll>
            </div>

            {/* Feature 3 */}
            <div className="md:col-span-1">
              <RevealOnScroll delay={0.3}>
                <TechGlowCard className="h-[400px] flex flex-col justify-end">
                   <div className="absolute top-10 right-10 opacity-20">
                    <Network className="w-32 h-32 stroke-[0.5]" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Liquid Privacy</h3>
                    <p className="text-muted-foreground">
                      Maintain liquidity while staying private. Compatible with standard DeFi protocols.
                    </p>
                  </div>
                </TechGlowCard>
              </RevealOnScroll>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2">
              <RevealOnScroll delay={0.4}>
                <TechGlowCard className="h-[400px] flex flex-col justify-end bg-gradient-to-br from-card to-primary/5">
                   <div className="absolute top-0 right-0 p-10 opacity-20">
                    <Cpu className="w-64 h-64 stroke-[0.5]" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Institutional Grade</h3>
                    <p className="text-muted-foreground text-lg max-w-md">
                      Built for high-volume stakers requiring absolute confidentiality. Audited smart contracts ensuring fund safety.
                    </p>
                  </div>
                </TechGlowCard>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>


      {/* ---------------- HORIZONTAL SCROLL / BIG TEXT ---------------- */}
      <section className="py-32 bg-foreground text-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
                PROTECT <br />
                YOUR <br />
                FUNDS
              </h2>
              <p className="text-xl md:text-2xl max-w-md font-medium opacity-80">
                In a transparent world, privacy is the ultimate competitive advantage. Cloak gives you the power to disappear.
              </p>
            </div>
          </RevealOnScroll>
        </div>
        
        {/* Marquee / Ticker */}
        <div className="mt-24 border-y border-black/10 py-6 overflow-hidden whitespace-nowrap flex">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-24 items-center text-6xl md:text-8xl font-bold tracking-tighter opacity-10 select-none"
          >
            <span>NO TRACKING</span>
            <span>NO SURVEILLANCE</span>
            <span>PURE ANONYMITY</span>
            <span>CLOAK PROTOCOL</span>
            <span>NO TRACKING</span>
            <span>NO SURVEILLANCE</span>
            <span>PURE ANONYMITY</span>
            <span>CLOAK PROTOCOL</span>
          </motion.div>
        </div>
      </section>


      {/* ---------------- CTA SECTION ---------------- */}
      <section className="relative py-40 px-6 flex justify-center items-center">
        <div className="max-w-4xl mx-auto text-center z-10">
          <RevealOnScroll>
            <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
              GO DARK
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the thousands of users who have already secured their financial privacy.
            </p>
            <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-foreground text-background hover:bg-white/90 transition-all hover:scale-105">
              Launch App
            </Button>
          </RevealOnScroll>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0" />
      </section>

    </div>
  );
};
