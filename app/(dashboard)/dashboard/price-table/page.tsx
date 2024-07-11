import BreadCrumb from '@/components/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import PricePageContent from './PricePageContent';

const breadcrumbItems = [{ title: 'Price', link: '/dashboard/price' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const fetchData = async (
  model: string,
  offset: number,
  pageLimit: number,
  searchId: string | null
) => {
  try {
    const res = await fetch(
      `http://localhost:7000/api/${model}/all?offset=${offset}&limit=${pageLimit}` +
        (searchId ? `&search=${searchId}` : '')
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json(); // Chuyển đổi nội dung của response thành đối tượng JavaScript

    //console.log(data); // Log nội dung của response

    return data; // Trả về dữ liệu đã được chuyển đổi
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const searchId = Array.isArray(searchParams.search)
    ? searchParams.search[0]
    : searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const materialData = await fetchData('material', offset, pageLimit, searchId);
  const mainDiamondData = await fetchData(
    'main-diamond',
    offset,
    pageLimit,
    searchId
  );
  const sideStoneData = await fetchData(
    'side-stone',
    offset,
    pageLimit,
    searchId
  );

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Price (${materialData.length})`}
          description="Manage prices (Server side table functionalities.)"
        />

        <Link
          href={'/dashboard/price/new'}
          className={buttonVariants({ variant: 'default' })}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <Separator />

      <PricePageContent
        materialData={materialData}
        mainDiamondData={mainDiamondData}
        sideStoneData={sideStoneData}
        totalItems={materialData.length} // Update with correct value
        pageCount={Math.ceil(materialData.length / pageLimit)} // Update with correct value
      />
    </div>
  );
}
