'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

// Common columns
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: '_id',
    header: 'ID'
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
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

// Material specific columns
export const materialColumns: ColumnDef<any>[] = [
  ...columns,
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'density.value',
    header: 'Density Value'
  },
  {
    accessorKey: 'density.unit',
    header: 'Density Unit'
  }
];

// Main Diamond specific columns
export const mainDiamondColumns: ColumnDef<any>[] = [
  ...columns,
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
  }
];

// Side Stone specific columns
export const sideStoneColumns: ColumnDef<any>[] = [
  ...columns,
  {
    accessorKey: 'name',
    header: 'Name'
  }
];
