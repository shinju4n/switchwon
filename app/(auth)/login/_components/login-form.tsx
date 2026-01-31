'use client';

import { CustomInput } from '@/components/custom/custom-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLogin } from '../_hooks/use-login';

export const LoginForm = () => {
  const { loginForm, requestLogin, isPending } = useLogin();
  return (
    <form onSubmit={requestLogin} className="w-full max-w-md">
      <Card className="flex flex-col gap-6 bg-gray-50 px-8 py-6">
        <CustomInput
          inputOptions={{
            placeholder: 'test@test.com',
            ...loginForm.register('email'),
          }}
          label="이메일 주소를 입력해주세요."
          errorMessage={loginForm.formState.errors.email?.message}
        />
        <Button className="py-6" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인 하기'}
        </Button>
      </Card>
    </form>
  );
};
