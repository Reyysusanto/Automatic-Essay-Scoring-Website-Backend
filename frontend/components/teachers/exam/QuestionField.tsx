'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Question } from '@/types/question.type';
import { useParams, useRouter } from 'next/navigation';

const QuestionField = ({
  question,
  index,
}: {
  question: Question;
  index: number;
}) => {
  const { id } = useParams();
  const router = useRouter();

  const handleEditQuestion = (questionId: string) => {
    router.push(`/teachers/exams/${id}/edit/${questionId}`);
  };

  const handleDeleteQuestion = (questionId: string) => {
    console.log(`Delete question id : ${questionId}`);
  };

  return (
    <div className="flex justify-between bg-white rounded-lg p-4 shadow gap-6">
      <div className="flex gap-3">
        <p className="text-sm lg:text-base font-semibold">{index + 1}</p>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm/relaxed lg:text-base/relaxed text-justify font-semibold">
            {question.title}
          </h3>
          <p className="text-xs/relaxed lg:text-sm/relaxed text-justify font-medium text-gray-500">
            {question.description}
          </p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="w-8 h-8 flex items-center justify-center bg-primary-color rounded-full">
          <p className="text-white text-sm font-medium">{question.marks}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100">
              ...
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditQuestion(question.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteQuestion(question.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default QuestionField;
