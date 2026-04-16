const UNITS: Array<{ limit: number; divisor: number; label: string }> = [
  { limit: 60, divisor: 1, label: 'second' },
  { limit: 3600, divisor: 60, label: 'minute' },
  { limit: 86400, divisor: 3600, label: 'hour' },
  { limit: Infinity, divisor: 86400, label: 'day' },
];

export function formatRelativeTime(seconds: number): string {
  const abs = Math.abs(seconds);
  for (const unit of UNITS) {
    if (abs < unit.limit) {
      const n = Math.floor(abs / unit.divisor);
      return `${n} ${unit.label}${n === 1 ? '' : 's'} ago`;
    }
  }
  return 'just now';
}
