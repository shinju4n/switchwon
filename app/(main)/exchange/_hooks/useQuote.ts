import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { requestQuoteApi } from '../_api/quote.api';
import { queryKeys } from '@/constants/query-keys';
import {
  getCurrencyPair,
  ExchangeType,
  ForexCurrency,
} from '../_utils/currency';

const DEBOUNCE_MS = 400;

export const useQuote = (
  exchangeType: ExchangeType,
  selectedCurrency: ForexCurrency,
  forexAmount: number = 0
) => {
  const [debouncedAmount, setDebouncedAmount] = useState(forexAmount);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAmount(forexAmount);
    }, DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [forexAmount]);

  const { fromCurrency, toCurrency } = getCurrencyPair(
    exchangeType,
    selectedCurrency
  );

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.exchange.quote(
      exchangeType,
      selectedCurrency,
      debouncedAmount
    ),
    queryFn: () =>
      requestQuoteApi({
        fromCurrency,
        toCurrency,
        forexAmount: debouncedAmount,
      }),
    enabled: debouncedAmount > 0,
  });

  return {
    data,
    isLoading,
    isUpdating: forexAmount !== debouncedAmount,
    error,
  };
};
