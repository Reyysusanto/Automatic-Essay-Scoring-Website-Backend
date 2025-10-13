import { ExamResponse } from '@/types/exam.type';
import { ErrorResponse } from '@/types/response.type';
import axios from 'axios';
import z from 'zod';
import axiosAdminConfig from '../auth';
import { createErrorAction } from '../errorResponse';
import { ExamSchema } from '@/schemas/exam.schema';

interface editExamProps {
  name: Partial<z.infer<typeof ExamSchema>>;
  examId: string;
}

export const editExamService = async ({
  name,
  examId,
}: editExamProps): Promise<ExamResponse | ErrorResponse> => {
  try {
    const response = await axiosAdminConfig.patch<ExamResponse | ErrorResponse>(
      `/exams/${examId}`,
      name,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.status) {
      return response.data as ExamResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return createErrorAction(
        error.response.data.message,
        error.response.data.error || 'Unknown error'
      );
    }
    return createErrorAction('An unexpected error occurred', 'Unknown error');
  }
};
