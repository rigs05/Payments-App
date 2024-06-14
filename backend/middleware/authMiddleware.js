import { verify } from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access." });
  }
  const decodeToken = verify(token, process.env.JWT_SECRET);
  if (!decodeToken) {
    return res.status(403).json({ error: "Invalid token." });
  }
  req.userId = decodeToken.userId;
  req.userName = decodeToken.fName;
  next();
};
