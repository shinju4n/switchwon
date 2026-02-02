'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              심각한 오류가 발생했습니다
            </h2>
            <p className="text-gray-600">
              {error.message || '애플리케이션에 문제가 발생했습니다.'}
            </p>
          </div>
          <button
            onClick={reset}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
