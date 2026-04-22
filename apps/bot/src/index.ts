import { fetchLiveState } from './monitor';
import { submitAction } from './feeder';

const BOT_PRIVATE_KEY = process.env.BOT_PRIVATE_KEY!;
const CONTRACT_DEPLOYER = process.env.CONTRACT_DEPLOYER!;
const CONTRACT_NAME = process.env.CONTRACT_NAME || 'stx-pet-v1';
const BOT_HUNGER_THRESHOLD = Number(process.env.BOT_HUNGER_THRESHOLD || '30');
const BOT_HAPPINESS_THRESHOLD = Number(process.env.BOT_HAPPINESS_THRESHOLD || '30');
const BOT_ENERGY_THRESHOLD = Number(process.env.BOT_ENERGY_THRESHOLD || '30');
const BOT_POLL_INTERVAL_MS = Number(process.env.BOT_POLL_INTERVAL_MS || '60000');

function log(message: string): void {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

async function runCycle(): Promise<void> {
  const state = await fetchLiveState(CONTRACT_DEPLOYER, CONTRACT_NAME);

  if (!state.isAlive) {
    log('Pet is dead, waiting for new round');
    return;
  }

  log(
    `State — Hunger: ${state.effectiveHunger} | Happiness: ${state.effectiveHappiness} | Energy: ${state.effectiveEnergy} | Block: ${state.currentBlock}`
  );

  if (state.effectiveHunger < BOT_HUNGER_THRESHOLD) {
    log(`Hunger below threshold (${state.effectiveHunger} < ${BOT_HUNGER_THRESHOLD}), feeding...`);
    await submitAction('feed', BOT_PRIVATE_KEY, CONTRACT_DEPLOYER, CONTRACT_NAME);
  }

  if (state.effectiveHappiness < BOT_HAPPINESS_THRESHOLD) {
    log(`Happiness below threshold (${state.effectiveHappiness} < ${BOT_HAPPINESS_THRESHOLD}), playing...`);
    await submitAction('play', BOT_PRIVATE_KEY, CONTRACT_DEPLOYER, CONTRACT_NAME);
  }

  if (state.effectiveEnergy < BOT_ENERGY_THRESHOLD) {
    log(`Energy below threshold (${state.effectiveEnergy} < ${BOT_ENERGY_THRESHOLD}), sleeping...`);
    await submitAction('sleep', BOT_PRIVATE_KEY, CONTRACT_DEPLOYER, CONTRACT_NAME);
  }
}

async function main(): Promise<void> {
  log('StxPet Bot starting...');
  log(`Polling every ${BOT_POLL_INTERVAL_MS}ms`);
  log(`Thresholds — Hunger: ${BOT_HUNGER_THRESHOLD} | Happiness: ${BOT_HAPPINESS_THRESHOLD} | Energy: ${BOT_ENERGY_THRESHOLD}`);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await runCycle();
    } catch (error) {
      log(`Error in cycle: ${error instanceof Error ? error.message : String(error)}`);
    }
    await new Promise((resolve) => setTimeout(resolve, BOT_POLL_INTERVAL_MS));
  }
}

main();
