import { 
  makeContractCall, 
  broadcastTransaction, 
  SignedContractCallOptions,
  AnchorMode
} from '@stacks/transactions';
import { STACKS_MAINNET, STACKS_TESTNET } from '@stacks/network';
import { LogLevel, log } from './logger';

export type PetAction = 'feed' | 'play' | 'sleep';

export async function submitAction(
  action: PetAction,
  privateKey: string,
  contractDeployer: string,
  contractName: string,
  network: string = 'mainnet'
): Promise<string> {
  const txOptions: SignedContractCallOptions = {
    contractAddress: contractDeployer,
    contractName,
    functionName: action,
    functionArgs: [],
    senderKey: privateKey,
    validateWithAbi: true,
    network: network === 'mainnet' ? STACKS_MAINNET : STACKS_TESTNET,
    anchorMode: AnchorMode.Any,
  };

  try {
    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, txOptions.network);
    
    if ('error' in broadcastResponse) {
      throw new Error(`Broadcast failed: ${broadcastResponse.error} ${broadcastResponse.reason || ''}`);
    }

    log(`Action submitted: ${action} | txid: ${broadcastResponse.txid}`, LogLevel.INFO);
    return broadcastResponse.txid;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log(`Failed to submit ${action}: ${msg}`, LogLevel.ERROR);
    throw err;
  }
}
