'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { LivePetState } from '@winsznx/stxpet-core';
import { fetchLiveState } from '@/lib/contract-reads';
import { POLL_INTERVAL_MS } from '@/lib/constants';

interface UsePetStateReturn {
  petState: LivePetState | null;
  isLoading: boolean;
  isDead: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePetState(): UsePetStateReturn {
  const [petState, setPetState] = useState<LivePetState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isDead = petState !== null && !petState.isAlive;

  const fetchState = useCallback(async () => {
    try {
      const state = await fetchLiveState();
      setPetState(state);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pet state');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    setIsLoading(true);
    fetchState();
  }, [fetchState]);

  useEffect(() => {
    fetchState();

    intervalRef.current = setInterval(() => {
      if (!isDead) {
        fetchState();
      }
    }, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchState, isDead]);

  return { petState, isLoading, isDead, error, refetch };
}
