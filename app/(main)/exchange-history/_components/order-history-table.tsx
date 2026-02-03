'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useOrderHistory } from '../_hooks/useOrderHistory';
import { format } from 'date-fns';
import { CURRENCY_SYMBOL } from '@/app/(main)/exchange/_constants/currency';

export const OrderHistoryTable = () => {
  const { data } = useOrderHistory();
  const orders = data?.data ?? [];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-muted-foreground p-4 font-normal">
              거래 ID
            </TableHead>
            <TableHead className="text-muted-foreground p-4 font-normal">
              거래 일시
            </TableHead>
            <TableHead className="text-muted-foreground p-4 text-right font-normal">
              매수 금액
            </TableHead>
            <TableHead className="text-muted-foreground p-4 text-right font-normal">
              체결 환율
            </TableHead>
            <TableHead className="text-muted-foreground p-4 text-right font-normal">
              매도 금액
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell className="p-4">{order.orderId}</TableCell>
              <TableCell className="p-4">
                {format(order.orderedAt, 'yyyy-MM-dd HH:mm:ss')}
              </TableCell>
              <TableCell className="p-4 text-right">
                {CURRENCY_SYMBOL[order.fromCurrency]}{' '}
                {order.fromAmount.toLocaleString()}
              </TableCell>
              <TableCell className="p-4 text-right">
                {order.appliedRate.toLocaleString()}
              </TableCell>
              <TableCell className="p-4 text-right">
                {CURRENCY_SYMBOL[order.toCurrency]}{' '}
                {order.toAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
