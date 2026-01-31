'use client';

import { CustomInput } from '@/components/custom/custom-input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type ExchangeType = 'buy' | 'sell';

export const ExchangeForm = () => {
  const [exchangeType, setExchangeType] = useState<ExchangeType>('buy');

  return (
    <div className="flex flex-col justify-between gap-8 rounded-[12px] border border-gray-300 bg-[#F7F8F9] px-8 py-6">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-2xl font-bold">환전 하기</p>
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
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#D0D6DB" />
              <path
                d="M12.125 15.5L20 23.375L27.875 15.5"
                stroke="white"
                strokeWidth="2.25"
              />
            </svg>
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
