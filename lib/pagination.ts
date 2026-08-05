/**
 * Standardized pagination parser and helper for API routes and database queries.
 */
export interface PaginationParams {
  page: number;
  limit: number;
  from: number;
  to: number;
}

export function getPaginationParams(
  req: Request,
  options: { defaultLimit?: number; maxLimit?: number } = {}
): PaginationParams {
  const { defaultLimit = 20, maxLimit = 100 } = options;
  const url = new URL(req.url);
  
  const rawPage = parseInt(url.searchParams.get('page') || '1', 10);
  const rawLimit = parseInt(url.searchParams.get('limit') || defaultLimit.toString(), 10);

  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const limit = isNaN(rawLimit) || rawLimit < 1 ? defaultLimit : Math.min(rawLimit, maxLimit);

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  return { page, limit, from, to };
}

export function formatPaginatedResponse<T>(
  data: T[],
  totalCount: number | null,
  params: PaginationParams
) {
  const total = totalCount ?? data.length;
  const totalPages = Math.ceil(total / params.limit);
  return {
    data,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
}
