import z from 'zod';

export const QuestionSchema = z.object({
  question: z.string().min(10, 'Question must be at least 10 characters long'),
  answer_key: z
    .string()
    .min(10, 'Answer key must be at least 10 characters long'),
  max_score: z.number().min(0, 'Max score must be at least 0'),
  exam_id: z.string().nonempty('Exam ID is required'),
});
