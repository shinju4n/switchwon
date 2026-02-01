import { useSuspenseQuery } from '@tanstack/react-query';
import { getExchangeRatesLatestApi } from '../_api/exchange-rates.api';
import { queryKeys } from '@/constants/query-keys';
import { sortForex } from '../_utils/currency';

export const useExchangeRateLatest = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.exchange.rates(),
    queryFn: getExchangeRatesLatestApi,
    refetchInterval: 1000 * 60 * 1,
    select: (data) => ({
      ...data,
      data: sortForex(data.data),
    }),
  });
};
