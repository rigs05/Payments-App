import { Router } from "express";
const router = Router();
import userRouter from "./user";

router.use("/user", userRouter);

export default router;
