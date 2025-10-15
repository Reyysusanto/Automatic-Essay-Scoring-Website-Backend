import { ErrorResponse } from '@/types/response.type';
import axios from 'axios';
import z from 'zod';
import axiosAdminConfig from '../auth';
import { createErrorAction } from '../errorResponse';
import { QuestionSchema } from '@/schemas/question.schema';
import { QuestionResponse } from '@/types/question.type';

export const createQuestionService = async (
  data: z.infer<typeof QuestionSchema>
): Promise<QuestionResponse | ErrorResponse> => {
  try {
    const response = await axiosAdminConfig.post<
      QuestionResponse | ErrorResponse
    >('/questions', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status) {
      return response.data as QuestionResponse;
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
