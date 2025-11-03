'use client';

import { useParams, useRouter } from 'next/navigation';
import AddQuestionButton from './AddQuestionButton';
import QuestionField from './QuestionField';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getAllQuestionService } from '@/lib/api/question/getQuestion';
import QuestionFieldSkeleton from './SkeletonQuestionField';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ManageExamSection = () => {
  const params = useParams();
  const examId = params.id as string;
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  const {
    data: questionData,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['question', examId],
    queryFn: () => getAllQuestionService({ page, examId }),
    enabled: !!examId,
  });

  return (
    <div className="">
      <div className="space-y-6">
        <AddQuestionButton />

        {isLoading || isFetching ? (
          <QuestionFieldSkeleton />
        ) : !questionData?.status ||
          !questionData?.data ||
          questionData.data.length === 0 ? (
          <div className="space-y-4 mt-24 flex flex-col justify-center items-center">
            <p className="text-center text-gray-500">
              Belum ada soal yang dibuat
            </p>
            <Button
              onClick={() => router.push(`/teachers/exams/${examId}/new`)}
              variant={'default'}
              className="text-xs font-medium bg-primary-color hover:bg-teal-600 text-white border-1 cursor-pointer"
            >
              Tambahkan Soal
            </Button>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {questionData.data.map((question, index) => (
                <QuestionField
                  key={question.id}
                  question={question}
                  index={index}
                />
              ))}
            </div>

            {(questionData?.meta.max_page ?? 1) > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((prev) => Math.max(1, prev - 1));
                        }}
                      />
                    </PaginationItem>

                    {Array.from(
                      { length: questionData?.meta.max_page || 1 },
                      (_, i) => {
                        const pageNumber = i + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === questionData?.meta.max_page ||
                          (pageNumber >= page - 1 && pageNumber <= page + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPage(pageNumber);
                                }}
                                className={
                                  page === pageNumber ? 'bg-gray-200' : ''
                                }
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          pageNumber === page - 2 ||
                          pageNumber === page + 2
                        ) {
                          return (
                            <PaginationItem key={`ellipsis-${pageNumber}`}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        } else {
                          return null;
                        }
                      }
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage((prev) =>
                            Math.min(questionData?.meta.max_page || 1, prev + 1)
                          );
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageExamSection;
