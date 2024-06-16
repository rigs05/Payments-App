import { sign } from "jsonwebtoken";
import { signupUserSchema, updatesUserSchema } from "../database/zodSchema";
import { User, Account } from "../database/users";
import { Router } from "express";
import "dotenv/config";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/signup", async (req, res) => {
  const userDataInput = req.body;
  try {
    // const { fName, lName, userId, password, balance } = req.body;
    const zodValidation = await signupUserSchema.safeParse(userDataInput);
    if (!zodValidation.success) {
      return res.json({ error: zodValidation.data });
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
      balance: balance,
    });
    const token = sign({ userId: userExist.userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    await userExist.save();
    await accountBalance.save();
    res
      .status(200)
      .json({ token: token, message: "User created successfully." });
  } catch (error) {
    throw new Error("Internal server error.");
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
  // const userId = req.userId;
  const { password, firstName: fName, lastName: lName } = req.body;
  try {
    // const zodValidation = zodSchema.safeParse({
    //   fName,
    //   lName,
    //   userId,
    //   password,
    // });
    // if (!zodValidation.success) {
    //   return res.status(411).json({ error: zodValidation.data });
    // }

    let updates = {};
    if (fName) {
      updates.fName = fName;
    }
    if (lName) {
      updates.lName = lName;
    }
    if (password) {
      updates.password = password;
    }

    const zodValidation = updatesUserSchema.safeParse(updates);
    if (!zodValidation.success) {
      return res.status(411).json({ error: zodValidation.data });
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
    console.log(error);
    throw new Error("Internal Server Error.");
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
