'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteQuestionService } from '@/lib/api/question/deleteQuestion';
import { Question } from '@/types/question.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

const QuestionField = ({
  question,
  index,
}: {
  question: Question;
  index: number;
}) => {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteQuestionMutation, isPending } = useMutation({
    mutationFn: deleteQuestionService,
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ['question', id] });
      } else {
        toast.error(result.error);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleEditQuestion = (question: Question) => {
    router.push(`/teachers/exams/${id}/edit/${question.id}`);
  };

  const handleDeleteQuestion = (questionId: string) => {
    deleteQuestionMutation(questionId);
  };

  return (
    <div className="flex justify-between bg-white rounded-lg p-4 shadow gap-6">
      <div className="flex gap-3">
        <p className="text-sm mt-1 font-medium">{index + 1}</p>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm/relaxed lg:text-base/relaxed text-justify font-semibold">
            {question.question}
          </h3>
          <p className="text-xs/relaxed lg:text-sm/relaxed text-justify font-medium text-gray-500">
            {question.answer_key}
          </p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 flex items-center justify-center bg-primary-color rounded-full">
          <p className="text-white text-sm font-medium">{question.max_score}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              id={`options-${question.id}`}
              className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100"
            >
              ...
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              id={`edit-${question.id}`}
              className="cursor-pointer"
              onClick={() => handleEditQuestion(question)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              id={`delete-${question.id}`}
              className="cursor-pointer"
              disabled={isPending}
              onClick={() => handleDeleteQuestion(question.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default QuestionField;
