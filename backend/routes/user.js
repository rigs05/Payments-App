import { sign } from "jsonwebtoken";
import { zodSchema } from "../database/zodSchema";
import { User } from "../database/users";
import { Router } from "express";
import "dotenv/config";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/signup", async (req, res) => {
  try {
    // const { fName, lName, userId, password } = req.body;
    const userDataInput = req.body;
    const zodValidation = await zodSchema.safeParse(userDataInput);
    if (!zodValidation.success) {
      return res.json({ error: zodValidation.data });
    }
    let userExist = await User.findOne({ userId: userDataInput.userId });
    if (userExist) {
      return res.status(411).json({
        message: "User already exist in database, please login.",
      });
    }
    userExist = new User(userDataInput);
    const token = sign({ userId: userExist.userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    await userExist.save();
    res
      .status(200)
      .json({ token: token, message: "User created successfully." });
  } catch (error) {
    throw new Error("Internal server error.");
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const userExist = await User.findOne({ userId, password });
    if (!userExist) {
      return res
        .status(411)
        .json({ message: "Error while loggin in. Check userId or password." });
    }
    const token = sign(
      { userId: userId, fName: userExist.fName },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({ token: token });
  } catch (error) {
    throw new Error("Internal server error.");
  }
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const { password, fName, lName } = req.body;
    const userId = req.userId;
    const zodValidation = zodSchema.safeParse({
      fName,
      lName,
      userId,
      password,
    });
    if (!zodValidation.success) {
      return res.status(411).json({ error: zodValidation.data });
    }
    const userUpdate = await User.updateOne({
      firstName: fName,
      lastName: lName,
      password,
    });
    await userUpdate.save();
    res.status(200).json({ message: "Information updated successfully." });
  } catch (error) {
    throw new Error("Internal Server Error.");
  }
});

router.get("/bulk?filter=:name", authMiddleware, async (req, res) => {});

export default router;
