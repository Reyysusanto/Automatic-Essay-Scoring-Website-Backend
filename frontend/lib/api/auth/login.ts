import { useAuthStore } from '@/store/useStore';
import { ErrorResponse } from '@/types/response.type';
import { API_URL } from '@/utils/env';
import axios from 'axios';
import z from 'zod';
import Cookies from 'js-cookie';
import { LoginSchema } from '@/schemas/login.schema';
import { LoginResponse } from '@/types/auth.type';
import { createErrorAction } from '../errorResponse';

export const loginAction = async (
  data: z.infer<typeof LoginSchema>
): Promise<LoginResponse | ErrorResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.status) {
      const { access_token, refresh_token } = response.data.data;

      useAuthStore.getState().setTokens(access_token, refresh_token);

      Cookies.set('access_token', access_token, {
        sameSite: 'strict',
        secure: true,
      });

      Cookies.set('refresh_token', refresh_token, {
        expires: 7,
        sameSite: 'strict',
        secure: true,
      });

      return response.data as LoginResponse;
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
