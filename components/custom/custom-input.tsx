import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

interface CustomInputProps {
  inputOptions: React.ComponentProps<typeof Input>;
  label: string;
  errorMessage?: string;
}

export const CustomInput = ({
  inputOptions,
  label,
  errorMessage,
}: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[20px] font-medium text-[#646F7C]">{label}</label>
      <Input
        {...inputOptions}
        className={cn(
          'h-auto rounded-[12px] border-[#374553] p-6 text-[20px] font-semibold text-[#646F7C] placeholder:text-[20px] md:text-[20px]',
          inputOptions.className
        )}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
