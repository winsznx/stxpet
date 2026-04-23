import { ContractCallOptions } from "../types";

/**
 * Builds a contract call options object for the "sleep" action.
 * @param contractDeployer - The address of the contract deployer.
 * @param contractName - The name of the contract.
 * @param network - The network to target ("mainnet", "testnet", etc.).
 */
export function buildSleepTx(
  contractDeployer: string,
  contractName: string,
  network: string
): ContractCallOptions {
  return {
    contractAddress: contractDeployer,
    contractName,
    functionName: "sleep",
    functionArgs: [],
    network,
  };
}
