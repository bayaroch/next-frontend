import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(_request: NextRequest) {
  // Add any non-auth related logic here
  // For example, setting headers or handling specific redirects

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
