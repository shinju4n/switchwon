import { Currency } from '@/types/exchange.type';

type CurrencyMeta = {
  name: string;
  shortName: string;
  iconUrl: string;
};

export const CURRENCY_META: Record<Exclude<Currency, 'KRW'>, CurrencyMeta> = {
  USD: {
    name: '미국 USD',
    shortName: '달러',
    iconUrl: '/icons/united-states.png',
  },
  JPY: {
    name: '일본 JPY',
    shortName: '엔화',
    iconUrl: '/icons/japan.png',
  },
};

/**
 * 통화 기호
 */
export const CURRENCY_SYMBOL: Record<Currency, string> = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
};
