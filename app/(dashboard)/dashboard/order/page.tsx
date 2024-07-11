import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/order-tables/columns';
import { OrderTable } from '@/components/tables/order-tables/order-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [{ title: 'Order', link: '/dashboard/order' }];

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function Page({ searchParams }: ParamsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const timestamp = new Date().getTime();
  const res = await fetch(
    `http://localhost:7000/api/order/all?_=${timestamp}`,
    {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  );
  const orderRes = await res.json();
  console.log(orderRes);

  const totalOrders = orderRes.data.length; // Total orders from the API response
  const pageCount = Math.ceil(totalOrders / pageLimit);
  const orders: Order[] = orderRes.data;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Order (${totalOrders})`}
          description="Manage orders (Server side table functionalities.)"
        />

        <Link
          href={'/dashboard/order/new'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator />

      <OrderTable
        searchKey="country"
        pageNo={page}
        columns={columns}
        totalUsers={totalOrders}
        data={orders}
        pageCount={pageCount}
      />
    </div>
  );
}
