import { LivePetState } from '../types';

export function getCurrentRoundNumber(state: Pick<LivePetState, 'totalRounds' | 'isAlive'>): number {
  return state.totalRounds;
}
