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

export const api = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return data;
};
