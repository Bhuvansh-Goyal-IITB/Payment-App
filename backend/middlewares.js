import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function serverSideRouting(req, res, next) {
  let path = "";
  if (req.path.endsWith("/")) {
    path = req.path.slice(0, -1);
  } else {
    path = req.path;
  }

  if (!req.headers.authorization && !req.cookies.jwt && path == "") {
    return res.redirect("/login");
  }

  const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    if (path == "/login" || path == "/signup") {
      return res.redirect("/");
    }
    return next();
  } catch (error) {
    if (path == "") {
      return res.redirect("/login");
    }

    return next();
  }
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
