export const queryKeys = {
  exchange: {
    all: ['exchange'] as const,
    rates: () => [...queryKeys.exchange.all, 'rates'] as const,
    quote: (type: string, currency: string, amount: number) =>
      [...queryKeys.exchange.all, 'quote', type, currency, amount] as const,
  },
  wallet: {
    all: ['wallet'] as const,
    list: () => [...queryKeys.wallet.all, 'list'] as const,
  },
  order: {
    all: ['order'] as const,
    history: () => [...queryKeys.order.all, 'history'] as const,
  },
} as const;
