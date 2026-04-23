import { RawPetState, LivePetState } from '../types';

const DECAY_RATE = 1;
const DECAY_INTERVAL = 10;
const DANGER_THRESHOLD = 20;

/**
 * Computes the decayed value of a meter based on blocks elapsed.
 * @param currentValue - The starting value of the meter.
 * @param blocksElapsed - The number of blocks that have passed since last interaction.
 */
function computeDecayedMeter(currentValue: number, blocksElapsed: number): number {
  if (blocksElapsed < 0) return currentValue;
  const decay = DECAY_RATE * Math.floor(blocksElapsed / DECAY_INTERVAL);
  return decay > currentValue ? 0 : currentValue - decay;
}

/**
 * Takes a raw pet state and computes the current (decayed) state based on the current block height.
 * @param raw - The raw state from the contract.
 * @param currentBlock - The current Stacks block height.
 */
export function computeCurrentMeters(
  raw: RawPetState,
  currentBlock: number
): LivePetState {
  const blocksElapsed = Math.max(0, currentBlock - raw.lastInteractionBlock);
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
