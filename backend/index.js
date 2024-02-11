import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { rootRouter } from "./routes/index.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRouter);

if (process.env.NODE_ENV == "production") {
  app.use((req, res, next) => {
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
  });

  app.use(express.static("dist"));

  app.get("*", (_req, res) => {
    return res.sendFile("index.html", { root: "./dist" });
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
