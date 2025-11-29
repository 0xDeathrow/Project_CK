import { useState, useEffect } from 'react';
import { fetchTokenList } from '@/lib/tokenService';
import type { TokenData } from '@/types/token';

export const useTokenList = () => {
    const [tokenList, setTokenList] = useState<TokenData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTokenList = async () => {
            try {
                setLoading(true);
                const tokens = await fetchTokenList();
                setTokenList(tokens);
                setError(null);
            } catch (err) {
                setError('Failed to load token list');
            } finally {
                setLoading(false);
            }
        };

        loadTokenList();
    }, []);

    return { tokenList, loading, error };
};
