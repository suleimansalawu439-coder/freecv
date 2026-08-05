import { NextResponse } from 'next/server';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: Record<string, unknown>;
}

/**
 * Returns a standardized success JSON response.
 */
export function apiSuccess<T>(
  data: T,
  status: number = 200,
  meta?: Record<string, unknown>
): NextResponse<ApiResponse<T>> {
  const body: ApiResponse<T> = {
    success: true,
    data,
    ...(meta ? { meta } : {}),
  };
  return NextResponse.json(body, { status });
}

/**
 * Returns a standardized error JSON response.
 */
export function apiError(
  message: string,
  status: number = 400,
  code: string = 'BAD_REQUEST',
  details?: unknown
): NextResponse<ApiResponse<null>> {
  const body: ApiResponse<null> = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
  return NextResponse.json(body, { status });
}

export function apiUnauthorized(message: string = 'Unauthorized'): NextResponse<ApiResponse<null>> {
  return apiError(message, 401, 'UNAUTHORIZED');
}

export function apiForbidden(message: string = 'Forbidden'): NextResponse<ApiResponse<null>> {
  return apiError(message, 403, 'FORBIDDEN');
}

export function apiNotFound(message: string = 'Resource not found'): NextResponse<ApiResponse<null>> {
  return apiError(message, 404, 'NOT_FOUND');
}

export function apiBadRequest(message: string = 'Invalid request', details?: unknown): NextResponse<ApiResponse<null>> {
  return apiError(message, 400, 'INVALID_PAYLOAD', details);
}

export function apiInternalError(message: string = 'An unexpected server error occurred'): NextResponse<ApiResponse<null>> {
  return apiError(message, 500, 'INTERNAL_SERVER_ERROR');
}
