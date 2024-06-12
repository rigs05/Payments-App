import { ZodError, z } from "zod";

export const zodSchema = (req, res, next) => {
  try {
  } catch (err) {
    throw new Error("Internal Server Error.");
  }
};
