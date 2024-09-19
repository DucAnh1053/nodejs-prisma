import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Assuming the token is stored in cookies

  const { pathname } = req.nextUrl;

  // If user is not logged in and trying to access the root "/"
  if (!token && pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If user is logged in and trying to access "/auth/login"
  if (token && pathname.startsWith('/auth/login')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Define the paths where the middleware should run
export const config = {
  matcher: ['/', '/auth/login'],
};
