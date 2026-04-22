export interface RawPetState {
  hunger: number;
  happiness: number;
  energy: number;
  lastInteractionBlock: number;
  isAlive: boolean;
  currentBlock: number;
  totalRounds: number;
}

export interface LivePetState extends RawPetState {
  effectiveHunger: number;
  effectiveHappiness: number;
  effectiveEnergy: number;
  blocksUntilNextDecay: number;
  isDangerZone: boolean;
}

export type PetAction = 'feed' | 'play' | 'sleep';

/**
 * Options for calling a contract function.
 * @property contractAddress - Address of the target contract.
 * @property contractName - Name of the contract.
 * @property functionName - Name of the function to invoke.
 * @property functionArgs - Arguments for the function call.
 * @property network - Network identifier (e.g., "mainnet", "testnet").
 */
export interface ContractCallOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: readonly unknown[];
  network: string;
}
