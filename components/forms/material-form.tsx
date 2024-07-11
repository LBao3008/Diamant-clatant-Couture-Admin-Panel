'use client';

import * as z from 'zod';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
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
import { useToast } from '../ui/use-toast';

const priceHistorySchema = z.object({
  buyPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: 'Buy Price must be positive' }),
  sellPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .optional()
    .refine((val) => val === undefined || val > 0, {
      message: 'Sell Price must be positive'
    }),
  effectDate: z.string().min(1, { message: 'Effect Date is required' }),
  date: z.string().optional()
});

const formSchema = z.object({
  name: z.string().min(1, { message: 'Material name is required' }),
  density: z.object({
    value: z
      .string()
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, {
        message: 'Density value is required and must be positive'
      }),
    unit: z.string().default('g/cm³')
  }),
  priceUnit: z.string().default('g'),
  currentBuyPrice: z
    .number()
    .min(0, { message: 'Current Buy Price must be positive' }),
  priceHistory: z
    .array(priceHistorySchema)
    .min(1, { message: 'At least one price history entry is required' })
});

type MaterialFormValues = z.infer<typeof formSchema>;

interface MaterialFormProps {
  initialData: any | null;
}

export const MaterialForm: React.FC<MaterialFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Material' : 'Create Material';
  const description = initialData ? 'Edit a material.' : 'Add a new material';
  const toastMessage = initialData ? 'Material updated.' : 'Material created.';
  const action = initialData ? 'Save changes' : 'Create';

  useEffect(() => {
    // console.log('Initial data received:', initialData);
  }, [initialData]);

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        density: { value: 0, unit: 'g/cm³' },
        priceUnit: 'g',
        currentBuyPrice: 0,
        currentSellPrice: 0,
        currentEffectDate: '',
        currentUpdateDate: '',
        priceHistory: [{ buyPrice: 0, sellPrice: 0, effectDate: '', date: '' }]
      };

  //console.log('Default values for form:', defaultValues);

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [initialData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'priceHistory'
  });

  const onSubmit = async (data: MaterialFormValues) => {
    console.log('Form data on submit:', data);
    const convertedData = {
      ...data,
      density: {
        ...data.density,
        value: Number(data.density.value)
      },
      priceHistory: data.priceHistory.map((record) => ({
        ...record,
        buyPrice: Number(record.buyPrice),
        sellPrice: Number(record.sellPrice),
        date: new Date().toISOString()
      }))
    };
    console.log('Converted data:', convertedData);
    try {
      setLoading(true);
      if (initialData) {
        console.log(
          `Sending PATCH request to update material with ID: ${initialData._id}`
        );
        await axios.patch(
          `http://localhost:7000/api/material/edit/${initialData._id}`,
          convertedData
        );
        console.log('Material updated:', initialData._id);
      } else {
        console.log('Sending POST request to create new material');
        await axios.post(
          'http://localhost:7000/api/material/add',
          convertedData
        );
        console.log('New material created');
      }
      router.refresh();
      router.push('/dashboard/material');
      toast({
        variant: 'default',
        title: toastMessage
      });
    } catch (error: any) {
      console.error('Error on form submit:', error);
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
      // await axios.delete(`/api/${params.storeId}/materials/${params.materialId}`);
      router.refresh();
      router.push(`/${params.storeId}/materials`);
    } catch (error: any) {
      console.error('Error on delete:', error);
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
          <div className="gap-8 md:grid md:grid-cols-2">
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Material name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="density.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Density Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Density Value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="density.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Density Unit</FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
                      placeholder="Density Unit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Unit</FormLabel>
                  <FormControl>
                    <Input
                      disabled={true}
                      placeholder="Price Unit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentBuyPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Buy Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={true}
                      placeholder="Current Buy Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentSellPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Sell Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={true}
                      placeholder="Current Sell Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="currentEffectDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Effect Date</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={true}
                      placeholder="Current Update Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div>
            <FormLabel>Price History</FormLabel>

            <div className=" rounded border">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-4 gap-8 rounded border border-gray-300 p-4 md:grid md:grid-cols-5"
                >
                  <FormField
                    control={form.control}
                    name={`priceHistory.${index}.buyPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Buy Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading}
                            placeholder="Buy Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`priceHistory.${index}.sellPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sell Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading}
                            placeholder="Sell Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`priceHistory.${index}.effectDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effect Date</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            disabled={loading}
                            placeholder="Effect Date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    disabled={loading}
                    className="self-end"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  append({
                    buyPrice: 0,
                    sellPrice: 0,
                    effectDate: '',
                    date: ''
                  })
                }
                disabled={loading}
              >
                Add Price History
              </Button>
            </div>
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
