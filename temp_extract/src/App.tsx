import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PrivacyLoader } from '@/components/ui/privacy-loader';
import { HomePage } from '@/pages/home';
import { AppPage } from '@/pages/app';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {isLoading && (
            <PrivacyLoader onComplete={handleLoadingComplete} />
          )}
          
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/app" element={<AppPage />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
