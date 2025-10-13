'use client';

import React, { useState } from 'react';
import { TambahUjianDropdown } from './tambah-ujian-dropdown';
import { UjianCard } from './ujian-card';
import { useQuery } from '@tanstack/react-query';
import { getAllExamService } from '@/lib/api/exam/getExam';
import { UjianCardSkeleton } from './SkeletonUjianPage';
import { Frown } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const UjianPage = () => {
  const [page, setPage] = useState(1);

  const {
    data: examsData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['exams', page],
    queryFn: () => getAllExamService({ pagination: true, page }),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-4">Ujian</h1>
          <TambahUjianDropdown />
        </div>

        {isLoading || isFetching ? (
          <div className="space-y-3">
            <UjianCardSkeleton />
            <UjianCardSkeleton />
            <UjianCardSkeleton />
          </div>
        ) : !examsData || !examsData.status ? (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Gagal memuat data ujian
            </h3>
            <p className="text-muted-foreground">
              {examsData?.message ?? 'Terjadi kesalahan pada server'}
            </p>
          </div>
        ) : !examsData.data || examsData.data.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Frown className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">
              Belum ada ujian
            </h3>
            <p className="text-muted-foreground">
              Tambahkan ujian pertama Anda
            </p>
          </div>
        ) : (
          <>
            {examsData.data.length > 0 && (
              <div className="space-y-6">
                {examsData.data.map((exam) => (
                  <UjianCard key={exam.id} exam={exam} />
                ))}

                {examsData.meta.max_page > 1 && (
                  <div className="mt-6 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={(e) => {
                              e.preventDefault();
                              setPage((prev) => Math.max(1, prev - 1));
                            }}
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: examsData?.meta.max_page || 1 },
                          (_, i) => {
                            const pageNumber = i + 1;
                            if (
                              pageNumber === 1 ||
                              pageNumber === examsData?.meta.max_page ||
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
                            onClick={(e) => {
                              e.preventDefault();
                              setPage((prev) =>
                                Math.min(
                                  examsData?.meta.max_page || 1,
                                  prev + 1
                                )
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
          </>
        )}
      </div>
    </div>
  );
};

export default UjianPage;
