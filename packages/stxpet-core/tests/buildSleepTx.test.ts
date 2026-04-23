import { describe, it, expect } from 'vitest';
import { buildSleepTx } from '../src/transactions/buildSleepTx';

describe('buildSleepTx', () => {
  it('should build a valid sleep transaction object', () => {
    const result = buildSleepTx('SP123', 'stx-pet', 'mainnet');
    expect(result.functionName).toBe('sleep');
    expect(result.contractAddress).toBe('SP123');
    expect(result.network).toBe('mainnet');
  });
});
