import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: React.ReactNode;
  errorMessage?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, suffix, errorMessage, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {/* 라벨 */}
        <label className="text-[20px] font-medium text-[#646F7C]">
          {label}
        </label>

        {/* 입력 컨테이너 */}
        <div
          className={cn(
            'flex items-center gap-2 rounded-[12px] border border-[#374553] bg-white p-6 transition-all',
            'focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-500',
            props.disabled && 'cursor-not-allowed bg-[#F1F2F4]',
            errorMessage ? 'border-red-500' : 'border-[#374553]'
          )}
        >
          <input
            {...props}
            ref={ref}
            className={cn(
              'min-w-0 flex-1 bg-transparent text-end text-[20px] font-semibold text-[#646F7C] outline-none placeholder:text-gray-400',

              className
            )}
          />

          {suffix && (
            <span className="shrink-0 text-[20px] font-bold whitespace-nowrap text-[#3479EB]">
              {suffix}
            </span>
          )}
        </div>

        {/* 에러 메시지 */}
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
