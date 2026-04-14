import {
  callReadOnlyFunction,
  ClarityValue,
  cvToValue,
  standardPrincipalCV,
} from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';
import { parsePetState, computeCurrentMeters, LivePetState } from '@winsznx/stxpet-core';

const network = new StacksMainnet();

export async function fetchLiveState(
  contractDeployer: string,
  contractName: string
): Promise<LivePetState> {
  const result = await callReadOnlyFunction({
    contractAddress: contractDeployer,
    contractName,
    functionName: 'get-live-state',
    functionArgs: [],
    network,
    senderAddress: contractDeployer,
  });

  const raw = parsePetState(result);
  return computeCurrentMeters(raw, raw.currentBlock);
}
