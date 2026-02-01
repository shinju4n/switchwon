import { useSuspenseQuery } from '@tanstack/react-query';
import { getOrderHistoryApi } from '../_api/order-history.api';
import { queryKeys } from '@/constants/query-keys';

export const useOrderHistory = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.order.history(),
    queryFn: getOrderHistoryApi,
  });
};
