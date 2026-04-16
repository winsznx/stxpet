import { describe, expect, it } from 'vitest';
import { clamp } from '@/lib/utils/clamp';

describe('clamp', () => {
  it('returns value when within bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to min', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });

  it('clamps to max', () => {
    expect(clamp(99, 0, 10)).toBe(10);
  });
});
