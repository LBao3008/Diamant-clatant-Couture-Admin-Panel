import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/product-tables/columns';
import { ProductTable } from '@/components/tables/product-tables/product-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [{ title: 'Product', link: '/dashboard/product' }];

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
    `http://localhost:7000/api/product/all?offset=${offset}&limit=${pageLimit}` +
      (search ? `&search=${search}` : '')
  );
  const productRes = await res.json();
  const totalProducts = productRes.data.length; // Total products from the API response
  const pageCount = Math.ceil(totalProducts / pageLimit);
  const products: Product[] = productRes.data;
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Product (${totalProducts})`}
            description="Manage products (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/product/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <ProductTable
          searchKey="title"
          pageNo={page}
          columns={columns}
          totalProducts={totalProducts}
          data={products}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
