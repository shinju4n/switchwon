export const WalletCard = () => {
  return (
    <div className="flex flex-1 flex-col justify-between rounded-[12px] border border-gray-300 bg-[#F7F8F9] px-8 py-6">
      <div className="flex flex-col gap-8">
        <p className="text-2xl font-bold">내 지갑</p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-[#646F7C]">KRW</p>
            <p className="text-xl font-semibold text-[#646F7C]">₩ 100.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-[#646F7C]">USD</p>
            <p className="text-xl font-semibold text-[#646F7C]">$ 100.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-[#646F7C]">JPY</p>
            <p className="text-xl font-semibold text-[#646F7C]">¥ 100.00</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-300 pt-6">
        <p className="text-xl text-[#646F7C]">총 보유 자산</p>
        <p className="text-xl font-bold text-[#3479EB]">₩ 300.00</p>
      </div>
    </div>
  );
};
