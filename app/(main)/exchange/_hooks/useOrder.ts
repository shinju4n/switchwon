import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrderApi } from '../_api/order.api';
import { OrderRequest } from '../_types/order.type';
import { queryKeys } from '@/constants/query-keys';
import { toast } from 'sonner';

export const useOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: OrderRequest) => createOrderApi(request),
    onSuccess: () => {
      toast.success('환전이 완료되었습니다');
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.all });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
