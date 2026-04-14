import {
  callReadOnlyFunction,
  ClarityValue,
  cvToValue,
  uintCV,
} from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';
import { parsePetState, computeCurrentMeters, LivePetState } from '@winsznx/stxpet-core';
import { CONTRACT_DEPLOYER, CONTRACT_NAME } from './constants';

const network = new StacksMainnet();

export async function fetchLiveState(): Promise<LivePetState> {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'get-live-state',
    functionArgs: [],
    network,
    senderAddress: CONTRACT_DEPLOYER,
  });

  const raw = parsePetState(result);
  return computeCurrentMeters(raw, raw.currentBlock);
}

export async function fetchRoundWinner(round: number): Promise<string | null> {
  const result = await callReadOnlyFunction({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'get-round-winner',
    functionArgs: [uintCV(round)],
    network,
    senderAddress: CONTRACT_DEPLOYER,
  });

  const value = cvToValue(result);
  if (value === null || value === undefined) {
    return null;
  }
  return String(value);
}
