export type QuoteRequest = {
  fromCurrency: 'KRW' | 'USD' | 'JPY';
  toCurrency: 'KRW' | 'USD' | 'JPY';
  forexAmount: number;
};

export type QuoteResponse = {
  krwAmount: number;
  appliedRate: number;
};
