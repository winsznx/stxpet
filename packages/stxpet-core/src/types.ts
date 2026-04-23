/**
 * Represents the raw state of a pet as returned from the smart contract.
 */
export interface RawPetState {
  readonly hunger: number;
  readonly happiness: number;
  readonly energy: number;
  readonly lastInteractionBlock: number;
  readonly isAlive: boolean;
  readonly currentBlock: number;
  readonly totalRounds: number;
}

/**
 * Represents the live state of a pet, including decay-adjusted values.
 */
export interface LivePetState extends RawPetState {
  readonly effectiveHunger: number;
  readonly effectiveHappiness: number;
  readonly effectiveEnergy: number;
  readonly blocksUntilNextDecay: number;
  readonly isDangerZone: boolean;
}

/**
 * Valid actions that can be performed on a pet.
 */
export type PetAction = 'feed' | 'play' | 'sleep';

/**
 * Options for calling a contract function.
 */
export interface ContractCallOptions {
  readonly contractAddress: string;
  readonly contractName: string;
  readonly functionName: string;
  readonly functionArgs: readonly unknown[];
  readonly network: string;
}
