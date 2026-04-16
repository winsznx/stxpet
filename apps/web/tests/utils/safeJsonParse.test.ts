import { describe, expect, it } from 'vitest';
import { safeJsonParse } from '@/lib/utils/safeJsonParse';

describe('safeJsonParse', () => {
  it('parses valid json', () => {
    expect(safeJsonParse<{ a: number }>('{"a":1}')).toEqual({ a: 1 });
  });

  it('returns null on invalid json', () => {
    expect(safeJsonParse('not json')).toBeNull();
  });
});
