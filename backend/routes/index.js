import { Router } from "express";
import { userRouter } from "./user.js";
import { accountRouter } from "./account.js";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountRouter);

export { rootRouter };
