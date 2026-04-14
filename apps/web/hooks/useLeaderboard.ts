'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchLiveState } from '@/lib/contract-reads';
import { fetchRoundWinner } from '@/lib/contract-reads';

interface RoundEntry {
  roundNumber: number;
  winner: string;
}

interface UseLeaderboardReturn {
  rounds: RoundEntry[];
  totalRounds: number;
  isLoading: boolean;
  error: string | null;
}

export function useLeaderboard(): UseLeaderboardReturn {
  const [rounds, setRounds] = useState<RoundEntry[]>([]);
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

      const roundIndices = Array.from({ length: total }, (_, i) => i);
      const winners = await Promise.all(
        roundIndices.map(async (roundNum) => {
          const winner = await fetchRoundWinner(roundNum);
          return winner ? { roundNumber: roundNum, winner } : null;
        })
      );

      setRounds(winners.filter((r): r is RoundEntry => r !== null));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  return { rounds, totalRounds, isLoading, error };
}
