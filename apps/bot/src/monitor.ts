import { fetchCallReadOnlyFunction, cvToValue } from '@stacks/transactions';
import { STACKS_MAINNET } from '@stacks/network';
import { parsePetState, computeCurrentMeters, LivePetState } from '@winsznx/stxpet-core';

export async function fetchLiveState(
  contractDeployer: string,
  contractName: string
): Promise<LivePetState> {
  const result = await fetchCallReadOnlyFunction({
    contractAddress: contractDeployer,
    contractName,
    functionName: 'get-live-state',
    functionArgs: [],
    network: STACKS_MAINNET,
    senderAddress: contractDeployer,
  });

  const raw = parsePetState(result);
  return computeCurrentMeters(raw, raw.currentBlock);
}
