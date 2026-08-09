import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            })
          );
        },
      },
    }
  );

  // Refresh session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect /admin routes (except login and API login route)
  if (
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    !pathname.startsWith('/api/admin/login')
  ) {
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    // Check if user is an admin by validating against ADMIN_EMAILS env variable
    const adminEmails = (process.env.ADMIN_EMAILS || 'hamis@cvyon.com').split(',').map(e => e.trim().toLowerCase());
    if (!user.email || !adminEmails.includes(user.email.toLowerCase())) {
      // User is logged in but NOT an admin
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect /api/admin routes
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const adminEmails = (process.env.ADMIN_EMAILS || 'hamis@cvyon.com').split(',').map(e => e.trim().toLowerCase());
    if (!user.email || !adminEmails.includes(user.email.toLowerCase())) {
      return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
    }
  }

  return supabaseResponse;
}
