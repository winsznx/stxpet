/**
 * Central configuration for the web application.
 * All values are derived from environment variables with safe defaults.
 */

const getEnv = (name, fallback) => {
  if (typeof process === 'undefined') return fallback;
  return process.env[name] || fallback;
};

export const HIRO_API_BASE = getEnv('NEXT_PUBLIC_HIRO_API_BASE', 'https://api.hiro.so');
export const CONTRACT_DEPLOYER = getEnv('NEXT_PUBLIC_CONTRACT_DEPLOYER', '');
export const CONTRACT_NAME = getEnv('NEXT_PUBLIC_CONTRACT_NAME', 'stx-pet-v1');
export const CONTRACT_IDENTIFIER = `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}`;

export const DECAY_RATE = Number(getEnv('NEXT_PUBLIC_DECAY_RATE', '1'));
export const DECAY_INTERVAL = Number(getEnv('NEXT_PUBLIC_DECAY_INTERVAL', '10'));

export const DANGER_THRESHOLD = 20;
export const POLL_INTERVAL_MS = 15000;
export const MAX_METER = 100;

export const APP_URL = getEnv('NEXT_PUBLIC_APP_URL', 'https://stxpet.xyz');
export const NETWORK = getEnv('NEXT_PUBLIC_NETWORK', 'mainnet');
