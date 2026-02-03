'use client';

import { ArrowUpIcon, CircleArrowDownIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CurrencyInput } from './currency-input';
import { Loading } from '@/components/ui/loading';
import { useExchangeForm } from '../_hooks/useExchangeForm';
import { ExchangeFormValues } from '../_schema/exchange.schema';
import { CURRENCY_META } from '../_constants/currency';
import { EXCHANGE_TYPE_TEXT } from '../_utils/currency';

export const ExchangeForm = () => {
  const {
    form,
    exchangeType,
    selectedCurrency,
    forexAmount,
    availableCurrencies,
    selectedRate,
    quote,
    isSubmitting,
    isSubmitDisabled,
    checkBalanceError,
    handleSubmit,
  } = useExchangeForm();

  const currencyMeta = CURRENCY_META[selectedCurrency];
  const typeText = EXCHANGE_TYPE_TEXT[exchangeType];
  const isBuying = exchangeType === 'buy';

  const handleCurrencyChange = (
    value: ExchangeFormValues['selectedCurrency']
  ) => {
    form.setValue('selectedCurrency', value);
  };

  const handleExchangeTypeChange = (
    value: ExchangeFormValues['exchangeType']
  ) => {
    form.setValue('exchangeType', value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    form.setValue('forexAmount', Number(rawValue) || 0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between gap-8 rounded-[12px] border border-gray-300 bg-[#F7F8F9] px-8 py-6"
    >
      <div className="flex flex-col gap-8">
        {/* 통화 선택 & 매수/매도 토글 */}
        <div className="flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="w-fit cursor-pointer text-2xl font-bold"
              >
                <Image
                  src={currencyMeta.iconUrl}
                  alt={selectedCurrency}
                  width={24}
                  height={24}
                />
                {selectedCurrency} 환전하기
                <ArrowUpIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                {availableCurrencies.map((rate) => {
                  const meta = CURRENCY_META[rate.currency];
                  return (
                    <DropdownMenuItem
                      key={rate.currency}
                      onClick={() => handleCurrencyChange(rate.currency)}
                    >
                      <Image
                        src={meta.iconUrl}
                        alt={rate.currency}
                        width={24}
                        height={24}
                      />
                      {meta.currencyName}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-2 rounded-[12px] border border-gray-300 bg-white p-2">
            <button
              type="button"
              onClick={() => handleExchangeTypeChange('buy')}
              className={cn(
                'flex-1 rounded-[10px] py-3 text-[22px] font-bold transition-colors',
                isBuying ? 'bg-destructive text-white' : 'text-gray-400'
              )}
            >
              {EXCHANGE_TYPE_TEXT.buy.label}
            </button>
            <button
              type="button"
              onClick={() => handleExchangeTypeChange('sell')}
              className={cn(
                'flex-1 rounded-[10px] py-3 text-[22px] font-bold transition-colors',
                !isBuying ? 'bg-[#3479EB] text-white' : 'text-gray-400'
              )}
            >
              {EXCHANGE_TYPE_TEXT.sell.label}
            </button>
          </div>
        </div>

        {/* 금액 입력 */}
        <div className="flex flex-col gap-4 pb-[76px]">
          <CurrencyInput
            label={typeText.amountLabel}
            value={forexAmount.toLocaleString()}
            onChange={handleAmountChange}
            suffix={
              <span className="text-[20px] font-medium text-[#646F7C]">
                {typeText.actionSuffix(currencyMeta.currencyName)}
              </span>
            }
          />
          <div className="flex justify-center">
            <CircleArrowDownIcon />
          </div>
          <CurrencyInput
            label={typeText.resultLabel}
            isLoading={quote.isLoading || quote.isUpdating}
            disabled
            value={quote.data?.data?.krwAmount.toLocaleString() || '0'}
            suffix={
              <span
                className={cn(
                  'text-[20px] font-bold',
                  isBuying ? 'text-destructive' : 'text-[#3479EB]'
                )}
              >
                {typeText.resultSuffix}
              </span>
            }
          />
          {checkBalanceError && (
            <p className="text-destructive text-center text-sm">
              {checkBalanceError}
            </p>
          )}
        </div>
      </div>

      {/* 환율 정보 & 제출 버튼 */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between border-t border-gray-300 pt-6">
          <span className="text-xl text-[#646F7C]">적용 환율</span>
          <span className="text-xl font-bold text-[#646F7C]">
            {quote.isLoading || quote.isUpdating || !selectedRate?.rate ? (
              <Loading />
            ) : (
              `1 ${selectedCurrency} = ${selectedRate.rate.toLocaleString()} 원`
            )}
          </span>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full py-6 text-[22px] font-bold"
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? <Loading /> : '환전 하기'}
        </Button>
      </div>
    </form>
  );
};
