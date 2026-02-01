import { Suspense } from 'react';
import { OrderHistoryTable } from './_components/order-history-table';
import { Loading } from '@/components/ui/loading';
import { PageHeader } from '@/components/layout/page-header';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { getOrderHistoryApi } from './_api/order-history.api';

const ExchangeHistoryPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.order.history(),
    queryFn: () => getOrderHistoryApi(),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col gap-4">
        <PageHeader
          title="환전 내역"
          description="환전 내역을 확인할 수 있어요."
        />
        <div className="p-20 pt-0">
          <Suspense
            fallback={
              <div className="flex min-h-[500px] items-center justify-center">
                <Loading />
              </div>
            }
          >
            <OrderHistoryTable />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default ExchangeHistoryPage;
