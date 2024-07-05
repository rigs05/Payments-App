import { z } from "zod";

// Could be made into a middleware

// Zod Validation Schema for first time sign-up users
export const signupUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userId: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be minimum 8 characters." })
    .max(15, { message: "Password must not exceed 15 characters." }),
  // balance: z.number(),
});

// Zod Validation Schema for updated information of logged-in users (optional entities)
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
