'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // TODO: 에러 로그 전송
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          문제가 발생했습니다
        </h2>
        <p className="text-gray-600">
          {error.message || '알 수 없는 오류가 발생했습니다.'}
        </p>
      </div>
      <Button onClick={reset} variant="outline">
        다시 시도
      </Button>
    </div>
  );
};

export default Error;
