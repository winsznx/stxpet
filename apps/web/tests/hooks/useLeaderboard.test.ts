import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLeaderboard } from '../../hooks/useLeaderboard';

vi.mock('../../lib/contract-reads', () => ({
  fetchLiveState: vi.fn(),
  fetchRoundWinner: vi.fn(),
}));

describe('useLeaderboard', () => {
  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useLeaderboard());
    expect(result.current.isLoading).toBe(true);
  });
});
