import { fetchCallReadOnlyFunction, ClarityValue } from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import { parsePetState, computeCurrentMeters, LivePetState } from '@winsznx/stxpet-core';
import { LogLevel, log } from './logger';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

export async function fetchLiveState(
  contractAddress: string,
  contractName: string,
  network: string = 'mainnet'
): Promise<LivePetState> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const result = await fetchCallReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-live-state',
        functionArgs: [],
        network: network === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET,
        senderAddress: contractAddress,
      });

      const raw = parsePetState(result);
      return computeCurrentMeters(raw, raw.currentBlock);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      log(`Attempt ${i + 1} failed to fetch pet state: ${lastError.message}`, LogLevel.WARN);
      if (i < MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  
  throw lastError || new Error('Failed to fetch live state after multiple retries');
}
