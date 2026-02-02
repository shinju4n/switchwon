import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
      </div>
      <Button asChild>
        <Link href="/exchange">홈으로 이동</Link>
      </Button>
    </div>
  );
};

export default NotFound;
