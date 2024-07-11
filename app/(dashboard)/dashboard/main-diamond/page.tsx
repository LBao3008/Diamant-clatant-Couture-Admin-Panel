// app\(dashboard)\dashboard\diamond\page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/main-diamond-tables/columns';
import { DiamondTable } from '@/components/tables/main-diamond-tables/main-diamond-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { MainDiamond } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Main Diamond', link: '/dashboard/main-diamond' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `http://localhost:7000/api/main-diamond/all?offset=${offset}&limit=${pageLimit}` +
      (search ? `&search=${search}` : '')
  );
  const diamondRes = await res.json();
  const totalDiamonds = diamondRes.data.length;
  const pageCount = Math.ceil(totalDiamonds / pageLimit);
  const diamonds: MainDiamond[] = diamondRes.data;

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Diamond (${totalDiamonds})`}
            description="Manage diamonds (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/main-diamond/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <DiamondTable
          searchKey="origin"
          pageNo={page}
          columns={columns}
          totalItems={totalDiamonds}
          data={diamonds}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
