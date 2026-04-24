import { describe, it, expect, vi } from 'vitest';
import { fetchLiveState } from '../../lib/contract-reads';

vi.mock('@stacks/transactions', () => ({
  fetchCallReadOnlyFunction: vi.fn(),
  cvToValue: vi.fn(),
  Cl: { uint: vi.fn() },
}));

describe('fetchLiveState', () => {
  it('should be defined', () => {
    expect(fetchLiveState).toBeDefined();
  });
});
