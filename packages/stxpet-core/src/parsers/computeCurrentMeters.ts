import { RawPetState, LivePetState } from '../types';

const DECAY_RATE = 1;
const DECAY_INTERVAL = 10;
const DANGER_THRESHOLD = 20;

function computeDecayedMeter(currentValue: number, blocksElapsed: number): number {
  const decay = DECAY_RATE * Math.floor(blocksElapsed / DECAY_INTERVAL);
  return decay > currentValue ? 0 : currentValue - decay;
}

export function computeCurrentMeters(
  raw: RawPetState,
  currentBlock: number
): LivePetState {
  const blocksElapsed = currentBlock - raw.lastInteractionBlock;
  const effectiveHunger = computeDecayedMeter(raw.hunger, blocksElapsed);
  const effectiveHappiness = computeDecayedMeter(raw.happiness, blocksElapsed);
  const effectiveEnergy = computeDecayedMeter(raw.energy, blocksElapsed);

  const blocksInCurrentInterval = blocksElapsed % DECAY_INTERVAL;
  const blocksUntilNextDecay = DECAY_INTERVAL - blocksInCurrentInterval;

  const isDangerZone =
    effectiveHunger < DANGER_THRESHOLD ||
    effectiveHappiness < DANGER_THRESHOLD ||
    effectiveEnergy < DANGER_THRESHOLD;

  return {
    ...raw,
    currentBlock,
    effectiveHunger,
    effectiveHappiness,
    effectiveEnergy,
    blocksUntilNextDecay,
    isDangerZone,
  };
}
