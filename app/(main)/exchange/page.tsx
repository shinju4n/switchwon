import { PageHeader } from '@/components/layout/page-header';
import { CurrencyDashboard } from './_components/currency-dashboard';
import { WalletCard } from './_components/wallet-card';
import { ExchangeForm } from './_components/exchange-form';
import { Suspense } from 'react';
import { Loading } from '@/components/ui/loading';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getExchangeRatesLatestApi } from './_api/exchange-rates.api';
import { queryKeys } from '@/constants/query-keys';

const ExchangePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.exchange.rates(),
    queryFn: () => getExchangeRatesLatestApi(),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-full flex-col gap-6">
        <PageHeader
          title="환율 정보"
          description="실시간 환율을 확인하고 간편하게 환전하세요."
        />
        <Suspense
          fallback={
            <div className="flex min-h-[500px] items-center justify-center">
              <Loading />
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-6 p-20 pt-0">
            <div className="flex flex-col gap-6">
              <CurrencyDashboard />
              <WalletCard />
            </div>
            <ExchangeForm />
          </div>
        </Suspense>
      </div>
    </HydrationBoundary>
  );
};

export default ExchangePage;
