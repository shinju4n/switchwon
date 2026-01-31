import { api } from '@/lib/api';
import { ApiResponse } from '@/types/common.type';
import { OrderRequest, OrderResponse } from '../_types/order.type';

export const createOrderApi = async (request: OrderRequest) => {
  return api<ApiResponse<OrderResponse>>('/api/proxy/orders', {
    method: 'POST',
    body: JSON.stringify(request),
  });
};
