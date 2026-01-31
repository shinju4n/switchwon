import { Currency } from '@/types/exchange.type';

export type ExchangeRatesLatestResponse = ExchangeRatesLatest[];

export type ExchangeRatesLatest = {
  exchangeRateId: number;
  currency: Currency;
  rate: number;
  changePercentage: number;
  applyDateTime: string;
};
