'use client';
import { Button } from '@/components/ui/button';
import { HeaderLink } from './header-link';

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between border-b px-10 py-4">
      <div className="flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.08875 16.0678C4.52998 16.0698 3.98434 16.2373 3.52066 16.5492C3.05699 16.861 2.69606 17.3032 2.48343 17.8199C2.27079 18.3366 2.21598 18.9048 2.3259 19.4526C2.43581 20.0005 2.70554 20.5035 3.10105 20.8982C3.49655 21.2929 4.00011 21.5617 4.54818 21.6705C5.09625 21.7793 5.66428 21.7234 6.18059 21.5097C6.6969 21.2961 7.13835 20.9343 7.44926 20.47C7.76016 20.0057 7.92657 19.4597 7.9275 18.9009C7.92515 18.1493 7.62513 17.4292 7.09311 16.8982C6.56109 16.3673 5.8404 16.0687 5.08875 16.0678Z"
            fill="#3479EB"
          />
          <path
            d="M2.25 8.75018V12.8072C4.6875 12.8072 7.02844 13.5286 8.75016 15.2499C10.4719 16.9711 11.1877 19.3074 11.1877 21.75H15.2498C15.2498 14.6457 9.35953 8.75018 2.25 8.75018Z"
            fill="#3479EB"
          />
          <path
            d="M2.25 2.25V6.3075C10.9336 6.3075 17.6822 13.0612 17.6822 21.75H21.75C21.75 10.9997 13.0158 2.25 2.25 2.25Z"
            fill="#3479EB"
          />
        </svg>
        <p className="text-2xl font-bold">Exchange app</p>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <HeaderLink href="/exchange" label="환전 하기" />
          <HeaderLink href="/exchange-history" label="환전 내역" />
        </div>
        <Button className="bg-[#3479EB] text-lg font-bold text-white">
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Header;
