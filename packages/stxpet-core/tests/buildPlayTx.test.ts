import { describe, it, expect } from 'vitest';
import { buildPlayTx } from '../src/transactions/buildPlayTx';

describe('buildPlayTx', () => {
  it('should build a valid play transaction object', () => {
    const result = buildPlayTx('SP123', 'stx-pet', 'mainnet');
    expect(result.functionName).toBe('play');
    expect(result.contractAddress).toBe('SP123');
    expect(result.network).toBe('mainnet');
  });
});
