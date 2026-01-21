import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // This is a placeholder middleware
  // Actual authentication checks are done in the page components
  // because Supabase client-side auth is used
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
