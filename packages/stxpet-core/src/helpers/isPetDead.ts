import { LivePetState } from '../types';
import { minMeter } from './minMeter';

export function isPetDead(state: LivePetState): boolean {
  if (!state.isAlive) return true;
  return minMeter(state) <= 0;
}
