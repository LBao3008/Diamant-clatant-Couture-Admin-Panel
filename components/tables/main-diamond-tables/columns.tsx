// components\tables\diamond-tables\columns.tsx
'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { MainDiamond } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<MainDiamond>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'origin',
    header: 'Origin'
  },
  {
    accessorKey: 'caratWeight',
    header: 'Carat Weight'
  },
  {
    accessorKey: 'cut',
    header: 'Cut'
  },
  {
    accessorKey: 'color',
    header: 'Color'
  },
  {
    accessorKey: 'clarity',
    header: 'Clarity'
  },
  {
    accessorKey: 'currentBuyPrice',
    header: 'Current Buy Price'
  },
  {
    accessorKey: 'currentSellPrice',
    header: 'Current Sell Price'
  },
  {
    accessorKey: 'currentEffectDate',
    header: 'Current Effect Date'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
