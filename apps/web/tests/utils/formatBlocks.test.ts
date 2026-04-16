import { describe, expect, it } from 'vitest';
import { formatBlocks, blocksToMinutes } from '@/lib/utils/formatBlocks';

describe('formatBlocks', () => {
  it('handles singular', () => {
    expect(formatBlocks(1)).toBe('1 block');
  });

  it('handles plural', () => {
    expect(formatBlocks(5)).toBe('5 blocks');
  });
});

describe('blocksToMinutes', () => {
  it('uses default 10-minute block time', () => {
    expect(blocksToMinutes(6)).toBe(60);
  });
});
