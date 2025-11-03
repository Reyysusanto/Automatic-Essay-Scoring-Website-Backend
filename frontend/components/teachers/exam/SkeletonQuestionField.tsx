import { Skeleton } from '@/components/ui/skeleton';

const QuestionFieldSkeleton = () => {
  return (
    <div className="flex justify-between bg-white rounded-lg p-4 shadow gap-6 animate-pulse">
      <div className="flex gap-3">
        <Skeleton className="w-6 h-6 rounded-full" />

        <div className="flex flex-col gap-1 flex-1">
          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-1/2 h-3 rounded-md" />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Skeleton className="w-8 h-8 rounded-full" />

        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default QuestionFieldSkeleton;
