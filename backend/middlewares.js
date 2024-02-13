import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function isUserAuthenticated(token) {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

function serverSideRouting(protectedPaths) {
  return function (req, res, next) {
    const isGoingToProtectedPath = protectedPaths.some((path) => {
      if (path == "/") return req.path == "/";
      return req.path.startsWith(path);
    });

    const token =
      req.headers.authentication?.split(" ")[1] || req.cookies.jwt || "";

    const authenticated = isUserAuthenticated(token);

    if (
      authenticated &&
      (req.path.startsWith("/login") || req.path.startsWith("/signup"))
    ) {
      return res.redirect("/");
    }

    if (!authenticated && isGoingToProtectedPath) {
      return res.redirect("/login");
    }

    return next();
  };
}

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

export { authMiddleware, serverSideRouting };
