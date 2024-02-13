import { Router } from "express";
import mongoose from "mongoose";
import { Account, User, connectToDB } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares.js";
import { COOKIE_EXPIRY_SECONDS } from "../config.js";

const userRouter = Router();

userRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    await connectToDB();

    const user = await User.findOne(
      {
        _id: req.userId,
      },
      ["email", "firstName", "lastName"],
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

userRouter.get("/logout", async (_req, res) => {
  return res.clearCookie("jwt").json({
    message: "User logged out",
  });
});

userRouter.get("/bulk", async (req, res) => {
  try {
    await connectToDB();

    const query = req.query.filter || "";

    const users = await User.find(
      {
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      },
      ["email", "firstName", "lastName", "_id"],
    );

    return res.json({
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

userRouter.put("/", authMiddleware, async (req, res) => {
  try {
    await connectToDB();

    const { password, firstName, lastName } = req.body;

    if (!password && !firstName && !lastName) {
      return res.status(400).json({
        message: "Nothing sent to update.",
      });
    }

    let update = {};

    if (password) update.password = password;
    if (firstName) update.firstName = firstName;
    if (lastName) update.lastName = lastName;

    const user = await User.findOneAndUpdate(
      {
        _id: req.userId,
      },
      update,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.json({
      message: "User data updated successfully.",
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: error.message.split(":")[2].trim(),
      });
    }
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    await connectToDB();

    const { email, password, firstName, lastName } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }

    if (!firstName) {
      return res.status(400).json({
        message: "First name is required.",
      });
    }

    if (!lastName) {
      return res.status(400).json({
        message: "Last name is required.",
      });
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    const account = new Account({
      user: user._id,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    await user.save({ session });
    await account.save({ session });

    await session.commitTransaction();
    await session.endSession();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRY_SECONDS * 1000,
    });

    return res.json({
      message: "User created successfully.",
      token,
    });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: error.message.split(":")[2].trim(),
      });
    }

    if (error.code == 11000) {
      return res.status(400).json({
        message: "Email already in use.",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    await connectToDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password not provided.",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password is incorrect.",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRY_SECONDS * 1000,
    });

    return res.json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

export { userRouter };
