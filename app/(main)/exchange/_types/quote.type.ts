import { Currency } from '@/types/exchange.type';

export type QuoteRequest = {
  fromCurrency: Currency;
  toCurrency: Currency;
  forexAmount: number;
};

export type QuoteResponse = {
  krwAmount: number;
  appliedRate: number;
};
