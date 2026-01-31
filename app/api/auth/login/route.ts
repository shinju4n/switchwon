import { LoginResponse } from '@/app/(auth)/login/_types/login.type';
import { TOKEN_KEY } from '@/constants/token';
import { ApiResponse } from '@/types/common.type';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  if (!API_URL) {
    return NextResponse.json(
      { code: 'SERVER_ERROR', message: '서버 설정 오류입니다.', data: null },
      { status: 500 }
    );
  }

  try {
    const { email } = await request.json();

    const response = await fetch(
      `${API_URL}/auth/login?email=${encodeURIComponent(email)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const result: ApiResponse<LoginResponse> = await response.json();

    if (result.code === 'OK') {
      const cookieStore = await cookies();
      const { token } = result.data;
      cookieStore.set(TOKEN_KEY, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      return NextResponse.json(result);
    }

    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        code: 'SERVER_ERROR',
        message: '로그인 처리 중 오류가 발생했습니다.',
        data: null,
      },
      { status: 500 }
    );
  }
}
