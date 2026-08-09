import { SignJWT, jwtVerify } from 'jose';

function getSecretKey() {
  const secretKeyString = process.env.JWT_SECRET;
  if (!secretKeyString) {
    throw new Error('JWT_SECRET environment variable is missing.');
  }
  return new TextEncoder().encode(secretKeyString);
}

// Admin JWTs are deprecated. Admin uses Supabase Auth.

export async function signUserToken(email: string) {
  const key = getSecretKey();
  return await new SignJWT({ role: 'user', email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(key);
}

export async function verifyUserToken(token: string) {
  try {
    const key = getSecretKey();
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    if (payload?.role === 'user' && typeof payload?.email === 'string') {
      return payload.email;
    }
    return null;
  } catch (error) {
    return null;
  }
}
