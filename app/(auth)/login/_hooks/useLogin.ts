import { useMutation } from '@tanstack/react-query';
import { requestLoginApi } from '../_api/login.api';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../_schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { DEFAULT_PROTECTED_PATH } from '@/constants/path';

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isNavigating, startTransition] = useTransition();

  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const getRedirectPath = () => {
    const redirect = searchParams.get('redirect');
    // 외부 URL 방지: 상대 경로만 허용
    if (redirect?.startsWith('/') && !redirect.startsWith('//')) {
      return redirect;
    }
    return DEFAULT_PROTECTED_PATH;
  };

  const loginMutation = useMutation({
    mutationFn: requestLoginApi,
    onSuccess: () => {
      toast.success('로그인 성공');
      startTransition(() => {
        router.replace(getRedirectPath());
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
