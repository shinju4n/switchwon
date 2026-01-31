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
} as const;
