'use client';

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

const AddQuestionButton = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const handleAddQuestion = () => {
    router.push(`/teachers/exams/${id}/new`);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow flex justify-end">
      <Button
        onClick={handleAddQuestion}
        variant={'default'}
        className="text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-500 border-1 cursor-pointer"
      >
        Tambahkan Soal
      </Button>
    </div>
  );
};

export default AddQuestionButton;
