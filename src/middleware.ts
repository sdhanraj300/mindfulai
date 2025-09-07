import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /chat, /profile)
  const { pathname } = request.nextUrl
  
  // Define which paths require authentication
  const protectedPaths = ['/chat', '/profile']
  
  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  
  if (isProtectedPath) {
    // Get the user's token
    const token = await getToken({ 
      req: request, 
      secret: process.env.AUTH_SECRET 
    })
    
    // If no token, redirect to sign-in
    if (!token) {
      const signInUrl = new URL('/api/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }
  
  // Allow the request to continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/chat/:path*',
    '/profile/:path*'
  ]
}