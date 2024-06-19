import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { User, Account } from "../database/users.js";
import mongoose from "mongoose";
const router = Router();

// To check balance
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userBalance = await Account.findOne({ userId: req.userId });
    res.status(200).json({ balance: userBalance.balance });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch balance." });
  }
});

// To transfer the money
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { amount, to: receiverUserId } = req.body;

    // Check if balance in sender's account is sufficient
    const senderAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient Balance." });
    }

    // Check if receiver's account actually exist
    const toAccount = await User.findOne({ userId: receiverUserId }).session(
      session
    );
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account." });
    }

    // Deduct money from sender account
    await Account.updateOne({
      userId: req.userId,
      $inc: {
        balance: -amount,
      },
    }).session(session);

    // Add money in receiver account
    await Account.updateOne({
      userId: receiverUserId,
      $inc: {
        balance: amount,
      },
    }).session(session);

    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successful." });
    await session.endSession();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Unable to transfer amount. Internal server error." });
  }
});

export default router;
