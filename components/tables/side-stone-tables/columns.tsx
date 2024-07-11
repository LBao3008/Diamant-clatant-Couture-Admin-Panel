'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { SideStone } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<SideStone>[] = [
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
    accessorKey: 'currentUpdateDate',
    header: 'Current Update Date'
  },
  {
    accessorKey: 'priceHistory',
    header: 'Price History',
    cell: ({ row }) => (
      <ul>
        {row.original.priceHistory.map((history, index) => (
          <li key={index}>
            Buy: {history.buyPrice}, Sell: {history.sellPrice}, Date:{' '}
            {new Date(history.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
