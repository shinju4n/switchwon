import { Currency } from '@/types/exchange.type';

type CurrencyMeta = {
  countryName: string;
  currencyName: string;
  currencySymbol: string;
  currencyCode: string;
  iconUrl: string;
};

/**
 * 통화 기호
 */
export const CURRENCY_SYMBOL: Record<Currency, string> = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
};

export const CURRENCY_META: Record<Exclude<Currency, 'KRW'>, CurrencyMeta> = {
  USD: {
    countryName: '미국',
    currencyName: '달러',
    currencyCode: 'USD',
    currencySymbol: CURRENCY_SYMBOL.USD,
    iconUrl: '/icons/united-states.png',
  },
  JPY: {
    countryName: '일본',
    currencyName: '엔화',
    currencyCode: 'JPY',
    currencySymbol: CURRENCY_SYMBOL.JPY,
    iconUrl: '/icons/japan.png',
  },
};
