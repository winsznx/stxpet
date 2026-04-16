export const DECAY_CONFIG = {
  RATE: 1,
  INTERVAL_BLOCKS: 10,
  MAX_METER: 100,
  DANGER_THRESHOLD: 20,
} as const;

export type DecayConfig = typeof DECAY_CONFIG;
