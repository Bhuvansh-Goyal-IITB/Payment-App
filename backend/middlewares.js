import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
  if (!req.headers.authorization && !req.cookies.jwt) {
    res.status(403).json({
      message: "Authentication token missing.",
    });
    return;
  }

  const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
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
