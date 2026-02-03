import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  exchangeFormSchema,
  ExchangeFormValues,
} from '../_schema/exchange.schema';
import { useQuote } from './useQuote';
import { useOrder } from './useOrder';
import { useExchangeRateLatest } from './useExchangeRateLatest';
import { useWallet } from './useWallet';
import { getCurrencyPair } from '../_utils/currency';
import { CURRENCY_SYMBOL } from '../_constants/currency';

export const useExchangeForm = () => {
  const form = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeFormSchema),
    defaultValues: {
      exchangeType: 'buy',
      selectedCurrency: 'USD',
      forexAmount: 0,
    },
  });

  const exchangeType = useWatch({
    control: form.control,
    name: 'exchangeType',
  });
  const selectedCurrency = useWatch({
    control: form.control,
    name: 'selectedCurrency',
  });
  const forexAmount = useWatch({ control: form.control, name: 'forexAmount' });

  const { data: exchangeRatesData } = useExchangeRateLatest();
  const availableCurrencies = exchangeRatesData?.data ?? [];

  const selectedRate = availableCurrencies.find(
    (rate) => rate.currency === selectedCurrency
  );

  const { data: walletData } = useWallet();
  const wallets = useMemo(() => walletData?.data?.wallets ?? [], [walletData]);

  const quote = useQuote(exchangeType, selectedCurrency, forexAmount);

  // 잔액 부족 검증
  const checkBalanceError = useMemo(() => {
    const quoteData = quote.data?.data;
    if (!quoteData || forexAmount <= 0) return null;

    const getBalance = (
      currency: ExchangeFormValues['selectedCurrency'] | 'KRW'
    ) => wallets.find((w) => w.currency === currency)?.balance ?? 0;

    if (exchangeType === 'buy') {
      const krwBalance = getBalance('KRW');
      if (quoteData.krwAmount > krwBalance) {
        return `KRW 잔액이 부족합니다. (보유: ${CURRENCY_SYMBOL.KRW}${krwBalance.toLocaleString()})`;
      }
    } else {
      const forexBalance = getBalance(selectedCurrency);
      if (forexAmount > forexBalance) {
        return `${selectedCurrency} 잔액이 부족합니다. (보유: ${CURRENCY_SYMBOL[selectedCurrency]}${forexBalance.toLocaleString()})`;
      }
    }

    return null;
  }, [quote.data?.data, forexAmount, exchangeType, selectedCurrency, wallets]);
  const orderMutation = useOrder({
    onSuccess: () => form.reset(),
  });

  const handleSubmit = form.handleSubmit((values) => {
    if (!selectedRate?.exchangeRateId) return;

    const { fromCurrency, toCurrency } = getCurrencyPair(
      values.exchangeType,
      values.selectedCurrency
    );

    orderMutation.mutate({
      exchangeRateId: selectedRate.exchangeRateId,
      fromCurrency,
      toCurrency,
      forexAmount,
    });
  });

  const isSubmitDisabled =
    !selectedRate?.exchangeRateId ||
    quote.isLoading ||
    quote.isUpdating ||
    orderMutation.isPending ||
    forexAmount <= 0 ||
    !!checkBalanceError;

  return {
    form,
    exchangeType,
    selectedCurrency,
    forexAmount,
    availableCurrencies,
    selectedRate,
    quote,
    isSubmitting: orderMutation.isPending,
    isSubmitDisabled,
    checkBalanceError,
    handleSubmit,
  };
};
