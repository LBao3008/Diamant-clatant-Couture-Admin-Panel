'use client';

import BreadCrumb from '@/components/breadcrumb';
import { MaterialEditForm } from '@/components/forms/material-edit-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Material } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Material', link: '/dashboard/material' },
  { title: 'Edit Material', link: '/dashboard/material/edit' }
];

const EditMaterialPage = () => {
  const [material, setMaterial] = useState<Material | null>(null);
  const searchParams = useSearchParams();
  const materialId = searchParams.get('materialId');

  useEffect(() => {
    if (materialId) {
      fetch(`http://localhost:7000/api/material/${materialId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setMaterial(data.data);
          } else {
            console.error('Failed to fetch material:', data);
          }
        })
        .catch((error) => console.error('Error fetching material:', error));
    }
  }, [materialId]);

  if (!materialId) {
    return <div>No material selected for editing.</div>;
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ScrollArea>
          {material ? (
            <MaterialEditForm material={material} />
          ) : (
            <div>Loading...</div>
          )}
        </ScrollArea>
      </div>
    </>
  );
};

export default EditMaterialPage;
