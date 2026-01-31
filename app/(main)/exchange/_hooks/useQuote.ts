import { useQuery } from '@tanstack/react-query';
import { requestQuoteApi } from '../_api/quote.api';
import { QuoteRequest } from '../_types/quote.type';
import { useEffect, useState } from 'react';
import { Currency } from '@/types/exchange.type';

const getQuoteRequest = (
  type: 'buy' | 'sell',
  selectedCurrency: Exclude<Currency, 'KRW'>,
  forexAmount: number
): QuoteRequest => {
  const fromCurrency = type === 'buy' ? 'KRW' : selectedCurrency;
  const toCurrency = type === 'buy' ? selectedCurrency : 'KRW';
  return {
    fromCurrency,
    toCurrency,
    forexAmount: Number(forexAmount),
  };
};

export const useQuote = (
  type: 'buy' | 'sell',
  selectedCurrency: Exclude<Currency, 'KRW'>,
  forexAmount: number
) => {
  const [debouncedAmount, setDebouncedAmount] = useState(forexAmount);

  // 디바운스 처리
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAmount(forexAmount);
    }, 400);

    return () => clearTimeout(handler);
  }, [forexAmount]);
  const { data, isLoading, error } = useQuery({
    queryKey: ['quote', type, debouncedAmount],
    queryFn: () =>
      requestQuoteApi(getQuoteRequest(type, selectedCurrency, debouncedAmount)),
    enabled: debouncedAmount > 0,
  });

  return {
    data,
    isLoading,
    isUpdating: forexAmount !== debouncedAmount,
    error,
  };
};
