import { DANGER_THRESHOLD } from '@/lib/constants';

export type PetStatus = 'dead' | 'critical' | 'distressed' | 'healthy';

export interface PetStatusInput {
  isAlive: boolean;
  hunger: number;
  happiness: number;
  energy: number;
}

export function getPetStatus(state: PetStatusInput): PetStatus {
  if (!state.isAlive) return 'dead';
  const min = Math.min(state.hunger, state.happiness, state.energy);
  if (min <= 5) return 'critical';
  if (min < DANGER_THRESHOLD) return 'distressed';
  return 'healthy';
}
