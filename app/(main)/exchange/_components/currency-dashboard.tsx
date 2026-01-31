'use client';
import { TriangleDownIcon, TriangleUpIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useExchangeRateLatest } from '../_hooks/useExchangeRateLatest';
import { CURRENCY_META } from '../_constants/currency';
import { Currency } from '@/types/exchange.type';

export const CurrencyDashboard = () => {
  const { data } = useExchangeRateLatest();

  const exchangeRates = data?.data ?? [];

  const availableCurrencies = exchangeRates.filter(
    (rate): rate is typeof rate & { currency: Exclude<Currency, 'KRW'> } =>
      rate.currency !== 'KRW'
  );

  return (
    <div className="flex gap-5">
      {availableCurrencies.map((rate) => {
        const meta = CURRENCY_META[rate.currency];
        return (
          <div
            key={rate.currency}
            className="flex flex-1 flex-col gap-2 rounded-[12px] border border-gray-300 px-8 py-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center justify-between gap-2">
                <span>{rate.currency}</span>
                <span className="text-sm text-[#646F7C]">{meta.name}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold">
                {rate.rate.toLocaleString()} KRW
              </span>
              <span
                className={cn(
                  'flex items-center gap-1 text-sm',
                  rate.changePercentage > 0
                    ? 'text-destructive'
                    : 'text-[#3B6EFF]'
                )}
              >
                {rate.changePercentage > 0 ? (
                  <TriangleUpIcon />
                ) : (
                  <TriangleDownIcon />
                )}
                {rate.changePercentage > 0 && '+'}
                {rate.changePercentage.toLocaleString()}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
