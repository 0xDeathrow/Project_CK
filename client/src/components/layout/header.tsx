import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { WalletMultiButton } from '@/lib/solana-mock';

import { CloakLogo } from '@/components/ui/logo';

export const Header: React.FC = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-8 h-8 overflow-hidden">
              <CloakLogo className="w-full h-full text-foreground transition-transform duration-500 group-hover:scale-110" />
            </div>
            <span className="text-xl font-bold tracking-wide font-display text-foreground">
              CLOAK
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Features', 'Documentation'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                  location === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <WalletMultiButton 
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '10px 24px',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
