import { DECAY_CONFIG } from '../constants/decay';

export function isMeterCritical(value: number, threshold = DECAY_CONFIG.DANGER_THRESHOLD): boolean {
  return value < threshold;
}
