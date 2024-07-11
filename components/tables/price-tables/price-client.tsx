'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { PriceTable } from './price-table';
import {
  materialColumns,
  mainDiamondColumns,
  sideStoneColumns
} from './columns';

interface PriceClientProps<TData, TValue> {
  data: TData[];
  pageNo: number;
  totalItems: number;
  pageCount: number;
}

export const PriceClient: React.FC<PriceClientProps<any, any>> = ({
  data,
  pageNo,
  totalItems,
  pageCount
}) => {
  const params = useParams();
  const { typeId } = params;

  let columns;
  switch (typeId) {
    case 'main_diamond':
      columns = mainDiamondColumns;
      break;
    case 'side_stone':
      columns = sideStoneColumns;
      break;
    default:
      columns = materialColumns;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Prices" description="Manage prices for your store." />
      </div>
      <Separator />
      <PriceTable
        columns={columns}
        data={data}
        pageNo={pageNo}
        searchKey="name"
        totalItems={totalItems}
        pageCount={pageCount}
      />
    </>
  );
};
