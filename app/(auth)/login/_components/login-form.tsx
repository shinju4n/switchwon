import { CustomInput } from '@/components/custom/custom-input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const LoginForm = () => {
  return (
    <section className="w-full max-w-md">
      <Card className="flex flex-col gap-6 bg-gray-50 px-8 py-6">
        <CustomInput
          inputOptions={{ placeholder: 'test@test.com' }}
          label="이메일 주소를 입력해주세요."
          errorMessage="이메일 형식이 올바르지 않습니다."
        />
        <Button className="py-6">로그인 하기</Button>
      </Card>
    </section>
  );
};
