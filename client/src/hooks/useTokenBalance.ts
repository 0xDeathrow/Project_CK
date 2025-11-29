import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/lib/solana-mock';
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
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const solBalance = await getSolBalance(publicKey.toString());
            
            const allBalances: UserTokenBalance[] = [];
            
            if (solBalance > 0) {
                allBalances.push({
                    address: 'So11111111111111111111111111111111111111112',
                    symbol: 'SOL',
                    name: 'Solana',
                    decimals: 9,
                    balance: solBalance,
                    balanceInUsd: solBalance * 150, // Mock price calculation
                    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
                    price: 150,
                });
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
