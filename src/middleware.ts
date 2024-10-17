import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = false;

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login');

  const isMainGroupRoute =
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/automation') ||
    request.nextUrl.pathname.startsWith('/profile');

  if (!isLoggedIn) {
    if (isMainGroupRoute) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
