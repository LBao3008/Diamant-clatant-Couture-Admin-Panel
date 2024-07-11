import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/material-tables/columns';
import { MaterialTable } from '@/components/tables/material-tables/material-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Material } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [{ title: 'Material', link: '/dashboard/material' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const searchQuery = searchParams.search || null;
  const offset = (page - 1) * pageLimit;
  const timestamp = new Date().getTime();
  const res = await fetch(
    `http://localhost:7000/api/material/all?_=${timestamp}offset=${offset}&limit=${pageLimit}` +
      (searchQuery ? `&search=${searchQuery}` : ''),
    {
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  );
  const materialRes = await res.json();
  const totalMaterials = materialRes.data.length; // Total materials from the API response
  const pageCount = Math.ceil(totalMaterials / pageLimit);
  const materials: Material[] = materialRes.data;

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Material (${totalMaterials})`}
            description="Manage materials (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/material/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <MaterialTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalUsers={totalMaterials}
          data={materials}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
