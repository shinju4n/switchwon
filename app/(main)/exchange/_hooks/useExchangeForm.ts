import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  exchangeFormSchema,
  ExchangeFormValues,
} from '../_schema/exchange.schema';
import { useQuote } from './useQuote';
import { useOrder } from './useOrder';
import { useExchangeRateLatest } from './useExchangeRateLatest';
import { getCurrencyPair, ForexCurrency } from '../_utils/currency';

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
  const exchangeRates = exchangeRatesData?.data ?? [];

  // KRW 제외한 환전 가능한 통화 목록
  const availableCurrencies = exchangeRates.filter(
    (rate): rate is typeof rate & { currency: ForexCurrency } =>
      rate.currency !== 'KRW'
  );

  const selectedRate = availableCurrencies.find(
    (rate) => rate.currency === selectedCurrency
  );

  const quote = useQuote(exchangeType, selectedCurrency, forexAmount);
  const orderMutation = useOrder({
    onSuccess: () => form.reset(),
  });

  const handleSubmit = form.handleSubmit(() => {
    if (!selectedRate?.exchangeRateId) return;

    const { fromCurrency, toCurrency } = getCurrencyPair(
      exchangeType,
      selectedCurrency
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
    forexAmount <= 0;

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
    handleSubmit,
  };
};
