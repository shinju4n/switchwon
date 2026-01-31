import { ApiResponse } from '@/types/common.type';
import { QuoteRequest, QuoteResponse } from '../_types/quote.type';
import { api } from '@/lib/api';

export const requestQuoteApi = async (request: QuoteRequest) => {
  const url = `/api/proxy/orders/quote?fromCurrency=${request.fromCurrency}&toCurrency=${request.toCurrency}&forexAmount=${request.forexAmount}`;
  return api<ApiResponse<QuoteResponse>>(url.toString(), {
    method: 'GET',
  });
};
