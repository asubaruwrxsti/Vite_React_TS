import { useState, useEffect } from 'react';
import { TravelService } from '../services/api';
import type { Destination } from '@/types/types';

export const useDestinations = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await TravelService.getDestinations();
                setDestinations(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    return { destinations, loading, error };
};