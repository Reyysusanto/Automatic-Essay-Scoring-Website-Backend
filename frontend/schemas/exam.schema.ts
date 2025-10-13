import z from 'zod';

export const ExamSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
});
