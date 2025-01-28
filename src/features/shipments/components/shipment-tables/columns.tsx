'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'customer_name',
    header: 'CUSTOMER NAME'
  },
  {
    accessorKey: 'product_name',
    header: 'PRODUCT NAME'
  },
  {
    accessorKey: 'quantity',
    header: 'QUANTITY'
  },
  {
    accessorKey: 'createdAt',
    header: 'TIME'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
