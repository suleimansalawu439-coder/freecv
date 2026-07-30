import * as jose from 'jose';

// Helper for HS256 (Shared Secret) decoding - used for legacy keys
async function verifyLegacyToken(token: string, secret: string) {
  try {
    const encoder = new TextEncoder();
    const { payload } = await jose.jwtVerify(token, encoder.encode(secret));
    return payload.sub;
  } catch (e) {
    return null;
  }
}

export async function getUser(req: Request) {
  // ... rest of your auth check logic
}
