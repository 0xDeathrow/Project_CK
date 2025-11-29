import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { WalletMultiButton } from '@/lib/solana-mock'; // Use mock wallet
import { Shield } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-card shadow-elegant' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-105">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23ffffff'%3E%3Cpath d='M50 15c-8.284 0-15 6.716-15 15v5c-8.284 0-15 6.716-15 15v20c0 8.284 6.716 15 15 15h30c8.284 0 15-6.716 15-15V50c0-8.284-6.716-15-15-15v-5c0-8.284-6.716-15-15-15zM45 50l10-10m0 20l-10-10m-5 0h20'/%3E%3C/svg%3E"
                  alt="Cloak Logo"
                  className="w-6 h-6 transition-all duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              CLOAK
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`relative text-sm font-medium transition-all duration-200 group ${
                location === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
              {location === '/' && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
              <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded" />
            </Link>
            
            <Link 
              href="/app" 
              className={`relative text-sm font-medium transition-all duration-200 group ${
                location === '/app' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Stake
              {location === '/app' && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
              <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded" />
            </Link>
          </nav>

          {/* Wallet Button */}
          <div className="relative">
            <WalletMultiButton 
              style={{
                backgroundColor: 'transparent',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
                padding: '12px 20px',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(8px)',
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
