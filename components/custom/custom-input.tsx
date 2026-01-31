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
      <label className="text-[15px] font-medium text-[#646F7C]">{label}</label>
      <Input
        {...inputOptions}
        className={cn('p-6 text-[20px] font-semibold', inputOptions.className)}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
