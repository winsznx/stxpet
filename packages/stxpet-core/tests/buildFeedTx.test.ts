import { describe, it, expect } from 'vitest';
import { buildFeedTx } from '../src/transactions/buildFeedTx';

describe('buildFeedTx', () => {
  it('should build a valid feed transaction object', () => {
    const result = buildFeedTx('SP123', 'stx-pet', 'mainnet');
    expect(result.functionName).toBe('feed');
    expect(result.contractAddress).toBe('SP123');
    expect(result.network).toBe('mainnet');
  });
});
