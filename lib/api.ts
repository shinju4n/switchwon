interface ApiErrorResponse {
  code: string;
  message: string;
  data?: unknown;
}

export class ApiError extends Error {
  public code: string;
  public data?: unknown;

  constructor(
    public status: number,
    response: ApiErrorResponse
  ) {
    super(response.message);
    this.name = 'ApiError';
    this.code = response.code;
    this.data = response.data;
  }
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
};

export const api = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const isServer = typeof window === 'undefined';
  let authHeaders = {};
  if (isServer) {
    // 서버 환경일 때만 현재 요청의 헤더(쿠키 포함)를 가져와서 복사합니다.
    const { headers } = await import('next/headers');
    const requestHeaders = await headers();
    const cookie = requestHeaders.get('cookie');
    if (cookie) {
      authHeaders = { cookie };
    }
  }

  const response = await fetch(`${getBaseUrl()}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...options?.headers,
    },
    ...options,
  });

  const data: T = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data as ApiErrorResponse);
  }

  return data;
};
