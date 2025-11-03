"use client";

import React from "react";
import { MoreHorizontal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Exam } from "@/types/exam.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExamService } from "@/lib/api/exam/deleteExam";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { ExamSchema } from "@/schemas/exam.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editExamService } from "@/lib/api/exam/editExam";
import { Spinner } from "@/components/ui/spinner";

interface UjianCardProps {
  exam: Exam;
}

export const UjianCard: React.FC<UjianCardProps> = ({ exam }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof ExamSchema>>({
    resolver: zodResolver(ExamSchema),
    mode: "onChange",
    defaultValues: {
      name: exam.name || "",
    },
  });

  const { control, handleSubmit, formState, setValue } = form;

  const { mutate: updateExamMutation, isPending: loadingUpdate } = useMutation({
    mutationFn: ({
      name,
      examId,
    }: {
      name: Partial<z.infer<typeof ExamSchema>>;
      examId: string;
    }) => editExamService({ name, examId }),
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ["exams"] });
        setValue("name", "");
      } else {
        toast.error(result.error);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data: Partial<z.infer<typeof ExamSchema>>) => {
    updateExamMutation({
      name: data,
      examId: exam.id,
    });
  };

  const { mutate: deleteExamMutation } = useMutation({
    mutationFn: deleteExamService,
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ["exams"] });
      } else {
        toast.error(result.error);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Dialog>
      <div
        id={`exam-${exam.id}`}
        className="bg-white p-4 rounded-lg border border-input hover:shadow-md transition-all group min-h-[80px] flex items-center"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex-1">
            <h3
              id="exam-name"
              className="text-base font-semibold text-foreground"
            >
              {exam.name}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger id={`option-${exam.id}`}>
                <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 w-8 h-8 cursor-pointer">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white px-1 py-2 rounded-lg w-20 border border-gray-700 text-sm cursor-pointer"
                align="end"
              >
                <DropdownMenuItem
                  id="view-btn"
                  className="hover:bg-gray-100 transition-all px-2 py-1 rounded-xs "
                  onClick={() => router.push(`exams/${exam.id}`)}
                >
                  View
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    id="edit-btn"
                    className="hover:bg-gray-100 transition-all px-2 py-1 rounded-xs "
                  >
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem
                  id="delete-btn"
                  onClick={() => deleteExamMutation(exam.id)}
                  className="hover:bg-gray-100 transition-all px-2 py-1 rounded-xs "
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 cursor-pointer"
              onClick={() => router.push(`/teachers/exams/${exam.id}`)}
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground cursor-pointer" />
            </Button>
          </div>
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {exam.name} Name</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-4"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="edit-exam"
                      type="text"
                      placeholder="Masukkan judul ujian..."
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs mb-1" />
                </FormItem>
              )}
            />
            <Button
              id="btn-save-update-exam"
              disabled={!formState.isValid || loadingUpdate}
              className="w-fit self-end bg-primary-color hover:bg-teal-600 cursor-pointer"
            >
              {loadingUpdate ? <Spinner size={"small"} /> : "Simpan Perubahan"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
