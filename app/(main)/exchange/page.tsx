'use client';

import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const ExchangePage = () => {
  // TODO: 지갑 데이터 연동
  const { data: _wallets } = useQuery({
    queryKey: ['wallets'],
    queryFn: () => api('/api/proxy/wallets'),
    retry: false,
  });

  return <div>ExchangePage</div>;
};

export default ExchangePage;
