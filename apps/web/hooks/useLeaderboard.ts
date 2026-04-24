'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchLiveState, fetchRoundWinner } from '@/lib/contract-reads';

interface RoundEntry {
  readonly roundNumber: number;
  readonly winner: string;
}

/**
 * Hook to fetch and manage the global survivor leaderboard.
 */
export function useLeaderboard() {
  const [rounds, setRounds] = useState<readonly RoundEntry[]>([]);
  const [totalRounds, setTotalRounds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const state = await fetchLiveState();
      const total = state.totalRounds;
      setTotalRounds(total);

      if (total === 0) {
        setRounds([]);
        return;
      }

      // Fetch winners for all completed rounds
      const roundIndices = Array.from({ length: total }, (_, i) => i);
      const results = await Promise.allSettled(
        roundIndices.map(async (num) => {
          const winner = await fetchRoundWinner(num);
          if (!winner) throw new Error(`No winner found for round ${num}`);
          return { roundNumber: num, winner };
        })
      );

      const successfulRounds = results
        .filter((r) => r.status === 'fulfilled')
        .map(r => r.value);

      setRounds(successfulRounds);
      setError(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error fetching leaderboard';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return { rounds, totalRounds, isLoading, error, refetch: fetchLeaderboard };
}
