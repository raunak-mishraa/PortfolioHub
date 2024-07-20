import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;
    const token = await getToken({
      req: request,
    })

    const publicPaths = url === '/' || url === '/signin' || url === '/signup';
    if(token && publicPaths){
        return NextResponse.redirect(new URL('/developer-profile', request.nextUrl))
    }

    if(!token && !publicPaths){
        return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }
}
 
export const config = {
  matcher: ['/', '/signin', '/signup', '/developer-profile', '/projects', '/create'],
}