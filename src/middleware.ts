import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the "token" cookie from the incoming request
  const tokenCookie = request.cookies.get('token');
  const url = request.nextUrl;

  // Define the paths that can be accessed based on the token presence
  const protectedRoutes = ['/user/', '/dashboard', '/book-ride']; // Adjusted to match beginning of user route
  const publicRoutes = ['/about', '/signin', '/signup'];

  // Check if the requested URL matches protected routes
  const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route));
  const isPublicRoute = publicRoutes.includes(url.pathname);

  // If the route is protected and there is no token, redirect to sign-in
  if (isProtectedRoute && !tokenCookie) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // If the user is authenticated and trying to access public routes, redirect to dashboard
  if (tokenCookie && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Continue to the next middleware or request handler
  return NextResponse.next();
}

// Define the paths the middleware should run on
export const config = {
  matcher: ['/user/:path*', '/dashboard', '/book-ride', '/about', '/signin', '/signup'],
};
