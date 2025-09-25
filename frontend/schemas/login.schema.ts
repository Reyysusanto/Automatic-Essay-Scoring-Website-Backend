import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(4, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
