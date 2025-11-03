import { Lecturer } from './actor.type';
import { Meta, SuccessResponse } from './response.type';

export type Exam = {
  id: string;
  name: string;
  token: string;
  lecturer: Lecturer;
};

export type ExamResponse = SuccessResponse<Exam>;
export type AllExamResponse = SuccessResponse<Exam[]> & {
  meta: Meta;
};
