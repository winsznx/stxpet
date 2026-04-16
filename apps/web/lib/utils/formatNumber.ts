export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatPercentage(value: number, max: number, digits = 0): string {
  if (max === 0) return '0%';
  return `${((value / max) * 100).toFixed(digits)}%`;
}
