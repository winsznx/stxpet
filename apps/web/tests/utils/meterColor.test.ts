import { describe, expect, it } from 'vitest';
import { getMeterColor } from '@/lib/utils/meterColor';

describe('getMeterColor', () => {
  it('returns danger for low values', () => {
    expect(getMeterColor(10)).toBe('#ff3c6e');
  });

  it('returns warning for mid values', () => {
    expect(getMeterColor(40)).toBe('#ffcc00');
  });

  it('returns healthy for high values', () => {
    expect(getMeterColor(80)).toBe('#00ff94');
  });
});
