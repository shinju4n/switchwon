import { api } from '@/lib/api';
import { ApiResponse } from '@/types/common.type';
import { OrderHistoryResponse } from '../_types/order-history.type';

export const getOrderHistoryApi = async () => {
  return api<ApiResponse<OrderHistoryResponse>>('/api/proxy/orders');
};
