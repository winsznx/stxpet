import { request } from '@stacks/connect';
import { CONTRACT_DEPLOYER, CONTRACT_NAME, NETWORK } from './constants';

const CONTRACT_ID = `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}` as `${string}.${string}`;
const network = NETWORK as 'mainnet' | 'testnet';

interface CallResult {
  readonly txId: string;
}

async function safeContractCall(functionName: string, functionArgs: any[] = []): Promise<CallResult> {
  try {
    const response = await request('stx_callContract', {
      contract: CONTRACT_ID,
      functionName,
      functionArgs,
      network,
    });
    return { txId: response.txid ?? '' };
  } catch (error) {
    console.error(`Contract call "${functionName}" failed:`, error);
    throw error;
  }
}

export const callFeed = () => safeContractCall('feed');
export const callPlay = () => safeContractCall('play');
export const callSleep = () => safeContractCall('sleep');
export const callStartNewRound = () => safeContractCall('start-new-round');
