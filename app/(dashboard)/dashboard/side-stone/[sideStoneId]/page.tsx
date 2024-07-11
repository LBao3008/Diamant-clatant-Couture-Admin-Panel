import BreadCrumb from '@/components/breadcrumb';
import { SideStoneForm } from '@/components/forms/side-stone-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'Side stone', link: '/dashboard/side-stone' },
    { title: 'Create', link: '/dashboard/side-stone/create' }
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SideStoneForm initialData={null} key={null} />
      </div>
    </ScrollArea>
  );
}
