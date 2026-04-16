export const ERROR_MESSAGES = {
  walletNotConnected: 'Wallet not connected',
  txCancelled: 'Transaction cancelled by user',
  networkUnavailable: 'Network request failed',
  petDead: 'Pet is dead. Start a new round first.',
  petAlive: 'Pet is still alive. Cannot start a new round yet.',
  contractRead: 'Failed to read contract state',
  unknown: 'An unexpected error occurred',
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
