import {
  fetchCallReadOnlyFunction,
  cvToValue,
  Cl,
} from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import { parsePetState, computeCurrentMeters, LivePetState } from '@winsznx/stxpet-core';
import { CONTRACT_DEPLOYER, CONTRACT_NAME, NETWORK } from './constants';

const network = NETWORK === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET;

// Basic in-memory cache for round winners
const winnerCache = new Map<number, string>();
const liveStateCache: { state: any; timestamp: number } = { state: null, timestamp: 0 };

export async function fetchLiveState(): Promise<LivePetState> {
  if (liveStateCache.state && Date.now() - liveStateCache.timestamp < 5000) return liveStateCache.state;
  const result = await fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'get-live-state',
    functionArgs: [],
    network,
    senderAddress: CONTRACT_DEPLOYER,
  });

  const raw = parsePetState(result);
  const finalState = computeCurrentMeters(raw, raw.currentBlock);
  liveStateCache.state = finalState;
  liveStateCache.timestamp = Date.now();
  return finalState;
}

export async function fetchRoundWinner(round: number): Promise<string | null> {
  if (winnerCache.has(round)) return winnerCache.get(round);

  const result = await fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'get-round-winner',
    functionArgs: [Cl.uint(round)],
    network,
    senderAddress: CONTRACT_DEPLOYER,
  });

  const value = cvToValue(result);
  if (value === null || value === undefined) return null;
  
  const winner = String(value);
  winnerCache.set(round, winner);
  return winner;
}
