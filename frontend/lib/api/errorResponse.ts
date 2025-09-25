import type { ErrorResponse } from '@/types/response.type';

export const createErrorAction = (
  message: string,
  error: string
): ErrorResponse => ({
  status: false,
  message,
  timestamp: new Date().toISOString(),
  error,
});
