import z from 'zod';

export const loginSchema = z.object({
  email: z.email('이메일 형식이 올바르지 않습니다.'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
