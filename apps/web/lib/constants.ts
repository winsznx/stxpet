function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const HIRO_API_BASE = process.env.NEXT_PUBLIC_HIRO_API_BASE || 'https://api.hiro.so';
export const CONTRACT_DEPLOYER = process.env.NEXT_PUBLIC_CONTRACT_DEPLOYER || '';
export const CONTRACT_NAME = process.env.NEXT_PUBLIC_CONTRACT_NAME || 'stx-pet-v1';
export const CONTRACT_IDENTIFIER = `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}`;
export const DECAY_RATE = Number(process.env.NEXT_PUBLIC_DECAY_RATE || '1');
export const DECAY_INTERVAL = Number(process.env.NEXT_PUBLIC_DECAY_INTERVAL || '10');
export const DANGER_THRESHOLD = 20;
export const POLL_INTERVAL_MS = 15000;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://stxpet.xyz';
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'mainnet';
export const MAX_METER = 100;
