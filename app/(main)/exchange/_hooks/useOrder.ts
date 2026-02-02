import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrderApi } from '../_api/order.api';
import { OrderRequest } from '../_types/order.type';
import { queryKeys } from '@/constants/query-keys';
import { toast } from 'sonner';
import { ApiError } from '@/lib/api';

type UseOrderOptions = {
  onSuccess?: () => void;
};

export const useOrder = (options?: UseOrderOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: OrderRequest) => createOrderApi(request),
    onSuccess: () => {
      toast.success('환전이 완료되었습니다');
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
      options?.onSuccess?.();
    },
    onError: (error) => {
      if (
        error instanceof ApiError &&
        error.code === 'EXCHANGE_RATE_MISMATCH'
      ) {
        toast.error('환율이 변경되었습니다. 다시 시도해주세요.');
        queryClient.invalidateQueries({ queryKey: queryKeys.exchange.all });
        return;
      }
      toast.error(error.message);
    },
  });
};
