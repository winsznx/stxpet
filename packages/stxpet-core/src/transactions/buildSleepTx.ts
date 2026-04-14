import { ContractCallOptions } from '../types';

export function buildSleepTx(
  contractDeployer: string,
  contractName: string,
  network: string
): ContractCallOptions {
  return {
    contractAddress: contractDeployer,
    contractName,
    functionName: 'sleep',
    functionArgs: [],
    network,
  };
}
