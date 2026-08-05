/**
 * Structured application logger with context tags, timestamps, and sensitive data sanitization.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

const SENSITIVE_KEYS = ['password', 'token', 'secret', 'authorization', 'cookie', 'cvv', 'card'];

function sanitizeContext(ctx?: LogContext): LogContext | undefined {
  if (!ctx) return undefined;
  const cleaned: LogContext = {};
  for (const [key, value] of Object.entries(ctx)) {
    const isSensitive = SENSITIVE_KEYS.some((sk) => key.toLowerCase().includes(sk));
    if (isSensitive) {
      cleaned[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      cleaned[key] = sanitizeContext(value as LogContext);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

function formatLog(level: LogLevel, tag: string, message: string, context?: LogContext) {
  const timestamp = new Date().toISOString();
  const sanitizedCtx = sanitizeContext(context);
  const entry = {
    timestamp,
    level,
    tag,
    message,
    ...(sanitizedCtx ? { context: sanitizedCtx } : {}),
  };

  if (process.env.NODE_ENV === 'production') {
    return JSON.stringify(entry);
  }
  const prefix = `[${timestamp}] [${level.toUpperCase()}] [${tag}]:`;
  return `${prefix} ${message} ${sanitizedCtx ? JSON.stringify(sanitizedCtx) : ''}`.trim();
}

export const logger = {
  debug(tag: string, message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatLog('debug', tag, message, context));
    }
  },

  info(tag: string, message: string, context?: LogContext) {
    console.info(formatLog('info', tag, message, context));
  },

  warn(tag: string, message: string, context?: LogContext) {
    console.warn(formatLog('warn', tag, message, context));
  },

  error(tag: string, message: string, error?: unknown, context?: LogContext) {
    const errCtx = error instanceof Error
      ? { ...context, errorName: error.name, errorMessage: error.message, stack: error.stack }
      : { ...context, error };
    console.error(formatLog('error', tag, message, errCtx));
  },
};
