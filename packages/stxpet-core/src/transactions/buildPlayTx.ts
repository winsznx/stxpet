import { ContractCallOptions } from '../types';

export function buildPlayTx(
  contractDeployer: string,
  contractName: string,
  network: string
): ContractCallOptions {
  return {
    contractAddress: contractDeployer,
    contractName,
    functionName: 'play',
    functionArgs: [],
    network,
  };
}
