import { sign, verify } from "jsonwebtoken";
import { zodSchema } from "../database/zodSchema";
import { User } from "../database/users";
import { Router } from "express";
import "dotenv/config";
const router = Router();

router.post("/signup", async (req, res) => {
  try {
    // const { fName, lName, userId, password } = req.body;
    const userDataInput = req.body;

    const zodValidation = zodSchema.safeParse(userDataInput);
    if (!zodValidation.success) {
      return res.json({ error: zodValidation.data });
    }
    let userExist = User.findOne({ userId: userDataInput.userId });
    if (userExist) {
      return res.status(411).json({
        message: "User already exist in database, please login.",
      });
    }
    userExist = new User(userDataInput);
    const token = sign({ userId: userExist.userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    userExist.save();
    res
      .status(200)
      .json({ token: token, message: "User created successfully." });
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
