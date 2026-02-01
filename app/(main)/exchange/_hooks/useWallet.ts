import { useSuspenseQuery } from '@tanstack/react-query';
import { getWalletsApi } from '../_api/wallet.api';
import { queryKeys } from '@/constants/query-keys';

export const useWallet = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.wallet.list(),
    queryFn: getWalletsApi,
  });
};
