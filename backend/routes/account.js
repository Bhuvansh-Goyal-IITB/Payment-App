import { Router } from "express";
import { authMiddleware } from "../middlewares.js";
import { Account, Transaction } from "../db/db.js";
import mongoose from "mongoose";

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {
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

accountRouter.get("/bulk/transaction", authMiddleware, async (req, res) => {
  try {
    const query = req.query.filter || "";

    const transactions = await Account.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "transactions",
          foreignField: "_id",
          as: "transactions",
        },
      },
      {
        $unwind: "$transactions",
      },
      {
        $project: {
          _id: 0,
          transactions: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$transactions", "$$ROOT"],
          },
        },
      },
      {
        $project: {
          transactions: 0,
        },
      },
      {
        $project: {
          user: {
            $cond: {
              if: {
                $eq: ["$from", new mongoose.Types.ObjectId(req.userId)],
              },
              then: "$to",
              else: "$from",
            },
          },
          received: {
            $cond: {
              if: {
                $eq: ["$from", new mongoose.Types.ObjectId(req.userId)],
              },
              then: false,
              else: true,
            },
          },
          amount: 1,
          timestamp: 1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          user: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$user", 0],
              },
              {
                fullName: {
                  $concat: [
                    {
                      $arrayElemAt: ["$user.firstName", 0],
                    },
                    " ",
                    {
                      $arrayElemAt: ["$user.lastName", 0],
                    },
                  ],
                },
              },
            ],
          },
          amount: 1,
          timestamp: 1,
          received: 1,
        },
      },
      {
        $match: {
          "user.fullName": {
            $regex: query,
            $options: "i",
          },
        },
      },
      {
        $project: {
          user: {
            fullName: 0,
            password: 0,
          },
        },
      },
      {
        $sort: {
          timestamp: -1,
        },
      },
    ]);

    return res.json({
      transactions,
    });
  } catch (error) {
    if (error.toString().startsWith("BSONError")) {
      return res.status(404).json({
        message: "Invalid user ID.",
      });
    }
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (amount % 1 != 0) {
      return res.status(400).json({
        message: "Invalid amount.",
      });
    }

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
      timestamp: Date.now(),
    });

    transaction.save({ session });

    await Account.findOneAndUpdate(
      { user: req.userId },
      { $inc: { balance: -amount }, $push: { transactions: transaction } }
    ).session(session);

    await Account.findOneAndUpdate(
      { user: to },
      { $inc: { balance: amount }, $push: { transactions: transaction } }
    ).session(session);

    await session.commitTransaction();
    await session.endSession();

    return res.json({
      message: "Transfer successful.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

export { accountRouter };
