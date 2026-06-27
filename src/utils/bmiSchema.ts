import { z } from 'zod';

export const bmiFormSchema = z.object({
  weight: z
    .number({ message: 'Weight is required and must be a number' })
    .min(20, { message: 'Weight must be at least 20 kg' })
    .max(350, { message: 'Weight cannot exceed 350 kg' }),
  heightUnit: z.enum(['cm', 'm']),
  height: z
    .number({ message: 'Height is required and must be a number' }),
  age: z
    .number({ message: 'Age is required and must be a number' })
    .int({ message: 'Age must be an integer' })
    .min(2, { message: 'Age must be at least 2 years' })
    .max(120, { message: 'Age cannot exceed 120 years' }),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Please select a gender option',
  }),
}).superRefine((data, ctx) => {
  if (data.heightUnit === 'cm') {
    if (data.height < 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Height must be at least 50 cm',
        path: ['height'],
      });
    } else if (data.height > 250) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Height cannot exceed 250 cm',
        path: ['height'],
      });
    }
  } else {
    // Meters unit
    if (data.height < 0.5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Height must be at least 0.50 m',
        path: ['height'],
      });
    } else if (data.height > 2.5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Height cannot exceed 2.50 m',
        path: ['height'],
      });
    }
  }
});

export type BmiFormInput = z.infer<typeof bmiFormSchema>;
