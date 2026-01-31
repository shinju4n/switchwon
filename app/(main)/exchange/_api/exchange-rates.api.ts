import { api } from '@/lib/api';
import { ApiResponse } from '@/types/common.type';
import { ExchangeRatesLatestResponse } from '../_types/exchange-rates.type';

export const getExchangeRatesLatestApi = async () => {
  return api<ApiResponse<ExchangeRatesLatestResponse>>(
    `/api/proxy/exchange-rates/latest`,
    {
      method: 'GET',
    }
  );
};
