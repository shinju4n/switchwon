import { useMutation } from '@tanstack/react-query';
import { requestLoginApi } from '../_api/login.api';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../_schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { getRedirectPath } from '@/lib/utils';

export const useLogin = (redirect?: string) => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: requestLoginApi,
    onSuccess: () => {
      toast.success('로그인 성공');
      startTransition(() => {
        const redirectPath = getRedirectPath(redirect);
        router.replace(redirectPath);
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const requestLogin = loginForm.handleSubmit(async (data) => {
    await loginMutation.mutateAsync(data.email);
  });

  return {
    loginForm,
    requestLogin,
    isPending: loginMutation.isPending || isNavigating,
  };
};
