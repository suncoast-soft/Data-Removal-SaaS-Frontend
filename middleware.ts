import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  let response = await updateSession(request)

  const url = request.nextUrl
  const searchParams = url.searchParams

  response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  // Handle ?test=true -> set test cookie until 3/31/2025
  if (searchParams.get('test') === 'true') {
    response.cookies.set('test', 'true', {
      path: '/',
      expires: new Date('2025-03-31T23:59:59.999Z'),
      httpOnly: false
    })
  }

  // Handle ?upgrade=true -> set upgrade cookie with 1-day expiration
  if (searchParams.get('upgrade') === 'true') {
    response.cookies.set('upgrade', 'true', {
      path: '/',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
