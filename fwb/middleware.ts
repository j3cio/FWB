import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

const publicRoutes = ['/', '/forgotpassword', '/sign-in', 'sign-up']
const protectedRoutes = ['/profile', '/api', '/api/discounts', '/dashboard', '/fre1']

export default authMiddleware({
  publicRoutes,
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && auth.isPublicRoute) {
      return NextResponse.redirect(new URL('/fre1', req.url))
    }
    // Allow users visiting public routes to access them
    return NextResponse.next()
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
