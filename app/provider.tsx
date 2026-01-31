'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';

import { ApiError } from '@/lib/api';

const handleGlobalError = (error: Error) => {
  if (error instanceof ApiError && error.code === 'UNAUTHORIZED') {
    const { pathname, search } = window.location;
    const fullPath = search ? `${pathname}${search}` : pathname;
    const returnTo = encodeURIComponent(fullPath);
    window.location.href = `/login?redirect=${returnTo}`;
  }
};

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: handleGlobalError,
        }),
        mutationCache: new MutationCache({
          onError: handleGlobalError,
        }),
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};
