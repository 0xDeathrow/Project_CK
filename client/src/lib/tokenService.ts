import type { TokenData, JupiterPriceResponse } from '@/types/token';

export const fetchTokenList = async (): Promise<TokenData[]> => {
  // Mock token list
  return [
    {
      address: 'So11111111111111111111111111111111111111112',
      symbol: 'SOL',
      name: 'Solana',
      decimals: 9,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
      tags: [],
      extensions: {}
    },
    {
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
      tags: [],
      extensions: {}
    }
  ];
};

export const getSolBalance = async (publicKey: string): Promise<number> => {
  return 125.48; // Mock balance
};

export const getTokenAccounts = async (publicKey: string): Promise<any[]> => {
  return []; // Mock token accounts
};

export const getTokenPrices = async (addresses: string[]): Promise<JupiterPriceResponse> => {
  return {
    prices: {
      'So11111111111111111111111111111111111111112': 150.25,
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 1.0
    }
  };
};
