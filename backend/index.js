import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { rootRouter } from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
