import { log, LogLevel } from './logger';

export interface BotConfig {
  readonly privateKey: string;
  readonly contractDeployer: string;
  readonly contractName: string;
  readonly hungerThreshold: number;
  readonly happinessThreshold: number;
  readonly energyThreshold: number;
  readonly pollIntervalMs: number;
  readonly network: string;
}

export function loadConfig(): BotConfig {
  const config = {
    privateKey: process.env.BOT_PRIVATE_KEY || '',
    contractDeployer: process.env.CONTRACT_DEPLOYER || '',
    contractName: process.env.CONTRACT_NAME || 'stx-pet-v1',
    hungerThreshold: Number(process.env.BOT_HUNGER_THRESHOLD || '30'),
    happinessThreshold: Number(process.env.BOT_HAPPINESS_THRESHOLD || '30'),
    energyThreshold: Number(process.env.BOT_ENERGY_THRESHOLD || '30'),
    pollIntervalMs: Number(process.env.BOT_POLL_INTERVAL_MS || '60000'),
    network: process.env.BOT_NETWORK || 'mainnet',
  };

  if (!config.privateKey) {
    log('BOT_PRIVATE_KEY is not set', LogLevel.ERROR);
    throw new Error('BOT_PRIVATE_KEY is missing');
  }

  if (!config.contractDeployer) {
    log('CONTRACT_DEPLOYER is not set', LogLevel.ERROR);
    throw new Error('CONTRACT_DEPLOYER is missing');
  }

  return config;
}
