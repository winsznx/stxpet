type Level = 'info' | 'warn' | 'error';

export function log(level: Level, message: string): void {
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}
