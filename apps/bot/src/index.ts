import { loadConfig } from './config';
import { fetchLiveState } from './monitor';
import { submitAction } from './feeder';
import { LogLevel, log } from './logger';
import { wait } from './utils/wait';

async function runCycle(config: ReturnType<typeof loadConfig>): Promise<void> {
  const state = await fetchLiveState(config.contractDeployer, config.contractName, config.network);

  if (!state.isAlive) {
    log('Pet is dead, waiting for new round', LogLevel.WARN);
    return;
  }

  log(`Status | H: ${state.effectiveHunger} | HP: ${state.effectiveHappiness} | E: ${state.effectiveEnergy}`);

  if (state.effectiveHunger < config.hungerThreshold) {
    await submitAction('feed', config.privateKey, config.contractDeployer, config.contractName, config.network);
  }
  if (state.effectiveHappiness < config.happinessThreshold) {
    await submitAction('play', config.privateKey, config.contractDeployer, config.contractName, config.network);
  }
  if (state.effectiveEnergy < config.energyThreshold) {
    await submitAction('sleep', config.privateKey, config.contractDeployer, config.contractName, config.network);
  }
}

async function main() {
  try {
    const config = loadConfig();
    log('StxPet Bot started');
    
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        await runCycle(config);
      } catch (err) {
        log(`Cycle failed: ${err instanceof Error ? err.message : String(err)}`, LogLevel.ERROR);
      }
      await wait(config.pollIntervalMs);
    }
  } catch (err) {
    log(`Critical failure: ${err instanceof Error ? err.message : String(err)}`, LogLevel.ERROR);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
