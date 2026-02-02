import { renderHook, waitFor, act } from '@testing-library/react';
import { useOrder } from './useOrder';
import { createOrderApi } from '../_api/order.api';
import { toast } from 'sonner';
import { ApiError } from '@/lib/api';
import { createWrapper } from '@/__tests__/utils/test-utils';
import {
  createOrderRequest,
  createOrderResponse,
} from '@/__tests__/utils/mock-data';

jest.mock('../_api/order.api');
jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const mockCreateOrderApi = createOrderApi as jest.MockedFunction<
  typeof createOrderApi
>;

describe('useOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('환전 주문 성공 시 성공 토스트 표시', async () => {
    mockCreateOrderApi.mockResolvedValue(createOrderResponse());

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper });

    await act(async () => {
      result.current.mutate(createOrderRequest());
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(toast.success).toHaveBeenCalledWith('환전이 완료되었습니다');
  });

  it('환전 성공 시 onSuccess 콜백 호출', async () => {
    mockCreateOrderApi.mockResolvedValue(createOrderResponse());

    const onSuccess = jest.fn();
    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useOrder({ onSuccess }), {
      wrapper: Wrapper,
    });

    await act(async () => {
      result.current.mutate(createOrderRequest());
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onSuccess).toHaveBeenCalled();
  });

  it('EXCHANGE_RATE_MISMATCH 에러 시 환율 변경 메시지 표시', async () => {
    const apiError = new ApiError(400, {
      code: 'EXCHANGE_RATE_MISMATCH',
      message: '환율 불일치',
    });
    mockCreateOrderApi.mockRejectedValue(apiError);

    const { Wrapper, queryClient } = createWrapper();
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper });

    await act(async () => {
      result.current.mutate(createOrderRequest());
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toast.error).toHaveBeenCalledWith(
      '환율이 변경되었습니다. 다시 시도해주세요.'
    );
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['exchange'],
    });
  });

  it('일반 에러 시 에러 메시지 토스트 표시', async () => {
    mockCreateOrderApi.mockRejectedValue(new Error('잔액이 부족합니다'));

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper });

    await act(async () => {
      result.current.mutate(createOrderRequest());
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(toast.error).toHaveBeenCalledWith('잔액이 부족합니다');
  });

  it('isPending 상태가 올바르게 변경됨', async () => {
    mockCreateOrderApi.mockResolvedValue(createOrderResponse());

    const { Wrapper } = createWrapper();
    const { result } = renderHook(() => useOrder(), { wrapper: Wrapper });

    expect(result.current.isPending).toBe(false);

    await act(async () => {
      result.current.mutate(createOrderRequest());
    });

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });
  });
});
