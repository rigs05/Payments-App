import { sign, verify } from "jsonwebtoken";
import { isValid } from "zod";
import { Router } from "express";
const router = Router();

router.post("/signup", async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    throw new Error("Internal server error.");
  }
});

router.post("/signin", async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    throw new Error("Internal server error.");
  }
});

export default router;
