import { Currency } from '@/types/exchange.type';

export type OrderRequest = {
  exchangeRateId: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  forexAmount: number;
};

export type OrderResponse = {
  orderId: number;
  status: string;
};
