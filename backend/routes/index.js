import { Router } from "express";
import { userRouter } from "./user.js";
import { authMiddleware } from "../middlewares.js";
import { accountRouter } from "./account.js";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountRouter);

rootRouter.get("/", authMiddleware, (_req, res) => {
  res.send("Hello");
});

export { rootRouter };
