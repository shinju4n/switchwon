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
import { useState } from 'react';
import Image from 'next/image';
import { CurrencyInput } from './currency-input';
import { useQuote } from '../_hooks/useQuote';
import { Currency } from '@/types/exchange.type';

type ExchangeType = 'buy' | 'sell';
const CURRENCY_LIST: { name: string; value: 'USD' | 'JPY'; iconUrl: string }[] =
  [
    {
      name: '미국 USD',
      value: 'USD',
      iconUrl: '/icons/united-states.png',
    },
    {
      name: '일본 JPY',
      value: 'JPY',
      iconUrl: '/icons/japan.png',
    },
  ];

export const ExchangeForm = () => {
  const [exchangeType, setExchangeType] = useState<ExchangeType>('buy');
  const [selectedCurrency, setSelectedCurrency] =
    useState<Exclude<Currency, 'KRW'>>('USD');
  const [forexAmount, setForexAmount] = useState<string>('0');
  const { data } = useQuote(
    exchangeType,
    selectedCurrency,
    Number(forexAmount?.replace(/,/g, ''))
  );

  return (
    <div className="flex flex-col justify-between gap-8 rounded-[12px] border border-gray-300 bg-[#F7F8F9] px-8 py-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-fit cursor-pointer text-2xl font-bold"
              >
                <Image
                  src={
                    CURRENCY_LIST.find(
                      (currency) => currency.value === selectedCurrency
                    )?.iconUrl || ''
                  }
                  alt={selectedCurrency}
                  width={24}
                  height={24}
                />
                {selectedCurrency} 환전하기
                <ArrowUpIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {CURRENCY_LIST.map((currency) => (
                  <DropdownMenuItem
                    key={currency.value}
                    onClick={() => setSelectedCurrency(currency.value)}
                  >
                    <Image
                      src={currency.iconUrl}
                      alt={currency.value}
                      width={24}
                      height={24}
                    />
                    {currency.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex gap-2 rounded-[12px] border border-gray-300 bg-white p-2">
            <button
              onClick={() => setExchangeType('buy')}
              className={cn(
                'flex-1 rounded-[10px] py-3 text-[22px] font-bold transition-colors',
                exchangeType === 'buy'
                  ? 'bg-destructive text-white'
                  : 'text-gray-400'
              )}
            >
              살래요
            </button>
            <button
              onClick={() => setExchangeType('sell')}
              className={cn(
                'flex-1 rounded-[10px] py-3 text-[22px] font-bold transition-colors',
                exchangeType === 'sell'
                  ? 'bg-[#3479EB] text-white'
                  : 'text-gray-400'
              )}
            >
              팔래요
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-[76px]">
          <CurrencyInput
            label="매도 금액"
            value={(
              Number(forexAmount?.replace(/,/g, '')) || 0
            ).toLocaleString()}
            onChange={(e) => setForexAmount(e.target.value)}
            suffix={
              <span className="text-[20px] font-medium text-[#646F7C]">
                달러 팔기
              </span>
            }
          />
          <div className="flex justify-center">
            <CircleArrowDownIcon />
          </div>
          <CurrencyInput
            label="필요 원화"
            disabled
            value={data?.data?.krwAmount.toLocaleString() || '0'}
            suffix={
              <span className="text-[20px] font-bold text-[#3479EB]">
                원 받을 수 있어요
              </span>
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between border-t border-gray-300 pt-6">
          <p className="text-xl text-[#646F7C]">적용 환율</p>
          <p className="text-xl font-bold text-[#646F7C]">
            1 USD = {(data?.data?.appliedRate || 0).toLocaleString()} 원
          </p>
        </div>
        <Button size="lg" className="w-full py-6 text-[22px] font-bold">
          환전 하기
        </Button>
      </div>
    </div>
  );
};
