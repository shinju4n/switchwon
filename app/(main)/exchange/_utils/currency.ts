import { Currency } from '@/types/exchange.type';

export type ExchangeType = 'buy' | 'sell';
export type ForexCurrency = Exclude<Currency, 'KRW'>;

/**
 * 환전 타입에 따른 통화 쌍 반환
 * - buy (매수): KRW → 외화 (외화를 사기 위해 KRW 지불)
 * - sell (매도): 외화 → KRW (외화를 팔고 KRW 수령)
 */
export const getCurrencyPair = (
  exchangeType: ExchangeType,
  forexCurrency: ForexCurrency
): { fromCurrency: Currency; toCurrency: Currency } => {
  return exchangeType === 'buy'
    ? { fromCurrency: 'KRW', toCurrency: forexCurrency }
    : { fromCurrency: forexCurrency, toCurrency: 'KRW' };
};

/**
 * 환전 타입에 따른 UI 텍스트
 */
export const EXCHANGE_TYPE_TEXT = {
  buy: {
    label: '살래요',
    amountLabel: '매수 금액',
    actionSuffix: (currency: string) => `${currency} 사기`,
    resultLabel: '필요 원화',
    resultSuffix: '원 필요해요',
  },
  sell: {
    label: '팔래요',
    amountLabel: '매도 금액',
    actionSuffix: (currency: string) => `${currency} 팔기`,
    resultLabel: '받을 원화',
    resultSuffix: '원 받을 수 있어요',
  },
} as const;
