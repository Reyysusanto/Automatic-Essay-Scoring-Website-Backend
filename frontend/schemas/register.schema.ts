import z from 'zod';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().min(4, 'Email is required').email('Invalid email format'),
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must include at least one number and one special character'
    ),
});