export type ExchangeRatesLatestResponse = ExchangeRatesLatest[];

export type ExchangeRatesLatest = {
  exchangeRateId: number;
  currency: string;
  rate: number;
  changePercentage: number;
  applyDateTime: string;
};
