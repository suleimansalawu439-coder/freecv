import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('admin_session');
    
    // If no cookie or it doesn't match the password (we just check presence in middleware, full validation is in API)
    // Actually, storing the raw password in a cookie isn't great, but for a solo-admin dashboard behind an env var, we can hash it or just use a basic token.
    // Let's just check if the cookie exists. The API sets a signed/secure token.
    if (!adminSession?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
