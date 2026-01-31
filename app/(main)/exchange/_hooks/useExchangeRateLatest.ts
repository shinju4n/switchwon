import { useSuspenseQuery } from '@tanstack/react-query';
import { getExchangeRatesLatestApi } from '../_api/exchange-rates.api';

export const useExchangeRateLatest = () => {
  return useSuspenseQuery({
    queryKey: ['exchangeRatesLatest'],
    queryFn: () => getExchangeRatesLatestApi(),
  });
};
