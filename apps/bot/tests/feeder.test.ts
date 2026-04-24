import { describe, it, expect, vi } from 'vitest';
import { submitAction } from '../src/feeder';

vi.mock('@stacks/transactions', () => ({
  makeContractCall: vi.fn(),
  broadcastTransaction: vi.fn(),
  AnchorMode: { Any: 1 },
}));

describe('submitAction', () => {
  it('should be defined', () => {
    expect(submitAction).toBeDefined();
  });
});
