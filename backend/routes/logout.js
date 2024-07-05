import { Router } from "express";
const router = Router();

router.post("/", async (_req, res) => {
  try {
    console.log("Signout request incoming to server.");
    await res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });

    await res.clearCookie("userId", {
      sameSite: "None",
      secure: true,
    });

    await res.clearCookie("user", {
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "logout successful." });
  } catch (err) {
    res.status(411).json({ message: "Unable to logout." });
  }
});

export default router;
