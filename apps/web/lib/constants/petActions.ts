export const PET_ACTION = {
  FEED: 'feed',
  PLAY: 'play',
  SLEEP: 'sleep',
} as const;

export type PetActionKey = (typeof PET_ACTION)[keyof typeof PET_ACTION];

export const PET_ACTION_LIST: readonly PetActionKey[] = [
  PET_ACTION.FEED,
  PET_ACTION.PLAY,
  PET_ACTION.SLEEP,
];
