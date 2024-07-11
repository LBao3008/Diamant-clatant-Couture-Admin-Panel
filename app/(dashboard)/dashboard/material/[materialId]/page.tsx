'use client';

import BreadCrumb from '@/components/breadcrumb';
import { MaterialForm } from '@/components/forms/material-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const params = useParams();
  const [materialData, setMaterialData] = useState(null);

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        //console.log('Fetching material data for ID:', params.materialId);
        const response = await axios.get(
          `http://localhost:7000/api/material/${params.materialId}`
        );
        //console.log('Material data fetched:', response.data);
        setMaterialData(response.data);
      } catch (error) {
        console.error('Error fetching material data:', error);
        notFound();
      }
    };

    fetchMaterialData();
  }, [params.materialId]);

  const breadcrumbItems = [
    { title: 'Material', link: '/dashboard/material' },
    {
      title: materialData ? materialData.name : 'Loading...',
      link: `/dashboard/material/${params.materialId}`
    }
  ];

  // console.log('Current material data:', materialData);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <MaterialForm
          initialData={materialData}
          key={materialData ? materialData._id : 'new'}
        />
      </div>
    </ScrollArea>
  );
}
