import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const HeaderLink = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'px-3 py-2 text-lg font-bold text-gray-500 hover:text-gray-700',
        isActive && 'text-primary'
      )}
    >
      {label}
    </Link>
  );
};
