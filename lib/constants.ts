/**
 * Centralized application constants to eliminate magic numbers.
 */

// Approximate FX to USD conversion rates.
// Reconcile exact cash against Paystack + bank.
export const FX_RATES: Record<string, number> = {
  USD: 1,
  NGN: 1 / 1550,
  GBP: 1.27,
  EUR: 1.08,
  KES: 0.0077,
  ZAR: 0.055,
  GHS: 0.065,
  INR: 0.012,
  CAD: 0.73,
  AUD: 0.66,
};

export const MAX_AI_RETRIES = 3;
export const AI_BASE_DELAY = 1000;
export const AI_MAX_TOKENS_DEFAULT = 2000;
