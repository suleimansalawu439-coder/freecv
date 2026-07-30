import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || '***REMOVED***';
const key = new TextEncoder().encode(secretKey);

export async function signAdminToken() {
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload?.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function signUserToken(email: string) {
  return await new SignJWT({ role: 'user', email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(key);
}

export async function verifyUserToken(token: string) {
  try {
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
