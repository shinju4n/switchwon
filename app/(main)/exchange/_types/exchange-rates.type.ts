import { ForexCurrency } from '../_utils/currency';

export type ExchangeRatesLatestResponse = ExchangeRate[];

export type ExchangeRate = {
  exchangeRateId: number;
  currency: ForexCurrency;
  rate: number;
  changePercentage: number;
  applyDateTime: string;
};
