import { ErrorResponse } from '@/types/response.type';
import { API_URL } from '@/utils/env';
import axios from 'axios';
import z from 'zod';
import { createErrorAction } from '../errorResponse';
import { RegisterSchema } from '@/schemas/register.schema';
import { RegisterResponse } from '@/types/auth.type';

export const RegisterAction = async (
  data: z.infer<typeof RegisterSchema>
): Promise<RegisterResponse | ErrorResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status) {
      return response.data as RegisterResponse;
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