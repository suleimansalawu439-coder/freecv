import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Secret keys should NOT fallback to literals.
// We must get this from environment ONLY. If missing, it'll throw an error when used.
const secretKeyString = process.env.JWT_SECRET;
let key: Uint8Array;

if (secretKeyString) {
  key = new TextEncoder().encode(secretKeyString);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login and API login route)
  if (
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    !pathname.startsWith('/api/admin/login')
  ) {
    const adminSession = request.cookies.get('admin_session')?.value;

    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      if (!key) {
        throw new Error('JWT_SECRET is missing. Authentication cannot proceed.');
      }
      
      const { payload } = await jwtVerify(adminSession, key, {
        algorithms: ['HS256'],
      });

      if (payload?.role !== 'admin') {
        throw new Error('Not an admin');
      }
    } catch (error) {
      // Token is invalid, expired, or secret is missing.
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Protect /api/admin routes (except login)
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
      const adminSession = request.cookies.get('admin_session')?.value;

      if (!adminSession) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      try {
        if (!key) {
           return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
        }
        
        const { payload } = await jwtVerify(adminSession, key, {
          algorithms: ['HS256'],
        });
  
        if (payload?.role !== 'admin') {
          throw new Error('Not an admin');
        }
      } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ],
};
