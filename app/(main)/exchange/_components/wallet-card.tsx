'use client';

import { useWallet } from '../_hooks/useWallet';
import { CURRENCY_SYMBOL } from '../_constants/currency';

export const WalletCard = () => {
  const { data } = useWallet();

  const { totalKrwBalance, wallets } = data.data;

  return (
    <div className="flex flex-1 flex-col justify-between rounded-[12px] border border-gray-300 bg-[#F7F8F9] px-8 py-6">
      <div className="flex flex-col gap-8">
        <p className="text-2xl font-bold">내 지갑</p>
        <div className="flex flex-col gap-3">
          {wallets.map((wallet) => (
            <div
              key={wallet.walletId}
              className="flex items-center justify-between"
            >
              <span className="text-xl font-semibold text-[#646F7C]">
                {wallet.currency}
              </span>
              <span className="text-xl font-semibold text-[#646F7C]">
                {CURRENCY_SYMBOL[wallet.currency]}{' '}
                {wallet.balance.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-300 pt-6">
        <span className="text-xl text-[#646F7C]">총 보유 자산</span>
        <span className="text-xl font-bold text-[#3479EB]">
          ₩ {totalKrwBalance.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
