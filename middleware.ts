import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePage = ['/prompts', '/files']

export const middleware = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  const isAdmin = token?.isAdmin

  const { pathname } = request.nextUrl

  // ignore API & static files
  if (
    pathname.includes('/api/auth') ||
    pathname.includes('/_next') ||
    pathname === '/sign-in' ||
    pathname === '/favicon-32x32.png' ||
    pathname === '/spaceUp.gif' ||
    pathname === '/huce.jpg'
  ) {
    return NextResponse.next()
  }

  // redirect to Homepage
  // if (token && pathname === '/sign-in') {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // require login
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // private pages
  if (!isAdmin && privatePage.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
