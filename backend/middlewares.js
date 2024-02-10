import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function authMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    res.status(403).json({
      message: "Authentication token missing.",
    });
    return;
  }

  try {
    const decodedToken = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET,
    );
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Incorrect token.",
    });
    return;
  }
}

export { authMiddleware };
