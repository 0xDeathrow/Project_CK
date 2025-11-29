import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getTokenAccounts, getSolBalance, getTokenPrices } from '@/lib/tokenService';
import { useTokenList } from './useTokenList';
import type { TokenData, JupiterPriceResponse } from '@/types/token';

export interface UserTokenBalance {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    balance: number;
    balanceInUsd: number;
    logoURI: string;
    price: number;
}

export const useTokenBalance = () => {
    const { publicKey, connected } = useWallet();
    const { tokenList, loading: tokenListLoading } = useTokenList();
    const [userTokenBalances, setUserTokenBalances] = useState<UserTokenBalance[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBalances = useCallback(async () => {
        if (!connected || !publicKey || !tokenList.length) {
            setUserTokenBalances([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const [solBalance, tokenAccounts] = await Promise.all([
                getSolBalance(publicKey.toString()),
                getTokenAccounts(publicKey.toString())
            ]);
            
            const tokenMap = new Map(tokenList.map((t: TokenData) => [t.address, t]));
            
            const allBalances: UserTokenBalance[] = [];
            
            if (solBalance > 0) {
                allBalances.push({
                    address: 'So11111111111111111111111111111111111111112',
                    symbol: 'SOL',
                    name: 'Solana',
                    decimals: 9,
                    balance: solBalance,
                    balanceInUsd: solBalance,
                    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
                    price: 0,
                });
            }

            tokenAccounts
                .filter((acc: any) => parseFloat(acc?.account?.data?.parsed?.info?.tokenAmount?.uiAmount) > 0)
                .forEach((acc: any) => {
                    const info = acc?.account?.data?.parsed?.info;
                    const meta = tokenMap.get(info?.mint);
                    if (meta) {
                        allBalances.push({
                            address: info.mint,
                            symbol: meta.symbol,
                            name: meta.name,
                            decimals: info?.tokenAmount?.decimals,
                            balance: parseFloat(info?.tokenAmount?.uiAmount),
                            balanceInUsd: parseFloat(info?.tokenAmount?.uiAmount),
                            logoURI: meta?.logoURI || '',
                            price: 0,
                        });
                    }
                });

            try {
                const priceData: JupiterPriceResponse = await getTokenPrices(allBalances.map(t => t.address));
                allBalances.forEach(token => {
                    token.price = priceData.prices?.[token.address] || 0;
                    token.balanceInUsd = token.balance * token.price;
                });
            } catch (priceError) {
                console.log('Error fetching token prices:', priceError);
            }

            setUserTokenBalances(allBalances);
            
        } catch (err) {
            setError('Failed to fetch token balances');
        } finally {
            setLoading(false);
        }
    }, [connected, publicKey, tokenList]);

    useEffect(() => {
        fetchBalances();
    }, [fetchBalances]);

    const getTotalValue = useCallback(() => {
        return userTokenBalances.reduce((total: number, token:UserTokenBalance) => total + token.balanceInUsd, 0).toFixed(2);
    }, [userTokenBalances]);

    return {
        userTokenBalances,
        tokenList,
        loading: loading || tokenListLoading,
        error,
        connected,
        fetchBalances,
        getTotalValue,
    };
}; 