import { LivePetState } from '../types';

export function minMeter(state: Pick<LivePetState, 'effectiveHunger' | 'effectiveHappiness' | 'effectiveEnergy'>): number {
  return Math.min(state.effectiveHunger, state.effectiveHappiness, state.effectiveEnergy);
}
