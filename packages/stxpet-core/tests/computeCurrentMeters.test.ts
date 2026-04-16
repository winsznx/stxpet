import { describe, expect, it } from 'vitest';
import { computeCurrentMeters } from '../src/parsers/computeCurrentMeters';

describe('computeCurrentMeters', () => {
  const raw = {
    hunger: 100,
    happiness: 100,
    energy: 100,
    lastInteractionBlock: 0,
    isAlive: true,
    currentBlock: 0,
    totalRounds: 0,
  };

  it('returns full meters with no elapsed blocks', () => {
    const live = computeCurrentMeters(raw, 0);
    expect(live.effectiveHunger).toBe(100);
    expect(live.isDangerZone).toBe(false);
  });

  it('applies decay per interval', () => {
    const live = computeCurrentMeters(raw, 50);
    expect(live.effectiveHunger).toBe(95);
  });

  it('clamps at zero without going negative', () => {
    const live = computeCurrentMeters(raw, 10000);
    expect(live.effectiveHunger).toBe(0);
  });

  it('flags danger zone when any meter below threshold', () => {
    const low = { ...raw, hunger: 10 };
    const live = computeCurrentMeters(low, 0);
    expect(live.isDangerZone).toBe(true);
  });
});
