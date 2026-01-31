import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TOKEN_KEY } from './constants/token';
import { DEFAULT_PROTECTED_PATH } from './constants/path';

const PROTECTED_PATHS = ['/exchange', '/exchange-history'];
const UNPROTECTED_PATHS = ['/login'];

export const proxy = (request: NextRequest) => {
  // 토큰 확인
  const token = request.cookies.get(TOKEN_KEY)?.value;
  const { pathname } = request.nextUrl;

  // 보호가 필요한 경로 정의
  const isProtectedPath = PROTECTED_PATHS.includes(pathname);

  // 토큰이 없는데 보호된 페이지에 접근하려 할 때 -> 로그인으로 리다이렉트
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // 이미 로그인되어 있는 상태라면
  const isUnprotectedPath = UNPROTECTED_PATHS.includes(pathname);
  if (isUnprotectedPath && token) {
    return NextResponse.redirect(new URL(DEFAULT_PROTECTED_PATH, request.url));
  }

  return NextResponse.next();
};

// 5. 미들웨어가 작동할 경로 설정
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
