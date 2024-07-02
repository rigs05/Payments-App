import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  try {
    console.log("Signout request incoming to server.");
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.clearCookie("user", {
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "logout successful." });
  } catch (err) {
    res.status(411).json({ message: "Cannot logout." });
  }
});

export default router;
