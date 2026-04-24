'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchLiveState } from '@/lib/contract-reads';
import { LivePetState } from '@winsznx/stxpet-core';
import { POLL_INTERVAL_MS } from '@/lib/constants';
import { useInterval } from './useInterval';

/**
 * Hook to manage and poll the current pet state from the blockchain.
 * Returns the state, loading status, and interaction helpers.
 */
export function usePetState() {
  const [petState, setPetState] = useState<LivePetState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    return fetchState();
  }, [fetchState]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const isDead = petState !== null && !petState.isAlive;

  useInterval(fetchState, isDead ? null : POLL_INTERVAL_MS);

  return { petState, isLoading, isDead, error, refetch };
}
