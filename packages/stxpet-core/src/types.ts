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

export interface ContractCallOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: readonly unknown[];
  network: string;
}
