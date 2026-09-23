import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';

/**
 * Generic 500 response that never leaks internal error details to the client.
 * The full error is logged server-side via the repo logger; the caller only
 * ever sees a fixed, non-informative message.
 */
export function apiError(context: string, err: unknown) {
  logger.error(context, 'Request failed:', err);
  return NextResponse.json(
    { error: 'Something went wrong. Please try again.' },
    { status: 500 }
  );
}
