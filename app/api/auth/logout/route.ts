import { TOKEN_KEY } from '@/constants/token';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);

  return NextResponse.json({
    code: 'OK',
    message: '로그아웃 성공',
    data: null,
  });
}
