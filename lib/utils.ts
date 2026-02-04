import { DEFAULT_PROTECTED_PATH } from '@/constants/path';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRedirectPath = (redirect?: string) => {
  if (redirect?.startsWith('/') && !redirect.startsWith('//')) {
    return redirect;
  }
  return DEFAULT_PROTECTED_PATH;
};
