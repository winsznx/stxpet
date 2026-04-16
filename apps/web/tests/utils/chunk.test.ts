import { describe, expect, it } from 'vitest';
import { chunk } from '@/lib/utils/chunk';

describe('chunk', () => {
  it('splits array into groups of size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns empty for empty input', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('throws when size is not positive', () => {
    expect(() => chunk([1], 0)).toThrow();
  });
});
