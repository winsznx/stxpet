export function formatBlocks(count: number): string {
  if (count === 1) return '1 block';
  return `${count} blocks`;
}

export function blocksToMinutes(blocks: number, blockTimeMinutes = 10): number {
  return blocks * blockTimeMinutes;
}
