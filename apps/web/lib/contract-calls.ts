import { openContractCall } from '@stacks/connect';
import { CONTRACT_DEPLOYER, CONTRACT_NAME, NETWORK } from './constants';

interface ContractCallCallbacks {
  onFinish?: (data: { txId: string }) => void;
  onCancel?: () => void;
}

function getNetwork(): 'mainnet' | 'testnet' {
  return NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
}

export async function callFeed({ onFinish, onCancel }: ContractCallCallbacks = {}): Promise<void> {
  await openContractCall({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'feed',
    functionArgs: [],
    network: getNetwork(),
    onFinish: onFinish ? (data) => onFinish({ txId: data.txId }) : undefined,
    onCancel,
  });
}

export async function callPlay({ onFinish, onCancel }: ContractCallCallbacks = {}): Promise<void> {
  await openContractCall({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'play',
    functionArgs: [],
    network: getNetwork(),
    onFinish: onFinish ? (data) => onFinish({ txId: data.txId }) : undefined,
    onCancel,
  });
}

export async function callSleep({ onFinish, onCancel }: ContractCallCallbacks = {}): Promise<void> {
  await openContractCall({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'sleep',
    functionArgs: [],
    network: getNetwork(),
    onFinish: onFinish ? (data) => onFinish({ txId: data.txId }) : undefined,
    onCancel,
  });
}

export async function callStartNewRound({ onFinish, onCancel }: ContractCallCallbacks = {}): Promise<void> {
  await openContractCall({
    contractAddress: CONTRACT_DEPLOYER,
    contractName: CONTRACT_NAME,
    functionName: 'start-new-round',
    functionArgs: [],
    network: getNetwork(),
    onFinish: onFinish ? (data) => onFinish({ txId: data.txId }) : undefined,
    onCancel,
  });
}
