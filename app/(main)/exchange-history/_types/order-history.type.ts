import { Currency } from '@/types/exchange.type';

export type OrderHistoryResponse = OrderHistory[];

export type OrderHistory = {
  orderId: number;
  fromCurrency: Currency;
  fromAmount: number;
  toCurrency: Currency;
  toAmount: number;
  appliedRate: number;
  orderedAt: string;
};
