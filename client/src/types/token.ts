export interface TokenData {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  tags?: string[];
  extensions?: any;
}

export interface JupiterPriceResponse {
  prices: Record<string, number>;
}
