//app\(dashboard)\dashboard\order\[orderId]\page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { OrderForm } from '@/components/forms/order-update-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Order } from '@/constants/data';
import { notFound } from 'next/navigation'; // To handle 404 case
import React from 'react';

// Fetch the order data based on orderId
async function getOrderData(orderId: string): Promise<Order | null> {
  try {
    const res = await fetch(`http://localhost:7000/api/order/${orderId}`);
    if (!res.ok) {
      return null;
    }
    const orderData = await res.json();
    //console.log('Order data here:', orderData);
    //console.log('Orderdata.data here:', orderData.data);
    return orderData as Order;
  } catch (error) {
    //console.error('Error fetching order data:', error);
    return null;
  }
}

interface PageProps {
  params: {
    orderId: string;
  };
}

// Define the possible order statuses
const orderStatuses = [
  { value: 'new', label: 'New' },
  { value: 'processing', label: 'Processing' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'pending delivery', label: 'Pending Delivery' },
  { value: 'shipping', label: 'Shipping' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'returned', label: 'Returned' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'completed', label: 'Completed' }
];
export default async function Page({ params }: PageProps) {
  const { orderId } = params;

  const orderData = await getOrderData(orderId);

  if (!orderData) {
    console.log('Order not found:', orderData);
    notFound();
  }

  const breadcrumbItems = [
    { title: 'Order', link: '/dashboard/order' },
    { title: 'Update', link: `/dashboard/order/${orderId}` }
  ];

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <OrderForm
          initialData={orderData}
          key={orderData._id}
          statuses={orderStatuses}
        />
      </div>
    </ScrollArea>
  );
}
