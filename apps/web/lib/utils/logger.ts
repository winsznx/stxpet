type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function emit(level: LogLevel, message: string, context?: unknown): void {
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
  if (context !== undefined) {
    console[level](line, context);
  } else {
    console[level](line);
  }
}

export const logger = {
  debug: (message: string, context?: unknown) => emit('debug', message, context),
  info: (message: string, context?: unknown) => emit('info', message, context),
  warn: (message: string, context?: unknown) => emit('warn', message, context),
  error: (message: string, context?: unknown) => emit('error', message, context),
};
