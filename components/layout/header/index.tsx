'use client';
import { Button } from '@/components/ui/button';
import { HeaderLink } from './header-link';
import { LogoIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    queryClient.clear();
    router.replace('/login');
  };
  return (
    <header className="flex w-full items-center justify-between border-b px-10 py-4">
      <div className="flex items-center gap-2">
        <LogoIcon />
        <p className="text-2xl font-bold">Exchange app</p>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <HeaderLink href="/exchange" label="환전 하기" />
          <HeaderLink href="/exchange-history" label="환전 내역" />
        </div>
        <Button
          onClick={handleLogout}
          className="bg-[#3479EB] text-lg font-bold text-white"
        >
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Header;
