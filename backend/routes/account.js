import { Router } from "express";
import { authMiddleware } from "../middlewares.js";
import { Account, Transaction, connectToDB } from "../db/db.js";
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

accountRouter.get("/transaction/:id", authMiddleware, async (req, res) => {
  try {
    await connectToDB();

    const account = await Account.findOne({
      user: req.userId,
    }).populate({
      path: "transactions",
      match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      populate: [
        {
          path: "from",
          model: "User",
          select: ["email", "firstName", "lastName"],
        },
        {
          path: "to",
          model: "User",
          select: ["email", "firstName", "lastName"],
        },
      ],
      model: "Transaction",
    });

    if (!account.transactions[0]) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    return res.json({
      transaction: account.transactions[0],
    });
  } catch (error) {
    if (error.toString().startsWith("BSONError")) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

accountRouter.get("/transaction/bulk", authMiddleware, async (req, res) => {
  try {
    await connectToDB();

    const account = await Account.findOne(
      {
        user: req.userId,
      },
      ["from", "to", "amount", "timestamp"],
    ).populate({
      path: "transactions",
      populate: [
        {
          path: "from",
          model: "User",
          select: ["email", "firstName", "lastName"],
        },
        {
          path: "to",
          model: "User",
          select: ["email", "firstName", "lastName"],
        },
      ],
      model: "Transaction",
    });

    if (!account) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      transactions: account.transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  try {
    await connectToDB();

    const { to, amount } = req.body;

    const toAccount = await Account.findOne({
      user: to,
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

    const transaction = new Transaction({
      from: req.userId,
      to,
      amount,
    });

    transaction.save({ session });

    await Account.findOneAndUpdate(
      { user: req.userId },
      { $inc: { balance: -amount }, $push: { transactions: transaction } },
    ).session(session);

    await Account.findOneAndUpdate(
      { user: to },
      { $inc: { balance: amount }, $push: { transactions: transaction } },
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
