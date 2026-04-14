import { ContractCallOptions } from '../types';

export function buildFeedTx(
  contractDeployer: string,
  contractName: string,
  network: unknown
): ContractCallOptions {
  return {
    contractAddress: contractDeployer,
    contractName,
    functionName: 'feed',
    functionArgs: [],
    network,
  };
}
