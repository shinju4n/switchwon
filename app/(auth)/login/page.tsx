import { Suspense } from 'react';
import { LoginForm } from './_components/login-form';
import { LoginHero } from './_components/login-hero';
import { Loading } from '@/components/ui/loading';

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12">
      <LoginHero />
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
