import type { NextConfig } from 'next';

if (
  process.env.NODE_ENV === 'production' &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  throw new Error('환경 변수가 설정되지 않았습니다. NEXT_PUBLIC_SITE_URL');
}

const nextConfig: NextConfig = {};

export default nextConfig;
