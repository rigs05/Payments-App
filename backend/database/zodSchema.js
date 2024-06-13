import { z } from "zod";

// Could be made into a middleware

export const zodSchema = z.object({
  fName: z.string(),
  lName: z.string(),
  userId: z.string().email({ message: "Enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be minimum 8 characters." })
    .max(15, { message: "Password must not exceed 15 characters." }),
});
