import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Eye, Zap, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdvancedScrollReveal, SectionTransition, ParallaxBackground } from '@/components/ui/advanced-scroll';
import { DynamicHero } from '@/components/ui/dynamic-hero';
import { InteractiveCard } from '@/components/ui/interactive-card';
import { GridBackground } from '@/components/ui/grid-background';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { PrivacyBackground } from '@/components/ui/privacy-background';

export const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParallaxBackground speed={0.3}>
        <GridBackground />
        <PrivacyBackground intensity="medium" />
      </ParallaxBackground>

      {/* Hero Section */}
      <SectionTransition transitionType="reveal">
        <section className="relative pt-24 pb-16 overflow-hidden">
          <DynamicHero className="min-h-screen flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto text-center">
                <AdvancedScrollReveal delay={200} animation="morph">
                  <div className="mb-8">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-accent flex items-center justify-center mb-8 hover-tilt">
                      <img 
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23ffffff'%3E%3Cpath d='M50 15c-8.284 0-15 6.716-15 15v5c-8.284 0-15 6.716-15 15v20c0 8.284 6.716 15 15 15h30c8.284 0 15-6.716 15-15V50c0-8.284-6.716-15-15-15v-5c0-8.284-6.716-15-15-15zM45 50l10-10m0 20l-10-10m-5 0h20'/%3E%3C/svg%3E"
                        alt="Cloak Logo"
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                </AdvancedScrollReveal>

                <AdvancedScrollReveal delay={400} animation="staggered">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                    <span className="block mb-2 animate-typewriter-reveal">Private</span>
                    <span className="block text-primary mb-4 animate-typewriter-reveal" style={{ animationDelay: '0.5s' }}>Staking</span>
                    <span className="block text-xl md:text-2xl lg:text-3xl text-muted-foreground font-normal animate-typewriter-reveal" style={{ animationDelay: '1s' }}>
                      Redefined
                    </span>
                  </h1>
                </AdvancedScrollReveal>

                <AdvancedScrollReveal delay={600} animation="subtle-slide">
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-12">
                    Stake your SOL with complete anonymity using{' '}
                    <span className="text-primary font-medium">zero-knowledge technology</span>.
                    Your rewards, your privacy, your control.
                  </p>
                </AdvancedScrollReveal>

                <AdvancedScrollReveal delay={800} animation="spiral">
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link to="/app">
                      <Button size="lg" className="relative group overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow px-8 py-4 text-lg hover-tilt">
                        <span className="relative z-10 flex items-center">
                          Start Staking
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Button>
                    </Link>
                    
                    <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-border hover:bg-accent glass-card hover-tilt">
                      Learn More
                    </Button>
                  </div>
                </AdvancedScrollReveal>
              </div>
            </div>
          </DynamicHero>
        </section>
      </SectionTransition>

      {/* Privacy Comparison Section */}
      <SectionTransition transitionType="wipe">
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Traditional Staking Problems */}
                <AdvancedScrollReveal delay={200} animation="timeline-left">
                  <InteractiveCard variant="tilt" intensity="subtle" className="h-full border-destructive/20 bg-gradient-to-br from-destructive/5 to-background relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-destructive/40 to-transparent" />
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-destructive mb-1">Traditional Solana Staking</h3>
                          <p className="text-destructive/80 font-medium">Isn't Private</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                          <p className="text-lg font-semibold text-destructive mb-2">Your wallet. Your balance. Your staking choices.</p>
                          <p className="text-destructive/90 font-medium">All exposed.</p>
                        </div>

                        <div className="space-y-3">
                          {[
                            "Every delegation publicly links your wallet to a validator.",
                            "Anyone can see how much SOL you stake and when you move it.",
                            "Validators can identify your wallet and track your on-chain patterns.",
                            "Your economic identity becomes visible to analytics firms, bots, and attackers."
                          ].map((point, index) => (
                            <AdvancedScrollReveal key={index} delay={400 + index * 100} animation="staggered" staggerIndex={index + 1}>
                              <div className="flex items-start space-x-3 p-3 rounded-lg bg-destructive/5 hover-lift">
                                <div className="w-2 h-2 rounded-full bg-destructive/60 flex-shrink-0 mt-2" />
                                <p className="text-muted-foreground leading-relaxed">{point}</p>
                              </div>
                            </AdvancedScrollReveal>
                          ))}
                        </div>
                      </div>
                    </div>
                  </InteractiveCard>
                </AdvancedScrollReveal>

                {/* ZK Staking Solution */}
                <AdvancedScrollReveal delay={400} animation="timeline-right">
                  <InteractiveCard variant="glow" intensity="medium" className="h-full border-primary/20 bg-gradient-to-br from-primary/5 to-background relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-primary mb-1">ZK Staking</h3>
                          <p className="text-primary/80 font-medium">Privacy by Design</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                          <p className="text-lg font-semibold text-primary">Stake Solana without revealing your identity.</p>
                        </div>

                        <div className="space-y-3">
                          {[
                            "Zero-knowledge proofs verify your stake without exposing your wallet.",
                            "Breaks all links between you, your validator, and your staking amount.",
                            "Validators see a proof, not your balance or activity.",
                            "Earn native SOL rewards with complete privacy and no traceable footprint."
                          ].map((point, index) => (
                            <AdvancedScrollReveal key={index} delay={600 + index * 100} animation="staggered" staggerIndex={index + 1}>
                              <div className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5 hover-lift">
                                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-muted-foreground leading-relaxed">{point}</p>
                              </div>
                            </AdvancedScrollReveal>
                          ))}
                        </div>
                      </div>
                    </div>
                  </InteractiveCard>
                </AdvancedScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* Features Section */}
      <SectionTransition transitionType="slide">
        <section className="py-24 relative">
          <ParallaxBackground speed={0.2}>
            <div className="container mx-auto px-6">
              <AdvancedScrollReveal delay={200} animation="morph">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                    Privacy-First <span className="text-primary">Technology</span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Built on cutting-edge zero-knowledge proofs to ensure your staking activities 
                    remain completely private and untraceable.
                  </p>
                </div>
              </AdvancedScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <AdvancedScrollReveal delay={400} animation="staggered" staggerIndex={1}>
                  <InteractiveCard variant="shimmer" className="text-center h-full">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Zero-Knowledge Privacy</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Powered by Elusiv protocol, your staking transactions are completely anonymous and untraceable.
                    </p>
                  </InteractiveCard>
                </AdvancedScrollReveal>

                <AdvancedScrollReveal delay={600} animation="staggered" staggerIndex={2}>
                  <InteractiveCard variant="lift" className="text-center h-full">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Secure Infrastructure</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Enterprise-grade security with audited smart contracts and battle-tested protocols.
                    </p>
                  </InteractiveCard>
                </AdvancedScrollReveal>

                <AdvancedScrollReveal delay={800} animation="staggered" staggerIndex={3}>
                  <InteractiveCard variant="glow" className="text-center h-full">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Eye className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Anonymous Rewards</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Earn staking rewards without revealing your wallet address or transaction history.
                    </p>
                  </InteractiveCard>
                </AdvancedScrollReveal>
              </div>
            </div>
          </ParallaxBackground>
        </section>
      </SectionTransition>

      {/* Stats Section */}
      <SectionTransition transitionType="mask">
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <AdvancedScrollReveal delay={200} animation="parallax" parallaxSpeed={0.8}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <InteractiveCard variant="tilt" intensity="strong" className="text-center gradient-border bg-card">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">8.5%</div>
                  <div className="text-muted-foreground">Average APY</div>
                </InteractiveCard>

                <InteractiveCard variant="shimmer" className="text-center gradient-border bg-card">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">2.4K</div>
                  <div className="text-muted-foreground">Private Stakers</div>
                </InteractiveCard>

                <InteractiveCard variant="glow" intensity="strong" className="text-center gradient-border bg-card">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">$12M</div>
                  <div className="text-muted-foreground">Total Value Locked</div>
                </InteractiveCard>
              </div>
            </AdvancedScrollReveal>
          </div>
        </section>
      </SectionTransition>

      {/* How It Works */}
      <SectionTransition transitionType="reveal">
        <section className="py-24 relative">
          <div className="container mx-auto px-6">
            <AdvancedScrollReveal delay={200} animation="morph">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  How It <span className="text-primary">Works</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Three simple steps to private staking with zero-knowledge technology.
                </p>
              </div>
            </AdvancedScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Connect Wallet', desc: 'Connect your Solana wallet securely' },
                { step: '02', title: 'Private Deposit', desc: 'Deposit SOL using zero-knowledge proofs' },
                { step: '03', title: 'Earn Rewards', desc: 'Earn staking rewards anonymously' }
              ].map((item, index) => (
                <AdvancedScrollReveal key={item.step} delay={400 + index * 200} animation="staggered" staggerIndex={index + 1}>
                  <InteractiveCard variant="lift" className="relative geometric-accent">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary hover-tilt">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <CheckCircle className="absolute top-6 right-6 w-5 h-5 text-primary/40" />
                  </InteractiveCard>
                </AdvancedScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </SectionTransition>

      {/* CTA Section */}
      <SectionTransition transitionType="slide">
        <section className="py-24 relative">
          <div className="container mx-auto px-6 text-center">
            <AdvancedScrollReveal delay={200} animation="spiral">
              <InteractiveCard variant="shimmer" intensity="strong" className="max-w-4xl mx-auto gradient-border bg-card">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Ready to Stake <span className="text-primary">Privately?</span>
                  </h2>
                  
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Join thousands of users who have chosen privacy over transparency. 
                    Your financial activities should remain your business.
                  </p>
                  
                  <div className="pt-4">
                    <Link to="/app">
                      <Button size="lg" className="relative group overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow px-10 py-5 text-xl hover-tilt">
                        <span className="relative z-10 flex items-center">
                          Launch App
                          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-3 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </InteractiveCard>
            </AdvancedScrollReveal>
          </div>
        </section>
      </SectionTransition>
    </div>
  );
};
