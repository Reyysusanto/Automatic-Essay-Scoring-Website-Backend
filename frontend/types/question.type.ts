import { Exam } from './exam.type';
import { Meta, SuccessResponse } from './response.type';

export type Question = {
  id: string;
  question: string;
  answer_key: string;
  max_score: number;
  exam: Exam;
};

export type QuestionResponse = SuccessResponse<Question>;
export type AllQuestionResponse = SuccessResponse<Question[]> & {
  meta: Meta;
};
