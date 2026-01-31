import { Header } from '@/components/layout';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Header />
      <main className="relative h-full w-full flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
