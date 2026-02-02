import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

/**
 * 테스트용 QueryClient wrapper 생성
 */
export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);

  return { Wrapper, queryClient };
};
