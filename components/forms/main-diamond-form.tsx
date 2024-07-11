'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

const attributes = [
  {
    _id: '645f0b95af839230b4d5164a',
    name: 'origin',
    values: ['natural', 'lab grown']
  },
  {
    _id: 'a1b2c3d4e5f6a7b8c9d0e1f2',
    name: 'cut',
    values: ['poor', 'good', 'very good', 'excellent']
  },
  {
    _id: '1a2b3c4d5e6f7a8b9c0d1e2f',
    name: 'color',
    values: ['D', 'H', 'N', 'Z']
  },
  {
    _id: '1a2b3c4d5e6f7a8b8c0d0e1f',
    name: 'clarity',
    values: ['FL', 'IF', 'VVS', 'VS', 'SI', 'VVS1']
  },
  {
    _id: '0f1e2d3c4b5a6f7e8d9c0a1b',
    name: 'carat weight',
    values: [
      '1 ct',
      '2 ct',
      '3 ct',
      '4 ct',
      '5 ct',
      '6 ct',
      '7 ct',
      '8 ct',
      '9 ct',
      '10 ct'
    ]
  }
];

const priceHistorySchema = z.object({
  buyPrice: z.number().nonnegative(),
  sellPrice: z.number().nonnegative(),
  effectDate: z.date()
});

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Side Stone Name must be at least 3 characters' }),
  priceHistory: z
    .array(priceHistorySchema)
    .min(1, { message: 'At least one price history record must be added.' }),
  attributes: z.object({
    origin: z.string().nonempty({ message: 'Origin is required' }),
    cut: z.string().nonempty({ message: 'Cut is required' }),
    color: z.string().nonempty({ message: 'Color is required' }),
    clarity: z.string().nonempty({ message: 'Clarity is required' }),
    caratWeight: z.string().nonempty({ message: 'Carat Weight is required' })
  })
});

type SideStoneFormValues = z.infer<typeof formSchema>;

interface SideStoneFormProps {
  initialData: any | null;
}

export const SideStoneForm: React.FC<SideStoneFormProps> = ({
  initialData
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Side Stone' : 'Create Side Stone';
  const description = initialData
    ? 'Edit a side stone.'
    : 'Add a new side stone';
  const toastMessage = initialData
    ? 'Side Stone updated.'
    : 'Side Stone created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        priceHistory: [{ buyPrice: 0, sellPrice: 0, effectDate: new Date() }],
        attributes: {
          origin: '',
          cut: '',
          color: '',
          clarity: '',
          caratWeight: ''
        }
      };

  const form = useForm<SideStoneFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'priceHistory'
  });

  const onSubmit = async (data: SideStoneFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/side-stone/edit/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/side-stone/add`, data);
        // console.log("side stone", res);
      }
      router.refresh();
      router.push('/dashboard/side-stones');
      toast({
        variant: 'success',
        title: toastMessage
      });
    } catch (error: any) {
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
      // await axios.delete(`/api/side-stone/${initialData._id}`);
      router.refresh();
      router.push('/dashboard/side-stones');
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={onDelete}
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Side stone name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {attributes.map((attribute) => (
            <FormField
              key={attribute._id}
              control={form.control}
              name={`attributes.${attribute.name}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{attribute.name}</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${attribute.name}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {attribute.values.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div>
            <FormLabel>Price History</FormLabel>
            <div className="space-y-4">
              {fields.map((item, index) => (
                <div key={item.id} className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name={`priceHistory.${index}.buyPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
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
                        <FormControl>
                          <Input
                            type="number"
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
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="self-end"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={() =>
                append({ buyPrice: 0, sellPrice: 0, effectDate: new Date() })
              }
            >
              Add Price History
            </Button>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
