export type SuccessResponse<T = unknown> = {
  status: true;
  message: string;
  timestamp: string;
  data: T;
};

export type ErrorResponse = {
  status: false;
  message: string;
  timestamp: string;
  error: string;
};
