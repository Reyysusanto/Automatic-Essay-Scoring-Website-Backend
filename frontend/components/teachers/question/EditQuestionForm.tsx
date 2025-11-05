'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { editQuestionService } from '@/lib/api/question/editQuestion';
import { QuestionSchema } from '@/schemas/question.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Question } from '@/types/question.type';

const EditQuestionForm = ({ question }: { question: Question }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id, questionId } = useParams() as { id: string; questionId: string };

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    mode: 'onChange',
    defaultValues: {
      question: question.question,
      answer_key: question.answer_key,
      max_score: question.max_score,
      exam_id: id,
    },
  });

  const { control, handleSubmit, formState } = form;

  const { mutate: editQuestionMutation, isPending } = useMutation({
    mutationFn: editQuestionService,
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ['question', id] });
        router.push(`/teachers/exams/${id}`);
      } else {
        toast.error(result.error);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: Partial<z.infer<typeof QuestionSchema>>) => {
    editQuestionMutation({
      questionId,
      data: {
        question: data.question,
        answer_key: data.answer_key,
        max_score: data.max_score,
        exam_id: data.exam_id,
      },
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="p-6 min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Tambah Soal</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soal</FormLabel>
                  <FormControl>
                    <Textarea
                      id="question"
                      placeholder="Masukkan Soal"
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    data-testid="text-question"
                    className="text-xs mb-1"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="answer_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kunci Jawaban</FormLabel>
                  <FormControl>
                    <Textarea
                      id="answer_key"
                      placeholder="Masukkan Jawaban"
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    data-testid="text-answer-key"
                    className="text-xs mb-1"
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="max_score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skor Maksimal</FormLabel>
                  <FormControl>
                    <Input
                      id="max_score"
                      type="number"
                      placeholder="Masukkan Skor Maksimal"
                      className="min-w-[250px] resize-none"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage
                    data-testid="text-max-score"
                    className="text-xs mb-1"
                  />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <Button
                id="cancel-button"
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isPending || formState.isSubmitting}
                className="px-6 cursor-pointer"
              >
                Batal
              </Button>
              <Button
                id="save-button"
                type="submit"
                disabled={
                  isPending || formState.isSubmitting || !formState.isValid
                }
                className="px-6 bg-primary-color hover:bg-teal-600 cursor-pointer"
              >
                {isPending || formState.isSubmitting ? (
                  <Spinner size={'small'} className="text-white" />
                ) : (
                  'Simpan'
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditQuestionForm;
