import { renderHook, act, waitFor } from '@testing-library/react';
import { useExchangeForm } from './useExchangeForm';
import { useExchangeRateLatest } from './useExchangeRateLatest';
import { useWallet } from './useWallet';
import { useQuote } from './useQuote';
import { useOrder } from './useOrder';

jest.mock('./useExchangeRateLatest');
jest.mock('./useWallet');
jest.mock('./useQuote');
jest.mock('./useOrder');

const mockMutate = jest.fn();

const DEFAULT_RATES = [
  { currency: 'USD', rate: 1300, exchangeRateId: 'rate-1' },
  { currency: 'JPY', rate: 9.5, exchangeRateId: 'rate-2' },
];

const DEFAULT_WALLETS = [
  { currency: 'KRW', balance: 1_300_000 },
  { currency: 'USD', balance: 500 },
  { currency: 'JPY', balance: 10_000 },
];

const setupMocks = ({
  rates = DEFAULT_RATES,
  wallets = DEFAULT_WALLETS,
  quote = null as { krwAmount: number; forexAmount: number } | null,
  quoteLoading = false,
  quoteUpdating = false,
} = {}) => {
  (useExchangeRateLatest as jest.Mock).mockReturnValue({
    data: { data: rates },
  });

  (useWallet as jest.Mock).mockReturnValue({
    data: { data: { wallets } },
  });

  (useQuote as jest.Mock).mockReturnValue({
    data: quote ? { data: quote } : null,
    isLoading: quoteLoading,
    isUpdating: quoteUpdating,
  });

  (useOrder as jest.Mock).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
  });
};

describe('useExchangeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setMaxAmount', () => {
    it('매수 시 KRW 잔액을 환율로 나누어 최대 외화 금액 계산', async () => {
      setupMocks();
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.setMaxAmount();
      });

      // Math.floor(1,300,000 / 1,300) = 1,000
      await waitFor(() => {
        expect(result.current.forexAmount).toBe(1000);
      });
    });

    it('매도 시 보유 외화 잔액을 그대로 입력', async () => {
      setupMocks();
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('exchangeType', 'sell');
      });

      act(() => {
        result.current.setMaxAmount();
      });

      await waitFor(() => {
        expect(result.current.forexAmount).toBe(500);
      });
    });

    it('KRW 잔액이 0이면 0이 입력됨', async () => {
      setupMocks({
        wallets: [
          { currency: 'KRW', balance: 0 },
          { currency: 'USD', balance: 500 },
        ],
      });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.setMaxAmount();
      });

      await waitFor(() => {
        expect(result.current.forexAmount).toBe(0);
      });
    });

    it('환율 정보가 없으면 금액이 변경되지 않음', async () => {
      setupMocks({ rates: [] });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.setMaxAmount();
      });

      await waitFor(() => {
        expect(result.current.forexAmount).toBe(0);
      });
    });
  });

  describe('checkBalanceError', () => {
    it('매수 시 KRW 잔액이 부족하면 에러 메시지 반환', async () => {
      setupMocks({
        quote: { krwAmount: 2_000_000, forexAmount: 100 },
        wallets: [
          { currency: 'KRW', balance: 1_000_000 },
          { currency: 'USD', balance: 500 },
        ],
      });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('forexAmount', 100);
      });

      await waitFor(() => {
        expect(result.current.checkBalanceError).toContain(
          'KRW 잔액이 부족합니다'
        );
      });
    });

    it('매수 시 KRW 잔액이 충분하면 에러 없음', async () => {
      setupMocks({
        quote: { krwAmount: 500_000, forexAmount: 100 },
      });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('forexAmount', 100);
      });

      await waitFor(() => {
        expect(result.current.checkBalanceError).toBeNull();
      });
    });

    it('매도 시 외화 잔액이 부족하면 에러 메시지 반환', async () => {
      setupMocks({
        quote: { krwAmount: 1_300_000, forexAmount: 1000 },
        wallets: [
          { currency: 'KRW', balance: 1_300_000 },
          { currency: 'USD', balance: 100 },
        ],
      });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('exchangeType', 'sell');
        result.current.form.setValue('forexAmount', 1000);
      });

      await waitFor(() => {
        expect(result.current.checkBalanceError).toContain(
          'USD 잔액이 부족합니다'
        );
      });
    });

    it('금액이 0이면 에러 없음', () => {
      setupMocks({
        quote: { krwAmount: 2_000_000, forexAmount: 0 },
      });
      const { result } = renderHook(() => useExchangeForm());

      expect(result.current.checkBalanceError).toBeNull();
    });
  });

  describe('isSubmitDisabled', () => {
    it('금액이 0이면 비활성화', () => {
      setupMocks();
      const { result } = renderHook(() => useExchangeForm());

      expect(result.current.isSubmitDisabled).toBe(true);
    });

    it('견적 로딩 중이면 비활성화', async () => {
      setupMocks({ quoteLoading: true });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('forexAmount', 100);
      });

      await waitFor(() => {
        expect(result.current.isSubmitDisabled).toBe(true);
      });
    });

    it('환율 정보가 없으면 비활성화', async () => {
      setupMocks({ rates: [] });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('forexAmount', 100);
      });

      await waitFor(() => {
        expect(result.current.isSubmitDisabled).toBe(true);
      });
    });

    it('잔액 부족 시 비활성화', async () => {
      setupMocks({
        quote: { krwAmount: 2_000_000, forexAmount: 100 },
        wallets: [
          { currency: 'KRW', balance: 1_000_000 },
          { currency: 'USD', balance: 500 },
        ],
      });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('forexAmount', 100);
      });

      await waitFor(() => {
        expect(result.current.checkBalanceError).not.toBeNull();
        expect(result.current.isSubmitDisabled).toBe(true);
      });
    });
  });

  describe('handleSubmit', () => {
    it('매수 시 올바른 파라미터로 주문 요청', async () => {
      setupMocks({
        quote: { krwAmount: 130_000, forexAmount: 100 },
      });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('forexAmount', 100);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockMutate).toHaveBeenCalledWith({
        exchangeRateId: 'rate-1',
        fromCurrency: 'KRW',
        toCurrency: 'USD',
        forexAmount: 100,
      });
    });

    it('매도 시 올바른 파라미터로 주문 요청', async () => {
      setupMocks({
        quote: { krwAmount: 130_000, forexAmount: 100 },
      });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('exchangeType', 'sell');
        result.current.form.setValue('forexAmount', 100);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockMutate).toHaveBeenCalledWith({
        exchangeRateId: 'rate-1',
        fromCurrency: 'USD',
        toCurrency: 'KRW',
        forexAmount: 100,
      });
    });

    it('JPY 매수 시 올바른 파라미터로 주문 요청', async () => {
      setupMocks({
        quote: { krwAmount: 95_000, forexAmount: 10000 },
      });
      const { result } = renderHook(() => useExchangeForm());

      act(() => {
        result.current.form.setValue('selectedCurrency', 'JPY');
        result.current.form.setValue('forexAmount', 10000);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockMutate).toHaveBeenCalledWith({
        exchangeRateId: 'rate-2',
        fromCurrency: 'KRW',
        toCurrency: 'JPY',
        forexAmount: 10000,
      });
    });
  });
});
