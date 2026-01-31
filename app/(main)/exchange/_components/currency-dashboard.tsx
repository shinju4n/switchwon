import { TriangleDownIcon, TriangleUpIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

const MOCK_DATA = [
  {
    exchangeRateId: 52680,
    currency: 'JPY',
    rate: 939.16,
    changePercentage: 1.81,
    applyDateTime: '2026-01-30T21:58:00',
  },
  {
    exchangeRateId: 52679,
    currency: 'USD',
    rate: 1489.02,
    changePercentage: -0.53,
    applyDateTime: '2026-01-30T21:58:00',
  },
];

const CURRENCY_LIST = [
  {
    key: 'USD',
    value: '미국 달러',
  },
  {
    key: 'JPY',
    value: '일본 엔화',
  },
];

export const CurrencyDashboard = () => {
  return (
    <div className="flex gap-5">
      {CURRENCY_LIST.map((currency) => {
        const currencyData = MOCK_DATA.find(
          (data) => data.currency === currency.key
        );
        if (!currencyData) return null;
        return (
          <div
            key={currency.value}
            className="flex flex-1 flex-col gap-2 rounded-[12px] border border-gray-300 px-8 py-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center justify-between gap-2">
                <span>{currency.key}</span>
                <span className="text-sm text-[#646F7C]">{currency.value}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold">
                {currencyData.rate.toLocaleString()} KRW
              </span>
              {/* 양수면 destructive, 음수면 파란색 */}
              <span
                className={cn(
                  'flex items-center gap-1 text-sm',
                  currencyData.changePercentage > 0
                    ? 'text-destructive'
                    : 'text-[#3B6EFF]'
                )}
              >
                {currencyData.changePercentage > 0 ? (
                  <TriangleUpIcon />
                ) : (
                  <TriangleDownIcon />
                )}
                {currencyData.changePercentage > 0 && '+'}
                {currencyData.changePercentage.toLocaleString()}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
