'use client';

import { CustomInput } from '@/components/custom/custom-input';
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

type ExchangeType = 'buy' | 'sell';
const CURRENCY_LIST = [
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
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

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
          <CustomInput
            label="매도 금액"
            inputOptions={{
              type: 'text',
              placeholder: '환전 하기',
              className: 'bg-white',
            }}
          />
          <div className="flex justify-center">
            <CircleArrowDownIcon />
          </div>
          <CustomInput
            label="필요 원화"
            inputOptions={{
              type: 'text',
              placeholder: '환전 하기',
              className: 'bg-white',
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between border-t border-gray-300 pt-6">
          <p className="text-xl text-[#646F7C]">적용 환율</p>
          <p className="text-xl font-bold text-[#646F7C]">
            1 USD = 1,320.50 원
          </p>
        </div>
        <Button size="lg" className="w-full py-6 text-[22px] font-bold">
          환전 하기
        </Button>
      </div>
    </div>
  );
};
