import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = (req, res, next) => {
  // Fetch authorization header consisting of JWT token
  // const authHeader = req.headers["authorization"];

  // const token = authHeader && authHeader.split(" ")[1];

  // Cookie based Authorization
  const token = req.cookies.jwt;
  // console.log("Extracted token from cookie: ", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. Unauthorized access." });
  }

  // Verify the token and return the payload as request call (i.e. userId)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.userId = decoded.userId;
    req.userName = decoded.firstName;
  });
  next();
};
