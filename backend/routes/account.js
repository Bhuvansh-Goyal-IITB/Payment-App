import { Router } from "express";
import { authMiddleware } from "../middlewares.js";
import { Account, connectToDB } from "../db/db.js";
import mongoose from "mongoose";

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {
    await connectToDB();
    const account = await Account.findOne({
      user: req.userId,
    });

    if (!account) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }

    res.json({
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  try {
    await connectToDB();

    const { to, amount } = req.body;

    const toAccount = await Account.findOne({
      user: new mongoose.Types.ObjectId(to),
    });

    if (!toAccount) {
      return res.status(404).json({
        message: "Receiver account not found.",
      });
    }

    const fromAccount = await Account.findOne({
      user: req.userId,
    });

    if (!fromAccount) {
      return res.status(404).json({
        message: "Sender account not found.",
      });
    }

    if (fromAccount.balance < amount) {
      return res.status(400).json({
        message: "Insufficient funds.",
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    await Account.findOneAndUpdate(
      { user: req.userId },
      { $inc: { balance: -amount } },
    ).session(session);

    await Account.findOneAndUpdate(
      { user: to },
      { $inc: { balance: amount } },
    ).session(session);

    await session.commitTransaction();
    await session.endSession();

    return res.json({
      message: "Transfer successful.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

export { accountRouter };
