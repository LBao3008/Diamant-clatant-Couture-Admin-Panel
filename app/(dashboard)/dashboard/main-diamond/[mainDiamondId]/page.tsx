import BreadCrumb from '@/components/breadcrumb';
import { MainDiamondForm } from '@/components/forms/main-diamond-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'Main Diamond', link: '/dashboard/main-diamond' },
    { title: 'Create', link: '/dashboard/main-diamond/create' }
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <MainDiamondForm initialData={null} key={null} />
      </div>
    </ScrollArea>
  );
}
