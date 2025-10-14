import { Skeleton } from '@/components/ui/skeleton';

export const UjianCardSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg border border-input min-h-[80px] flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};
