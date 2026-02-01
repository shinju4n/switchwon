import { Currency } from '@/types/exchange.type';

export type Wallet = {
  walletId: number;
  currency: Currency;
  balance: number;
};

export type WalletResponse = {
  totalKrwBalance: number;
  wallets: Wallet[];
};
