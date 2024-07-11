'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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

const priceHistorySchema = z.object({
  buyPrice: z.number().min(0, { message: 'Buy price must be at least 0' }),
  sellPrice: z.number().min(0, { message: 'Sell price must be at least 0' }),
  effectDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
});

const formSchema = z.object({
  material: z.string().min(1, { message: 'Material is required' }),
  diamondShellType: z
    .string()
    .min(1, { message: 'Diamond shell type is required' }),
  size: z.string().min(1, { message: 'Size is required' }),
  weight: z
    .object({
      value: z
        .number()
        .min(0, { message: 'Weight value must be at least 0' })
        .optional(),
      unit: z.string().default('g')
    })
    .optional(),
  products: z.array(z.string()).optional(),
  priceHistory: z.array(priceHistorySchema)
});

type DiamondShellFormValues = z.infer<typeof formSchema>;

interface DiamondShellFormProps {
  initialData: any | null;
  products: any;
}

export const DiamondShellForm: React.FC<DiamondShellFormProps> = ({
  initialData,
  products
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Diamond Shell' : 'Create Diamond Shell';
  const description = initialData
    ? 'Edit a diamond shell.'
    : 'Add a new diamond shell';
  const toastMessage = initialData
    ? 'Diamond Shell updated.'
    : 'Diamond Shell created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? initialData
    : {
        material: '',
        diamondShellType: '',
        size: '',
        weight: { value: undefined, unit: 'g' },
        products: [],
        priceHistory: [
          { buyPrice: 0, sellPrice: 0, effectDate: new Date().toISOString() }
        ]
      };

  const form = useForm<DiamondShellFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'priceHistory'
  });

  const onSubmit = async (data: DiamondShellFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/diamond-shell/edit/${initialData._id}`, data);
      } else {
        // const res = await axios.post('/api/diamond-shell/add', data);
        // console.log("diamond shell", res);
      }
      router.refresh();
      router.push('/dashboard/diamond-shells');
      toast({
        title: toastMessage,
        variant: 'success'
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

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setLoading(true)}
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
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Material" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diamondShellType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diamond Shell Type</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Diamond Shell Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="gap-8 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="weight.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Weight Value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight Unit</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Weight Unit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Products</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  multiple
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select products" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product: any) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <div className="flex items-center justify-between">
              <FormLabel>Price History</FormLabel>
              <Button
                type="button"
                onClick={() =>
                  append({
                    buyPrice: 0,
                    sellPrice: 0,
                    effectDate: new Date().toISOString()
                  })
                }
              >
                Add Price History
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="gap-8 md:grid md:grid-cols-4">
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
                        <Input type="date" disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
