import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import type { TokenData, TokenPair, DexScreenerResponse, JupiterPriceResponse } from '@/types/token';
import Env from '@/envConfig';

const DEVENT_RPC_URL = 'https://api.devnet.solana.com'
export const SOLANA_RPC_URL = Env.SOLANA_RPC_URL || DEVENT_RPC_URL;

export const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

export const fetchTokenList = async (): Promise<TokenData[]> => {
  try {
    const response = await fetch('https://token.jup.ag/strict');
    const tokens = await response.json();
    return tokens;
  } catch (error) {
    return [];
  }
};

/**
 * @param query string — required  
 * Search for a token and its information by its symbol, name, or mint address.  
 * You can comma-separate multiple mint addresses to search for more than one at a time.  
 * Limit to **100 mint addresses** per query.  
 * Defaults to **20 mints** in the response when searching via symbol or name.
 */

export async function getTokenDataByAddress(mint: string): Promise<TokenData | undefined> {
  try {
    if (!mint) {
      return undefined;
    }

    const response = await fetch(`https://lite-api.jup.ag/tokens/v2/search?query=${mint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return undefined;
    }

    const token: TokenData = await response.json();
    return token;
  } catch (error) {
    return undefined;
  }
}


export async function getTokenAddressFromTicker(ticker: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/search?q=${ticker}`,
    );
    const data: DexScreenerResponse = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return null;
    }

    let solanaPairs = data.pairs
      .filter((pair: TokenPair) => pair.chainId === "solana")
      .sort((a: TokenPair, b: TokenPair) => (b.fdv || 0) - (a.fdv || 0));

    solanaPairs = solanaPairs.filter(
      (pair: TokenPair) =>
        pair.baseToken.symbol.toLowerCase() === ticker.toLowerCase(),
    );
    return solanaPairs[0]?.baseToken.address || null;
  } catch (error) {
    return null;
  }
}

export const getSolBalance = async (publicKey: string): Promise<number> => {
  try {
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    return 0;
  }
};

export const getTokenBalance = async (walletAddress: string, tokenMintAddress: string): Promise<number> => {
  try {
    const walletPublicKey = new PublicKey(walletAddress);
    const tokenMintPublicKey = new PublicKey(tokenMintAddress);
    
    const tokenAccount = await getAssociatedTokenAddress(
      tokenMintPublicKey,
      walletPublicKey
    );
    
    const accountInfo = await getAccount(connection, tokenAccount);
    return Number(accountInfo.amount);
  } catch (error) {
    return 0;
  }
};

export const getTokenAccounts = async (publicKey: string): Promise<any[]> => {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(publicKey),
      { programId: TOKEN_PROGRAM_ID }
    );
    return tokenAccounts.value;
  } catch (error) {
    return [];
  }
};


export const getTokenPrices = async (tokenAddresses: string[]): Promise<JupiterPriceResponse> => {
  try {
    const ids = tokenAddresses.join(',');
    const response = await fetch(`https://fe-api.jup.ag/api/v1/prices?list_address=${ids}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { prices: {} };
    }
    const priceData: JupiterPriceResponse = await response.json();
    return priceData;
  } catch (error) {
    return {
      prices: {}
    };
  }
};
