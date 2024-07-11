import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/side-stone-tables/columns';
import { SideStoneTable } from '@/components/tables/side-stone-tables/side-stone-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SideStone } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Side Stone', link: '/dashboard/side-stone' }
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
    `http://localhost:7000/api/side-stone/all?offset=${offset}&limit=${pageLimit}${
      search ? `&search=${search}` : ''
    }`
  );
  const sideStoneRes = await res.json();
  const totalSideStones = sideStoneRes.data.length;
  const pageCount = Math.ceil(totalSideStones / pageLimit);
  const sideStones: SideStone[] = sideStoneRes.data;

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Side Stones (${totalSideStones})`}
            description="Manage side stones (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/side-stone/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <SideStoneTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalItems={totalSideStones}
          data={sideStones}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
