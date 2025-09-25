'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import z from 'zod';
import { jwtDecode } from 'jwt-decode';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '@/schemas/login.schema';
import { JwtPayload, Role } from '@/types/auth.type';
import { loginAction } from '@/lib/api/auth/login';

const LoginForm = () => {
  const [role, setRole] = useState<'dosen' | 'mahasiswa'>('dosen');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginMutation } = useMutation({
    mutationFn: loginAction,
    onSuccess: (result) => {
      if (result.status) {
        const decoded = jwtDecode<JwtPayload>(result.data.access_token);
        toast.success(result.message);
        if (decoded.role === Role.ADMIN) {
          router.push('/teachers/dashboard');
        } else if (decoded.role === Role.USER) {
          router.push('/students/dashboard');
        } else {
          toast.error('Unauthorized role. Please contact support.');
          router.push('/login');
        }
      } else {
        toast.error(result.error);
      }
    },
    onError: () => {
      toast.error('An unexpected error occurred. Please try again later.');
    },
  });

  const { handleSubmit, formState } = form;

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    loginMutation(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setRole('dosen')}
              className={clsx(
                'cursor-pointer rounded-full transition-all ease-in-out duration-500',
                role === 'dosen'
                  ? 'bg-primary-color text-white shadow-md hover:bg-primary-color/90'
                  : 'bg-transparent text-primary hover:bg-primary-color/10'
              )}
            >
              Dosen
            </Button>
            <Button
              variant="ghost"
              onClick={() => setRole('mahasiswa')}
              className={clsx(
                'cursor-pointer rounded-full transition-all ease-in-out duration-500',
                role === 'mahasiswa'
                  ? 'bg-primary-color text-white shadow-md hover:bg-primary-color/90'
                  : 'bg-transparent text-primary hover:bg-primary-color/10'
              )}
            >
              Mahasiswa
            </Button>
          </div>

          <div className="flex flex-col gap-3 md:w-4/5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Masukkan Email"
                      className="rounded-full border-stone-700 h-10 px-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs ml-4" />
                </FormItem>
              )}
            />
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Masukkan Password"
                        className="rounded-full border-stone-700 h-10 px-4 pr-10"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs ml-4" />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <Button
              disabled={formState.isSubmitting || !formState.isValid}
              className="cursor-pointer transition-all ease-in-out duration-600 rounded-full h-10 px-4"
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
