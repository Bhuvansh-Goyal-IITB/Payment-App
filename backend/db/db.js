import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {
  emailValidators,
  firstNameValidators,
  lastNameValidators,
  passwordValidators,
} from "./validation.js";
dotenv.config();

async function connectToDB() {
  return await mongoose.connect(process.env.MONGO_URI);
}

const TransactionSchema = new mongoose.Schema({
  from: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  to: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now() },
});

const AccountSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  balance: {
    type: Number,
    default: () => (1 + Math.random() * 9999).toFixed(2),
  },
  transactions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Transaction" }],
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidators,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidators,
  },
  firstName: {
    type: String,
    required: true,
    validate: firstNameValidators,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    validate: lastNameValidators,
    trim: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const user = this;

    if (!user.isModified("password")) {
      return next();
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);

    user.password = hash;

    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this._update;
    if (!update.password) {
      return next();
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(update.password, saltRounds);

    update.password = hash;

    next();
  } catch (error) {
    return next(error);
  }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
const Account = mongoose.model("Account", AccountSchema);
const User = mongoose.model("User", UserSchema);

export { User, Account, Transaction, connectToDB };
