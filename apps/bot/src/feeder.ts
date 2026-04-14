import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
} from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';
import { PetAction, buildFeedTx, buildPlayTx, buildSleepTx } from '@winsznx/stxpet-core';

const network = new StacksMainnet();

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
  const txOptions = TX_BUILDERS[action](contractDeployer, contractName, network);

  const transaction = await makeContractCall({
    ...txOptions,
    functionArgs: [],
    senderKey: privateKey,
    network,
    anchorMode: AnchorMode.Any,
  });

  const response = await broadcastTransaction(transaction, network);

  if ('error' in response) {
    throw new Error(`Broadcast failed: ${response.error} - ${response.reason}`);
  }

  const txid = typeof response === 'string' ? response : response.txid;
  console.log(`[${new Date().toISOString()}] Action: ${action} | txid: ${txid}`);
  return txid;
}
