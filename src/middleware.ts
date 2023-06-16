import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  if (!req.cookies.get('next-auth.session-token')?.value) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
};

export const config = {
  matcher: ['/categories/:path*'],
};
