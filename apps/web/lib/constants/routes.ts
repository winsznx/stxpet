export const ROUTES = {
  home: '/',
  leaderboard: '/leaderboard',
  ogImage: '/api/og',
  health: '/api/health',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
