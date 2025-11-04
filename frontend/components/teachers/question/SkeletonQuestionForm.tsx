import { Skeleton } from '@/components/ui/skeleton';

const QuestionFormSkeleton = () => {
  return (
    <div className="p-6 min-h-screen space-y-4 animate-pulse">
      <Skeleton className="w-1/3 h-8 rounded-md" />

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-full h-28 rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-1/3 h-4 rounded-md" />
          <Skeleton className="w-full h-36 rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-1/4 h-4 rounded-md" />
          <Skeleton className="w-36 h-10 rounded-md" />
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Skeleton className="w-24 h-10 rounded-md" />
          <Skeleton className="w-24 h-10 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default QuestionFormSkeleton;
