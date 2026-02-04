import { LoginForm } from './_components/login-form';
import { LoginHero } from './_components/login-hero';

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
  }>;
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { redirect } = await searchParams;
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12">
      <LoginHero />
      <LoginForm redirect={redirect} />
    </div>
  );
};

export default LoginPage;
