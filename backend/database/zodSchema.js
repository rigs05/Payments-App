import { z } from "zod";

// Could be made into a middleware

export const signupUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userId: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be minimum 8 characters." })
    .max(15, { message: "Password must not exceed 15 characters." }),
  balance: z.number(),
});

export const updatesUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userId: z.string().email({ message: "Enter a valid email." }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be minimum 8 characters." })
    .max(15, { message: "Password must not exceed 15 characters." })
    .optional(),
});
