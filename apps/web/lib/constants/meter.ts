export const METER_MIN = 0;
export const METER_MAX = 100;
export const METER_WARNING_UPPER = 50;

export const METER_LEVEL = {
  DANGER: 'danger',
  WARNING: 'warning',
  HEALTHY: 'healthy',
} as const;

export type MeterLevel = (typeof METER_LEVEL)[keyof typeof METER_LEVEL];
