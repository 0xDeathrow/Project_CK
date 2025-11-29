import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-gradient-primary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold">CLOAK</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Private staking powered by zero-knowledge technology. 
              Your transactions, your privacy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Privacy</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Zero-Knowledge Proofs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Anonymous Staking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Elusiv Protocol</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Security Audit
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Discord
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Cloak. All rights reserved. Privacy-first staking protocol.
          </p>
        </div>
      </div>
    </footer>
  );
};
