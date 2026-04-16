import { describe, expect, it } from 'vitest';
import { getPetStatus } from '@/lib/utils/petStatus';

describe('getPetStatus', () => {
  const base = { isAlive: true, hunger: 80, happiness: 80, energy: 80 };

  it('returns dead when isAlive false', () => {
    expect(getPetStatus({ ...base, isAlive: false })).toBe('dead');
  });

  it('returns critical at or below 5', () => {
    expect(getPetStatus({ ...base, hunger: 3 })).toBe('critical');
  });

  it('returns distressed below danger threshold', () => {
    expect(getPetStatus({ ...base, happiness: 15 })).toBe('distressed');
  });

  it('returns healthy otherwise', () => {
    expect(getPetStatus(base)).toBe('healthy');
  });
});
