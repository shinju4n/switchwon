import { api } from '@/lib/api';
import { ApiResponse } from '@/types/common.type';
import { WalletResponse } from '../_types/wallet.type';

export const getWalletsApi = async () => {
  return api<ApiResponse<WalletResponse>>('/api/proxy/wallets');
};
