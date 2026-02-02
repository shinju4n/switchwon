import { ApiResponse } from '@/types/common.type';
import {
  OrderRequest,
  OrderResponse,
} from '@/app/(main)/exchange/_types/order.type';
import { LoginResponse } from '@/app/(auth)/login/_types/login.type';

// ============ Order ============

export const createOrderRequest = (
  overrides?: Partial<OrderRequest>
): OrderRequest => ({
  exchangeRateId: 1,
  fromCurrency: 'KRW',
  toCurrency: 'USD',
  forexAmount: 100,
  ...overrides,
});

export const createOrderResponse = (
  overrides?: Partial<OrderResponse>
): ApiResponse<OrderResponse> => ({
  code: 'OK',
  message: 'success',
  data: {
    orderId: 1,
    status: 'COMPLETED',
    ...overrides,
  },
});

// ============ Login ============

export const TEST_EMAIL = 'test@example.com';

export const createLoginResponse = (
  overrides?: Partial<LoginResponse>
): ApiResponse<LoginResponse> => ({
  code: 'OK',
  message: 'success',
  data: {
    token: 'test-token',
    memberId: 1,
    ...overrides,
  },
});
