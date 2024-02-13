import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { rootRouter } from "./routes/index.js";
import { serverSideRouting } from "./middlewares.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRouter);

if (process.env.NODE_ENV == "production") {
  app.use(serverSideRouting(["/"]));
  app.use(express.static("dist"));
  app.get("*", (_req, res) => {
    return res.sendFile("index.html", { root: "./dist" });
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
