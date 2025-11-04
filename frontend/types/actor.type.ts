import { SuccessResponse } from './response.type';

export type Lecturer = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
};

export type LecturerResponse = SuccessResponse<Lecturer>;
