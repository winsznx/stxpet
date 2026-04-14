import {
  makeContractCall,
  broadcastTransaction,
} from '@stacks/transactions';
import { STACKS_MAINNET } from '@stacks/network';
import { PetAction, buildFeedTx, buildPlayTx, buildSleepTx } from '@winsznx/stxpet-core';

const TX_BUILDERS: Record<PetAction, typeof buildFeedTx> = {
  feed: buildFeedTx,
  play: buildPlayTx,
  sleep: buildSleepTx,
};

export async function submitAction(
  action: PetAction,
  privateKey: string,
  contractDeployer: string,
  contractName: string
): Promise<string> {
  const txOptions = TX_BUILDERS[action](contractDeployer, contractName, 'mainnet');

  const transaction = await makeContractCall({
    ...txOptions,
    functionArgs: [],
    senderKey: privateKey,
    network: STACKS_MAINNET,
  });

  const result = await broadcastTransaction({ transaction });

  if ('error' in result) {
    throw new Error(`Broadcast failed: ${(result as { error: string; reason: string }).error} - ${(result as { error: string; reason: string }).reason}`);
  }

  const txid = typeof result === 'string' ? result : (result as { txid: string }).txid;
  console.log(`[${new Date().toISOString()}] Action: ${action} | txid: ${txid}`);
  return txid;
}
