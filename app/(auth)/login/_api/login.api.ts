import { api } from '@/lib/api';
import { ApiResponse } from '@/types/common.type';
import { LoginResponse } from '../_types/login.type';

export const requestLoginApi = async (email: string) => {
  return api<ApiResponse<LoginResponse>>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};
