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

export type Meta = {
  page: number;
  per_page: number;
  max_page: number;
  count: number;
};
