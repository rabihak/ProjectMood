import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)'], // Run middleware on API routes
};
const isProtectedRoute = createRouteMatcher([
  '/new-user(.*)/(.*)',
  '/new-user',
  '/journal',
  '/journal/(.*)',
  '/new-user/(.*)',
  '/history',
  '/journal(.*)/(.*)',
  '/api(.*)/(.*)',
]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
}); 