import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { rootRouter } from "./routes/index.js";
import cors from "cors";
import { connectToDB } from "./db/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDB();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
