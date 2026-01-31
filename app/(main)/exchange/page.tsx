import { PageHeader } from '@/components/layout/page-header';
import { CurrencySelector } from './_components/currency-selector';
import { WalletCard } from './_components/wallet-card';
import { ExchangeForm } from './_components/exchange-form';

const ExchangePage = () => {
  return (
    <div className="flex h-full flex-col gap-6">
      <PageHeader
        title="환율 정보"
        description="실시간 환율을 확인하고 간편하게 환전하세요."
      />
      <div className="grid grid-cols-2 gap-6 p-20 pt-0">
        <div className="flex flex-col gap-6">
          <CurrencySelector />
          <WalletCard />
        </div>
        <ExchangeForm />
      </div>
    </div>
  );
};

export default ExchangePage;
