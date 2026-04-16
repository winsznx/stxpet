export const QUERY_KEYS = {
  petState: () => ['pet', 'state'] as const,
  rawPetState: () => ['pet', 'raw'] as const,
  roundWinner: (round: number) => ['pet', 'round', round] as const,
  leaderboard: () => ['pet', 'leaderboard'] as const,
  nftOwner: (tokenId: number) => ['pet', 'nft', tokenId] as const,
};
