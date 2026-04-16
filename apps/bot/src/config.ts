import { DEFAULT_POLL_INTERVAL_MS, DEFAULT_THRESHOLD, DEFAULT_CONTRACT_NAME } from './constants';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export interface BotConfig {
  privateKey: string;
  contractDeployer: string;
  contractName: string;
  hungerThreshold: number;
  happinessThreshold: number;
  energyThreshold: number;
  pollIntervalMs: number;
}

export function loadBotConfig(): BotConfig {
  return {
    privateKey: requireEnv('BOT_PRIVATE_KEY'),
    contractDeployer: requireEnv('CONTRACT_DEPLOYER'),
    contractName: process.env.CONTRACT_NAME || DEFAULT_CONTRACT_NAME,
    hungerThreshold: Number(process.env.BOT_HUNGER_THRESHOLD || DEFAULT_THRESHOLD),
    happinessThreshold: Number(process.env.BOT_HAPPINESS_THRESHOLD || DEFAULT_THRESHOLD),
    energyThreshold: Number(process.env.BOT_ENERGY_THRESHOLD || DEFAULT_THRESHOLD),
    pollIntervalMs: Number(process.env.BOT_POLL_INTERVAL_MS || DEFAULT_POLL_INTERVAL_MS),
  };
}
