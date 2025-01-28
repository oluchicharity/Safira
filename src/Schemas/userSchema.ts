import { z } from "zod";

// Schema for user registration
export const userRegistrationSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

// Schema for user login
export const userLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

// Infer TypeScript types from the schema
export type UserRegistrationData = z.infer<typeof userRegistrationSchema>;
export type UserLoginData = z.infer<typeof userLoginSchema>;
