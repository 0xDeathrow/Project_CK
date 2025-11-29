import React, { createContext, useContext, useMemo, useState } from 'react';

// Mock Types
export interface PublicKey {
  toString(): string;
  toBase58(): string;
}

export interface WalletContextState {
  connected: boolean;
  publicKey: PublicKey | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  select: (walletName: string) => void;
}

export enum WalletAdapterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
}

// Mock Context
const WalletContext = createContext<WalletContextState>({
  connected: false,
  publicKey: null,
  connect: async () => {},
  disconnect: async () => {},
  select: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const ConnectionProvider: React.FC<{ children: React.ReactNode; endpoint: string }> = ({ children }) => {
  return <>{children}</>;
};

export const WalletProvider: React.FC<{ children: React.ReactNode; wallets: any[]; autoConnect?: boolean }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  const connect = async () => {
    setConnected(true);
    setPublicKey({
      toString: () => '8x2...3z9',
      toBase58: () => '8x2...3z9',
    });
  };

  const disconnect = async () => {
    setConnected(false);
    setPublicKey(null);
  };

  const select = () => {};

  return (
    <WalletContext.Provider value={{ connected, publicKey, connect, disconnect, select }}>
      {children}
    </WalletContext.Provider>
  );
};

export const WalletModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const WalletMultiButton: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const { connected, connect, disconnect, publicKey } = useWallet();

  return (
    <button
      onClick={connected ? disconnect : connect}
      style={{
        ...style,
        cursor: 'pointer',
      }}
      className="wallet-adapter-button"
    >
      {connected ? (publicKey?.toString().slice(0, 4) + '...' + publicKey?.toString().slice(-4)) : 'Select Wallet'}
    </button>
  );
};

export const PhantomWalletAdapter = class {
  name = 'Phantom';
  url = 'https://phantom.app';
  icon = 'https://www.phantom.app/img/logo.png';
};
