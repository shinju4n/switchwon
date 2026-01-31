import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
};

export const Loading = ({ className, size = 'md' }: LoadingProps) => {
  return (
    <Loader2
      className={cn(
        'text-muted-foreground animate-spin',
        sizeClasses[size],
        className
      )}
    />
  );
};
