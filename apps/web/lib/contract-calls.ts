import { request } from '@stacks/connect';
import { CONTRACT_DEPLOYER, CONTRACT_NAME, NETWORK } from './constants';

const CONTRACT_ID = `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}` as `${string}.${string}`;

export async function callFeed(): Promise<{ txId: string }> {
  const response = await request('stx_callContract', {
    contract: CONTRACT_ID,
    functionName: 'feed',
    functionArgs: [],
    network: NETWORK as 'mainnet' | 'testnet',
  });
  return { txId: response.txid ?? '' };
}

export async function callPlay(): Promise<{ txId: string }> {
  const response = await request('stx_callContract', {
    contract: CONTRACT_ID,
    functionName: 'play',
    functionArgs: [],
    network: NETWORK as 'mainnet' | 'testnet',
  });
  return { txId: response.txid ?? '' };
}

export async function callSleep(): Promise<{ txId: string }> {
  const response = await request('stx_callContract', {
    contract: CONTRACT_ID,
    functionName: 'sleep',
    functionArgs: [],
    network: NETWORK as 'mainnet' | 'testnet',
  });
  return { txId: response.txid ?? '' };
}

export async function callStartNewRound(): Promise<{ txId: string }> {
  const response = await request('stx_callContract', {
    contract: CONTRACT_ID,
    functionName: 'start-new-round',
    functionArgs: [],
    network: NETWORK as 'mainnet' | 'testnet',
  });
  return { txId: response.txid ?? '' };
}
