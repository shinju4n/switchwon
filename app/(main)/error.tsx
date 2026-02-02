'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const MainError = ({ error, reset }: ErrorProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error('Main Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          문제가 발생했습니다
        </h2>
        <p className="text-gray-600">
          {error.message || '페이지를 불러오는 중 오류가 발생했습니다.'}
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline">
          다시 시도
        </Button>
        <Button onClick={() => router.push('/exchange')}>홈으로 이동</Button>
      </div>
    </div>
  );
};

export default MainError;
