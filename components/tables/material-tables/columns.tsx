'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Material } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Material>[] = [
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
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'density.value',
    header: 'Density'
  },
  {
    accessorKey: 'priceUnit',
    header: 'Price Unit'
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
