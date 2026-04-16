import { DANGER_THRESHOLD } from '@/lib/constants';

const WARNING_UPPER = 50;
const COLOR_DANGER = '#ff3c6e';
const COLOR_WARNING = '#ffcc00';
const COLOR_HEALTHY = '#00ff94';

export function getMeterColor(value: number): string {
  if (value < DANGER_THRESHOLD) return COLOR_DANGER;
  if (value <= WARNING_UPPER) return COLOR_WARNING;
  return COLOR_HEALTHY;
}
