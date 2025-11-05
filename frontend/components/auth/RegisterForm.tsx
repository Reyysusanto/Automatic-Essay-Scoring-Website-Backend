'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { RegisterSchema } from '@/schemas/register.schema';
import { RegisterAction } from '@/lib/api/auth/register';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { mutate: registerMutation } = useMutation({
    mutationFn: RegisterAction,
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message);
        router.push('/login');
      } else {
        toast.error(result.error);
      }
    },
    onError: () => {
      toast.error('An unexpected error occurred. Please try again later.');
    },
  });

  const { handleSubmit, formState } = form;

  const realPassword = form.watch('password');

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    registerMutation(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} id="login-form">
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-3 md:w-4/5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Masukkan Nama"
                      className="rounded-full border-stone-700 h-10 px-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs ml-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Masukkan Email"
                      className="rounded-full border-stone-700 h-10 px-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs ml-4" />
                </FormItem>
              )}
            />
            <div className="flex flex-col relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Masukkan Password"
                          className="rounded-full border-stone-700 h-10 px-4 pr-10"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs ml-4" />
                  </FormItem>
                )}
              />
            </div>

            <div className="relative">
              <Input
                id="passwordConfirmation"
                placeholder="Konfirmasi Password"
                className="rounded-full border-stone-700 h-10 px-4 pr-10"
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={(e) => {
                  setPasswordMatch(realPassword === e.target.value);
                  setConfirmPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {!passwordMatch && confirmPassword.length > 0 && (
              <p className="text-xs text-red-500 ml-4">
                Passwords do not match
              </p>
            )}
            <Button
              id="login-button"
              disabled={formState.isSubmitting || !passwordMatch}
              className="cursor-pointer transition-all ease-in-out duration-600 rounded-full h-10 px-4"
            >
              Daftar Akun
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;