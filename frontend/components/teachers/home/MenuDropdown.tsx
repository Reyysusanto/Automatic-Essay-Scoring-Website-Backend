'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { ExamSchema } from '@/schemas/exam.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExamService } from '@/lib/api/exam/createExam';
import { toast } from 'sonner';

export const TambahUjianDropdown = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [judulUjian, setJudulUjian] = useState('');
  const form = useForm<z.infer<typeof ExamSchema>>({
    resolver: zodResolver(ExamSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const { control, handleSubmit } = form;

  const { mutate: createExam } = useMutation({
    mutationFn: createExamService,
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message, { duration: 3000 });
        queryClient.invalidateQueries({ queryKey: ['exams'] });
      } else {
        toast.error(result.error, { duration: 3000 });
      }
    },
    onError: (err) => {
      toast.error(err.message, { duration: 3000 });
    },
  });

  const submitForm = (data: z.infer<typeof ExamSchema>) => {
    createExam({ name: data.name });

    if (judulUjian.trim()) {
      setJudulUjian('');
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setJudulUjian('');
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-10 px-4 rounded-lg"
      >
        <span>Tambahkan Ujian</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-10" onClick={handleCancel} />

          <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-input rounded-lg shadow-lg z-20">
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(submitForm)} className="p-4">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Masukkan judul ujian..."
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs mb-1" />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 mt-2 h-full">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary-color hover:bg-emerald-700 h-9 rounded-md text-white cursor-pointer"
                  >
                    Tambah
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={handleCancel}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </>
      )}
    </div>
  );
};
