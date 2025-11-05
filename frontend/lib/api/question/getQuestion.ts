import { ErrorResponse } from '@/types/response.type';
import axios from 'axios';
import axiosAdminConfig from '../auth';
import { createErrorAction } from '../errorResponse';
import queryString from 'query-string';
import { paginationQuery } from '@/utils/pagination';
import { API_URL } from '@/utils/env';
import { AllQuestionResponse } from '@/types/question.type';

export interface GetAllQuestionParams {
  page?: number;
  pagination?: boolean;
  examId: string;
}

export const getAllQuestionService = async ({
  page,
  pagination,
  examId,
}: GetAllQuestionParams): Promise<AllQuestionResponse | ErrorResponse> => {
  try {
    const params = queryString.stringify(
      {
        page: page || 1,
        ...paginationQuery(page, pagination),
      },
      { skipEmptyString: true, skipNull: true }
    );

    const response = await axiosAdminConfig.get<
      AllQuestionResponse | ErrorResponse
    >(`${API_URL}/questions/exam/${examId}${params && `?${params}`}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status) {
      return response.data as AllQuestionResponse;
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
