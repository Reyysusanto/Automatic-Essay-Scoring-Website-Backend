import { AllExamResponse } from '@/types/exam.type';
import { ErrorResponse } from '@/types/response.type';
import axios from 'axios';
import axiosAdminConfig from '../auth';
import { createErrorAction } from '../errorResponse';
import queryString from 'query-string';
import { paginationQuery } from '@/utils/pagination';
import { API_URL } from '@/utils/env';

export interface GetAllExamParams {
  page?: number;
  pagination?: boolean;
}

export const getAllExamService = async ({
  page,
  pagination,
}: GetAllExamParams): Promise<AllExamResponse | ErrorResponse> => {
  try {
    const params = queryString.stringify(
      {
        page: page || 1,
        ...paginationQuery(page, pagination),
      },
      { skipEmptyString: true, skipNull: true }
    );

    const response = await axiosAdminConfig.get<
      AllExamResponse | ErrorResponse
    >(`${API_URL}/exams${params && `?${params}`}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status) {
      return response.data as AllExamResponse;
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
