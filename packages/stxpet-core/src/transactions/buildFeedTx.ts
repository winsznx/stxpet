import { ContractCallOptions } from "../types";

/**
 * Builds a contract call options object for the "feed" action.
 * @param contractDeployer - The address of the contract deployer.
 * @param contractName - The name of the contract.
 * @param network - The network to target ("mainnet", "testnet", etc.).
 */
export function buildFeedTx(
  contractDeployer: string,
  contractName: string,
  network: string
): ContractCallOptions {
  return {
    contractAddress: contractDeployer,
    contractName,
    functionName: "feed",
    functionArgs: [],
    network,
  };
}
