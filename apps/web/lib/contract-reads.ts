import {
  fetchCallReadOnlyFunction,
  cvToValue,
  Cl,
} from '@stacks/transactions';
import { STACKS_MAINNET } from '@stacks/network';
import { parsePetState, computeCurrentMeters, LivePetState } from '@winsznx/stxpet-core';
import { CONTRACT_DEPLOYER, CONTRACT_NAME } from './constants';

export async function fetchLiveState(): Promise<LivePetState> {
  const result = await fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'get-live-state',
    functionArgs: [],
    network: STACKS_MAINNET,
    senderAddress: CONTRACT_DEPLOYER,
  });

  const raw = parsePetState(result);
  return computeCurrentMeters(raw, raw.currentBlock);
}

export async function fetchRoundWinner(round: number): Promise<string | null> {
  const result = await fetchCallReadOnlyFunction({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'get-round-winner',
    functionArgs: [Cl.uint(round)],
    network: STACKS_MAINNET,
    senderAddress: CONTRACT_DEPLOYER,
  });

  const value = cvToValue(result);
  if (value === null || value === undefined) {
    return null;
  }
  return String(value);
}
