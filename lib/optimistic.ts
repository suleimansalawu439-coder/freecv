/**
 * Utility for performing optimistic client-side mutations with automatic rollback on network failure.
 */

export interface OptimisticMutationOptions<TState, TResult> {
  getState: () => TState;
  applyOptimistic: (state: TState) => void;
  rollback: (previousState: TState) => void;
  mutation: () => Promise<TResult>;
  onSuccess?: (result: TResult) => void;
  onError?: (error: unknown, rolledBackState: TState) => void;
}

export async function executeOptimisticMutation<TState, TResult>(
  options: OptimisticMutationOptions<TState, TResult>
): Promise<{ success: boolean; result?: TResult; error?: unknown }> {
  const previousSnapshot = options.getState();

  // 1. Immediately apply optimistic change in UI
  try {
    options.applyOptimistic(previousSnapshot);
  } catch (err) {
    return { success: false, error: err };
  }

  // 2. Execute async network operation
  try {
    const result = await options.mutation();
    if (options.onSuccess) {
      options.onSuccess(result);
    }
    return { success: true, result };
  } catch (error) {
    // 3. Rollback state to previous snapshot on error
    try {
      options.rollback(previousSnapshot);
    } catch (rollbackErr) {
      console.error('[OptimisticMutation] Rollback failed:', rollbackErr);
    }

    if (options.onError) {
      options.onError(error, previousSnapshot);
    }

    return { success: false, error };
  }
}
