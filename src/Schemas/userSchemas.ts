import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Invalid email address' });

const fullnameSchema = z.string().min(1, { message: 'Full name is required' });

export const UserSignInSchema = z.object({
  body: z.object({
    email: emailSchema,
    fullname: fullnameSchema,
  }),
});

export type UserSignInSchemaBody = z.infer<typeof UserSignInSchema>['body'];


