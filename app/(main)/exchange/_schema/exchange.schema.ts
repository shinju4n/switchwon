import { z } from 'zod';

export const exchangeFormSchema = z.object({
  exchangeType: z.enum(['buy', 'sell']),
  selectedCurrency: z.enum(['USD', 'JPY']),
  forexAmount: z
    .number()
    .min(1, '최소 1 이상 입력해주세요')
    .max(100000000, '최대 1억까지 입력 가능합니다'),
});

export type ExchangeFormValues = z.infer<typeof exchangeFormSchema>;
