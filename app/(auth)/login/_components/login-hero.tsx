import { LogoIcon } from '@/components/icons';

export const LoginHero = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="mb-6 flex items-center justify-center">
        <LogoIcon width={80} height={80} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-5xl font-bold">반갑습니다.</p>
        <p className="text-3xl text-[#646F7C]">로그인 정보를 입력해주세요.</p>
      </div>
    </section>
  );
};
