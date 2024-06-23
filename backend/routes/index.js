import { Router } from "express";
const router = Router();
import userRouter from "./user.js";
import accountRouter from "./account.js";

router.use("/user", userRouter);
router.use("/account", accountRouter);

/* TO ADD NEW FEATURES:
ADD HISTORY LOG OF AMOUNT TRANSFERRED (MINI-STATEMENT) WITH DATE & TIME.
ADD BODY VALIDATION (USING ZOD) IN /transfer ROUTE (ONLY NUMBER ALLOWED IN AMOUNT).

*/

export default router;
