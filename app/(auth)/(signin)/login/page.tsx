//next-shadcn-dashboard-starter\app\(auth)\(signin)\login\page.tsx
'use client';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

type LoginFormValues = z.infer<typeof formSchema>;

const buttonVariants = ({ variant }: { variant: 'ghost' | 'default' }) => {
  switch (variant) {
    case 'ghost':
      return 'bg-transparent text-blue-500 border border-blue-500';
    default:
      return 'bg-blue-500 text-white';
  }
};

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:7000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Something went wrong');
      }

      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
      window.location.href = callbackUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={`${buttonVariants({
          variant: 'ghost'
        })} absolute right-4 top-4 md:right-8 md:top-8`}
      >
        Back to Authentication
      </Link>
      <div className="flex flex-col justify-center rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <h2 className="mb-6 text-center text-3xl font-semibold">Login</h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...form.register('email')}
              disabled={loading}
              required
            />
            <p className="mt-1 text-red-500">
              {form.formState.errors.email?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...form.register('password')}
              disabled={loading}
              required
            />
            <p className="mt-1 text-red-500">
              {form.formState.errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
