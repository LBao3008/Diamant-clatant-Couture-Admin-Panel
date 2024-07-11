'use client';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
const formSchema = z.object({
  orderNumber: z.string().min(1, { message: 'Order Number is required' }),
  customerName: z.string().min(1, { message: 'Customer Name is required' }),
  orderDate: z.string().min(1, { message: 'Order Date is required' }),
  status: z.string().min(1, { message: 'Please select a status' }),
  totalAmount: z.number().positive({ message: 'Total Amount must be positive' })
});

type OrderFormValues = z.infer<typeof formSchema>;

interface OrderFormProps {
  initialData: any | null;
  statuses: { value: string; label: string }[];
}

export const OrderForm: React.FC<OrderFormProps> = ({
  initialData,
  statuses
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Order' : 'Create Order';
  const description = initialData ? 'Edit an order.' : 'Add a new order';
  const toastMessage = initialData ? 'Order updated.' : 'Order created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? {
        ...initialData,
        orderNumber: String(initialData.orderNumber),
        customerName: String(initialData.customerName),
        orderDate: String(initialData.orderDate),
        status: String(initialData.status),
        totalAmount: Number(initialData.totalAmount)
      }
    : {
        orderNumber: '',
        customerName: '',
        orderDate: '',
        status: '',
        totalAmount: 0
      };

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // Ensure the order ID is included in the URL
        const res = await axios.patch(
          `http://localhost:7000/api/order/update-status/${initialData._id}`,
          { status: data.status }
        );
        // console.log(res.data.message); // Log the success message
      } else {
        const res = await axios.post(
          `http://localhost:7000/api/order/create-order`,
          data
        );
        //  console.log(res.data.message); // Log the success message
      }
      router.refresh();
      router.push(`/dashboard/order`);
      toast({
        title: toastMessage,
        description: 'Order has been successfully processed.'
      });
    } catch (error: any) {
      // console.error(error); // Log the error for debugging
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // await axios.delete(`/api/${params.storeId}/orders/${params.orderId}`);
      router.refresh();
      router.push(`/${params.storeId}/orders`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            {/* <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Order Number"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer Name"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="orderDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={loading}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status: any) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
