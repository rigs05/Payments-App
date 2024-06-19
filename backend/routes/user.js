import jwt from "jsonwebtoken";
import { signupUserSchema, updatesUserSchema } from "../database/zodSchema.js";
import { User, Account } from "../database/users.js";
import { Router } from "express";
import "dotenv/config";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/signup", async (req, res) => {
  const userDataInput = req.body;
  try {
    // console.log(userDataInput);
    // const { firstName, lastName, userId, password, balance } = req.body;
    const zodValidation = await signupUserSchema.safeParse(userDataInput);
    if (!zodValidation.success) {
      return res.json({
        message: "Error occurred. Incorrect input data found.",
        error: zodValidation.error,
      });
    }
    let userExist = await User.findOne({ userId: userDataInput.userId });
    if (userExist) {
      return res.status(411).json({
        message: "User already exist in database, please login.",
      });
    }
    userExist = new User({
      firstName: userDataInput.firstName,
      lastName: userDataInput.lastName,
      userId: userDataInput.userId,
      password: userDataInput.password,
    });
    const accountBalance = new Account({
      userId: userDataInput.userId,
      balance: userDataInput.balance,
    });
    const token = jwt.sign(
      { userId: userExist.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    await userExist.save();
    await accountBalance.save();
    res
      .status(200)
      .json({ token: token, message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/signin", async (req, res) => {
  const { userId, password } = req.body;
  try {
    const userExist = await User.findOne({ userId, password });
    if (!userExist) {
      return res
        .status(411)
        .json({ message: "Error while loggin in. Check userId or password." });
    }
    const token = jwt.sign(
      { userId: userId, firstName: userExist.firstName },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  // const userId = req.userId;
  const { password, firstName, lastName } = req.body;
  try {
    // const zodValidation = zodSchema.safeParse({
    //   firstName,
    //   lastName,
    //   userId,
    //   password,
    // });
    // if (!zodValidation.success) {
    //   return res.status(411).json({ error: zodValidation.data });
    // }

    let updates = {};
    if (firstName) {
      updates.firstName = firstName;
    }
    if (lastName) {
      updates.lastName = lastName;
    }
    if (password) {
      updates.password = password;
    }

    const zodValidation = updatesUserSchema.safeParse(updates);
    if (!zodValidation.success) {
      return res.status(411).json({ message: "", error: zodValidation.error });
    }

    const userUpdate = await User.updateOne(
      { userId: req.userId },
      { $set: updates }
    );
    if (!userUpdate) {
      return res.status(404).json({ message: "User not found." });
    } else if (!userUpdate.nModified) {
      return res.status(200).json({ message: "No changes made." });
    }
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error}." });
  }
});

// Check this route
router.get("/bulk", authMiddleware, async (req, res) => {
  const { filter } = req.query;
  try {
    const name = new RegExp(filter, "g");
    const userExist = await User.findOne({ name });
    if (!userExist) {
      return res.status(411).json({ message: "No such user." });
    }
    const list = userExist.map((user) => {
      user.firstName, user.lastName, user._id;
    });
    res.status(200).json({ users: list });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Unable to find search query. Internal server error." });
  }
});

export default router;
