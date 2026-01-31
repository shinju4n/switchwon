import { TOKEN_KEY } from '@/constants/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ALL_METHODS = async (
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY)?.value;
  const { path } = await params;

  const targetPath = path.join('/');
  const { search } = new URL(request.url);
  const targetUrl = `${API_URL}/${targetPath}${search}`;

  let body;
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    body = await request.text();
  }

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body,
    });

    const data = await response.json();

    if (response.status === 401) {
      cookieStore.delete(TOKEN_KEY);
      return NextResponse.json(data, { status: 401 });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export {
  ALL_METHODS as GET,
  ALL_METHODS as POST,
  ALL_METHODS as PUT,
  ALL_METHODS as DELETE,
};
