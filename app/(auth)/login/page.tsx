import { LoginForm } from './_components/login-form';
import { LoginHero } from './_components/login-hero';

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12">
      <LoginHero />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
