'use client';

import { useParams } from 'next/navigation';
import EditQuestionForm from './EditQuestionForm';
import { getDetailQuestionService } from '@/lib/api/question/getDetailQuestion';
import { useQuery } from '@tanstack/react-query';
import SkeletonQuestionForm from './SkeletonQuestionForm';

const EditQuestionClient = () => {
  const { questionId } = useParams() as { questionId: string };

  const { data: questionData, isLoading } = useQuery({
    queryKey: ['question'],
    queryFn: () => getDetailQuestionService(questionId),
    enabled: !!questionId,
  });

  return (
    <>
      {isLoading ? (
        <SkeletonQuestionForm />
      ) : !questionData?.status || !questionData.data ? (
        <p className="text-center">Terjadi Kesalahan Silahkan Coba Lagi...</p>
      ) : (
        <EditQuestionForm question={questionData.data} />
      )}
    </>
  );
};

export default EditQuestionClient;
