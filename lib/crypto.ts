import crypto from 'crypto';

/**
 * Compares two strings in constant time to protect against timing attacks.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'utf-8');
    const bufB = Buffer.from(b, 'utf-8');
    if (bufA.length !== bufB.length) {
      // Dummy compare to avoid timing leak on length mismatch
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Verifies a Paystack HMAC SHA-512 webhook signature against the raw request body.
 */
export function verifyPaystackSignature(
  rawBody: string | Buffer,
  signature: string,
  secretKey: string
): boolean {
  if (!signature || !secretKey) return false;
  const hash = crypto
    .createHmac('sha512', secretKey)
    .update(typeof rawBody === 'string' ? rawBody : Buffer.from(rawBody))
    .digest('hex');
  return timingSafeCompare(hash, signature);
}

/**
 * Verifies a generic HMAC SHA-256 webhook signature against the raw request body.
 */
export function verifyHmacSha256(
  rawBody: string | Buffer,
  signature: string,
  secretKey: string
): boolean {
  if (!signature || !secretKey) return false;
  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(typeof rawBody === 'string' ? rawBody : Buffer.from(rawBody))
    .digest('hex');
  return timingSafeCompare(hash, signature);
}

/**
 * Generates a cryptographically secure random token in hex format.
 */
export function generateSecureToken(bytes: number = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}
