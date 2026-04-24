import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePetState } from '../../hooks/usePetState';

vi.mock('../../lib/contract-reads', () => ({
  fetchLiveState: vi.fn(),
}));

describe('usePetState', () => {
  it('should initialize with loading state', () => {
    const { result } = renderHook(() => usePetState());
    expect(result.current.isLoading).toBe(true);
  });
});
