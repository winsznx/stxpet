import { describe, it, expect, vi } from 'vitest';
import { fetchLiveState } from '../src/monitor';

vi.mock('@stacks/transactions', () => ({
  fetchCallReadOnlyFunction: vi.fn(),
  cvToValue: vi.fn(),
}));

describe('fetchLiveState', () => {
  it('should be defined', () => {
    expect(fetchLiveState).toBeDefined();
  });
});
