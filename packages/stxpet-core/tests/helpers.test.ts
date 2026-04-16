import { describe, expect, it } from 'vitest';
import { isMeterCritical } from '../src/helpers/isMeterCritical';
import { minMeter } from '../src/helpers/minMeter';
import { isPetDead } from '../src/helpers/isPetDead';
import type { LivePetState } from '../src/types';

function makeState(overrides: Partial<LivePetState> = {}): LivePetState {
  return {
    hunger: 100,
    happiness: 100,
    energy: 100,
    lastInteractionBlock: 0,
    isAlive: true,
    currentBlock: 0,
    totalRounds: 0,
    effectiveHunger: 100,
    effectiveHappiness: 100,
    effectiveEnergy: 100,
    blocksUntilNextDecay: 10,
    isDangerZone: false,
    ...overrides,
  };
}

describe('isMeterCritical', () => {
  it('returns true below threshold', () => {
    expect(isMeterCritical(10)).toBe(true);
  });

  it('returns false above threshold', () => {
    expect(isMeterCritical(30)).toBe(false);
  });
});

describe('minMeter', () => {
  it('returns lowest effective meter', () => {
    expect(minMeter(makeState({ effectiveEnergy: 5 }))).toBe(5);
  });
});

describe('isPetDead', () => {
  it('dead when isAlive false', () => {
    expect(isPetDead(makeState({ isAlive: false }))).toBe(true);
  });

  it('dead when any effective meter is zero', () => {
    expect(isPetDead(makeState({ effectiveHunger: 0 }))).toBe(true);
  });

  it('alive when all meters positive', () => {
    expect(isPetDead(makeState())).toBe(false);
  });
});
