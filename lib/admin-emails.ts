/**
 * Admin allowlist helper.
 *
 * EDGE-SAFE: pure function of process.env only — no node-only imports,
 * no next/headers. Safe to use in middleware (edge runtime) as well as
 * server routes and helpers.
 */

const DEFAULT_ADMIN_EMAILS = 'hamis@cvyon.com';

/**
 * Returns the normalized admin allowlist.
 */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || DEFAULT_ADMIN_EMAILS)
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * True when the given email is on the admin allowlist.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
