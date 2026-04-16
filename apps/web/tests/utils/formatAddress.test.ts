import { describe, expect, it } from 'vitest';
import { formatAddress } from '@/lib/utils/formatAddress';

describe('formatAddress', () => {
  it('truncates long addresses with default prefix/suffix', () => {
    expect(formatAddress('SP1234567890ABCDEFGHIJKLMNOPQRSTUVWX')).toBe('SP1234...UVWX');
  });

  it('returns original when shorter than combined length', () => {
    expect(formatAddress('SP123')).toBe('SP123');
  });

  it('respects custom lengths', () => {
    expect(formatAddress('SP1234567890ABCDEF', 4, 2)).toBe('SP12...EF');
  });
});
